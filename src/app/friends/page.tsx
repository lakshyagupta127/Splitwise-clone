import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUsers } from "../actions";
import { AddFriendModal } from "@/components/AddFriendModal";

export default async function FriendsPage() {
  const users = await getUsers();
  const friends = users.filter(u => u.name !== "Alice"); // Assuming Alice is current user

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Friends</h1>
        <AddFriendModal />
      </div>
      
      <div className="grid gap-4">
        {friends.map(friend => (
          <Card key={friend.id}>
            <CardContent className="flex items-center gap-4 pt-6">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{friend.name}</h2>
                <p className="text-muted-foreground">{friend.email}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        {friends.length === 0 && (
          <p className="text-muted-foreground">You don't have any friends yet.</p>
        )}
      </div>
    </div>
  );
}
