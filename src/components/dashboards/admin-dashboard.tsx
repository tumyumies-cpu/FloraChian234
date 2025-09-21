import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="p-6">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="font-headline">Admin Overview</CardTitle>
            <CardDescription>Monitor and manage the entire platform.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <p className="text-sm text-muted-foreground">
          From this dashboard, you can view global activity, manage users, approve roles, and handle flagged items or recalls.
        </p>
        {/* Placeholder for future admin components */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">Approve or revoke user roles.</p>
            </div>
             <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Global Monitoring</h3>
                <p className="text-sm text-muted-foreground">View a map of all activities.</p>
            </div>
             <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Flagged Items</h3>
                <p className="text-sm text-muted-foreground">Review and manage flagged batches.</p>
            </div>
        </div>
      </CardContent>
    </div>
  );
}
