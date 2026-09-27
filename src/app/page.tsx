import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { SettleUpModal } from "@/components/SettleUpModal";
import { getUsers, getDashboardData } from "./actions";

export default async function Home() {
  const users = await getUsers();
  
  // For the MVP, we assume the current user is Alice. 
  // In a real app with auth, this would come from the session.
  const currentUser = users.find(u => u.name === "Alice");
  
  if (!currentUser) {
    return <div className="p-8">No users found. Did you run the seed script?</div>;
  }

  const { friendsOweYou, youOwe, totalBalance } = await getDashboardData(currentUser.id);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <SettleUpModal users={users} currentUser={currentUser} />
          <AddExpenseModal users={users} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ₹{Math.abs(totalBalance).toFixed(2)} {totalBalance >= 0 ? "you are owed" : "you owe"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">You owe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{youOwe.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">You are owed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{friendsOweYou.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-muted-foreground">
        <p>Currently viewing as: <strong>{currentUser.name}</strong></p>
        <p className="text-sm mt-2">Add an expense to see the balances update dynamically!</p>
      </div>
    </div>
  );
}
