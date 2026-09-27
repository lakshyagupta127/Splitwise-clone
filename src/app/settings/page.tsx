import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Account</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" defaultValue="Alice" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Your email address</Label>
            <Input id="email" type="email" defaultValue="alice@example.com" />
          </div>
          <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage how Splitwise works for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Default currency</p>
              <p className="text-sm text-muted-foreground">INR (₹)</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
