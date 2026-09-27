"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createGroup } from "@/app/actions";

interface User {
  id: string;
  name: string;
}

export function AddGroupModal({ users, currentUser }: { users: User[], currentUser: User }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  
  const friends = users.filter(u => u.id !== currentUser.id);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      formData.append("memberIds", currentUser.id);
      await createGroup(formData);
      setOpen(false);
    } catch (e) {
      console.error(e);
      alert("Failed to create group");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-green-600 hover:bg-green-700" />}>
        <Plus className="mr-2 h-4 w-4" /> Start a new group
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start a new group</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input id="name" name="name" placeholder="Apartment 4B" required />
          </div>
          
          <div className="space-y-2 pt-2">
            <Label>Select Members</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto border p-3 rounded-md">
              {friends.map(u => (
                <div key={u.id} className="flex items-center space-x-2">
                  <input type="checkbox" id={`user-${u.id}`} name="memberIds" value={u.id} />
                  <label htmlFor={`user-${u.id}`} className="text-sm font-medium leading-none">{u.name}</label>
                </div>
              ))}
              {friends.length === 0 && <p className="text-sm text-muted-foreground">Add some friends first!</p>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={pending}>
            {pending ? "Creating..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
