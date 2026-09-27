"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settleUp } from "@/app/actions";

interface User {
  id: string;
  name: string;
}

export function SettleUpModal({ users, currentUser }: { users: User[], currentUser: User }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const friends = users.filter(u => u.id !== currentUser.id);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      formData.append("payerId", currentUser.id);
      await settleUp(formData);
      setOpen(false);
    } catch (e) {
      console.error(e);
      alert("Failed to settle up");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50" />}>
        Settle up
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settle up</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          
          <div className="space-y-2">
            <Label htmlFor="payeeId">Who are you paying?</Label>
            <select 
              id="payeeId" 
              name="payeeId" 
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a friend...</option>
              {friends.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount you are paying them</Label>
            <Input id="amount" name="amount" type="number" step="0.01" min="0" placeholder="0.00" required />
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={pending}>
            {pending ? "Saving..." : "Record Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
