"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { addFriend } from "@/app/actions";

export function AddFriendModal() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      await addFriend(formData);
      setOpen(false);
    } catch (e) {
      console.error(e);
      alert("Failed to add friend");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-green-600 hover:bg-green-700" />}>
        <UserPlus className="mr-2 h-4 w-4" /> Add a friend
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a friend</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={pending}>
            {pending ? "Adding..." : "Add Friend"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
