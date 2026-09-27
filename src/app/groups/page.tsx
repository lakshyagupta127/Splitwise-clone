import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddGroupModal } from "@/components/AddGroupModal";
import { getUsers, getGroups } from "../actions";

export default async function GroupsPage() {
  const users = await getUsers();
  const groups = await getGroups();
  
  // For MVP, assuming Alice is the current user
  const currentUser = users.find(u => u.name === "Alice");

  if (!currentUser) return <div>No users found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Groups</h1>
        <AddGroupModal users={users} currentUser={currentUser} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(group => (
          <Card key={group.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.members.length} members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Members: {group.members.map(m => m.user.name).join(", ")}
              </p>
            </CardContent>
          </Card>
        ))}
        {groups.length === 0 && (
          <p className="text-muted-foreground col-span-full">You are not part of any groups yet.</p>
        )}
      </div>
    </div>
  );
}
