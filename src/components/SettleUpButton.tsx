"use client";

import { Button } from "@/components/ui/button";

export function SettleUpButton() {
  return (
    <Button 
      variant="outline" 
      className="text-orange-600 border-orange-600 hover:bg-orange-50"
      onClick={() => alert("Settle up functionality coming soon!")}
    >
      Settle up
    </Button>
  );
}
