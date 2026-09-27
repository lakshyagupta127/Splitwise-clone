"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { addExpense } from "@/app/actions";

interface User {
  id: string;
  name: string;
}

export function AddExpenseModal({ users }: { users: User[] }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      await addExpense(formData);
      setOpen(false);
    } catch (e) {
      console.error(e);
      alert("Failed to add expense");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-green-600 hover:bg-green-700" />}>
        <Plus className="mr-2 h-4 w-4" /> Add an expense
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an expense</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="Dinner at Joe's" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" type="number" step="0.01" min="0" placeholder="0.00" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payerId">Paid by</Label>
            <select 
              id="payerId" 
              name="payerId" 
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a user...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-muted-foreground pt-2">
            This expense will be split equally among everyone.
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
