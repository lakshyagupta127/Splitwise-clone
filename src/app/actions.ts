"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const payerId = formData.get("payerId") as string;

  if (!description || !amount || !payerId) {
    throw new Error("Missing required fields");
  }

  // Fetch all users to split equally for now (simplified MVP)
  const allUsers = await prisma.user.findMany();
  if (allUsers.length === 0) return;

  const splitAmount = amount / allUsers.length;

  await prisma.expense.create({
    data: {
      description,
      amount,
      payerId,
      splits: {
        create: allUsers.map((user) => ({
          userId: user.id,
          amount: splitAmount,
        })),
      },
    },
  });

  revalidatePath("/");
}

export async function addFriend(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    throw new Error("Missing required fields");
  }

  await prisma.user.create({
    data: { name, email },
  });

  revalidatePath("/friends");
  revalidatePath("/");
}

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getDashboardData(userId: string) {
  // Find all expenses this user paid for
  const paidExpenses = await prisma.expense.findMany({
    where: { payerId: userId },
    include: { splits: true },
  });

  // Find all splits where this user owes money
  const owedSplits = await prisma.expenseSplit.findMany({
    where: { userId },
    include: { expense: true },
  });

  const settlementsPaid = await prisma.settlement.findMany({
    where: { payerId: userId }
  });

  const settlementsReceived = await prisma.settlement.findMany({
    where: { payeeId: userId }
  });

  let friendsOweYou = 0;
  let youOwe = 0;

  // Calculate how much others owe you for expenses you paid
  paidExpenses.forEach((exp) => {
    exp.splits.forEach((split) => {
      if (split.userId !== userId) {
        friendsOweYou += split.amount;
      }
    });
  });

  // Subtract what they have paid you back
  settlementsReceived.forEach(s => {
    friendsOweYou -= s.amount;
  });

  // Calculate how much you owe others for expenses they paid
  owedSplits.forEach((split) => {
    if (split.expense.payerId !== userId) {
      youOwe += split.amount;
    }
  });

  // Subtract what you have already paid back
  settlementsPaid.forEach(s => {
    youOwe -= s.amount;
  });

  return { friendsOweYou, youOwe, totalBalance: friendsOweYou - youOwe };
}

export async function createGroup(formData: FormData) {
  const name = formData.get("name") as string;
  const memberIds = formData.getAll("memberIds") as string[];

  if (!name || memberIds.length === 0) return;

  await prisma.group.create({
    data: {
      name,
      members: {
        create: memberIds.map(id => ({ userId: id }))
      }
    }
  });
  revalidatePath("/groups");
}

export async function getGroups() {
  return await prisma.group.findMany({ include: { members: { include: { user: true } } } });
}

export async function settleUp(formData: FormData) {
  const payerId = formData.get("payerId") as string;
  const payeeId = formData.get("payeeId") as string;
  const amount = parseFloat(formData.get("amount") as string);

  if (!payerId || !payeeId || !amount) return;

  await prisma.settlement.create({
    data: { payerId, payeeId, amount }
  });

  revalidatePath("/");
}
