
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from 'next/link';
import { ShieldCheck, Search, ListOrdered, Package, UserPlus, Edit, Trash2, LoaderCircle, Check, X, FileText } from 'lucide-react';
import type { TimelineEvent, BatchData, AssembledProduct, User, FarmerApplication } from '@/lib/data';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from '@/hooks/use-toast';
import { useDbContext } from '@/context/db-context';

const addUserSchema = z.object({
  email: z.string().email(),
  role: z.string().min(1, { message: "Role is required." }),
});
type AddUserValues = z.infer<typeof addUserSchema>;

function getStatus(timeline: TimelineEvent[]) {
    const completedSteps = timeline.filter(e => e.status === 'complete').length;
    if (completedSteps === timeline.length) {
        return <Badge variant="secondary">Complete</Badge>;
    }
    const currentStep = timeline.find(e => e.status === 'pending');
    return <Badge variant={currentStep ? 'default' : 'outline'}>{currentStep?.title || 'Created'}</Badge>;
}

interface AdminDashboardProps {
    initialBatches: BatchData[];
    initialProducts: AssembledProduct[];
    initialUsers: User[];
    initialFarmerApplications: FarmerApplication[];
}

export function AdminDashboard({ initialBatches, initialProducts, initialUsers, initialFarmerApplications }: AdminDashboardProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const { toast } = useToast();
    const { addUser, updateUser, deleteUser, updateFarmerApplicationStatus, db } = useDbContext();
    
    const users = db?.users || initialUsers;
    const farmerApplications = db?.farmerApplications || initialFarmerApplications;

    const filteredBatches = useMemo(() => (db?.batches || initialBatches).filter(b => b.batchId.toLowerCase().includes(searchTerm.toLowerCase()) || b.productName.toLowerCase().includes(searchTerm.toLowerCase())), [db?.batches, initialBatches, searchTerm]);
    const filteredProducts = useMemo(() => (db?.products || initialProducts).filter(p => p.productId.toLowerCase().includes(searchTerm.toLowerCase()) || p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || p.brandName.toLowerCase().includes(searchTerm.toLowerCase())), [db?.products, initialProducts, searchTerm]);
    const filteredUsers = useMemo(() => (users).filter(u => u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase())), [users, searchTerm]);
    const pendingApplications = useMemo(() => (farmerApplications).filter(app => app.status === 'pending'), [farmerApplications]);

    const inProgressBatches = (db?.batches || initialBatches).filter(b => b.timeline.some(e => e.status === 'pending')).length;
    const inProgressProducts = (db?.products || initialProducts).filter(p => p.timeline.some(e => e.status === 'pending')).length;

    const addUserForm = useForm<AddUserValues>({
        resolver: zodResolver(addUserSchema),
        defaultValues: { email: "", role: "farmer" },
    });

    const handleAddUser = (values: AddUserValues) => {
        try {
            addUser(values.email, values.role);
            toast({ title: "User Added", description: `${values.email} has been added.` });
            setAddUserOpen(false);
            addUserForm.reset();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Failed to Add User", description: error.message });
        }
    };
    
    const handleApplicationAction = (appId: number, status: 'approved' | 'rejected') => {
        try {
            updateFarmerApplicationStatus(appId, status);
            toast({
                title: `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
                description: `The farmer application has been ${status}.`
            });
        } catch (error: any) {
             toast({ variant: "destructive", title: "Action Failed", description: error.message });
        }
    };

    const handleUpdateUserRole = (userId: number, newRole: string) => {
        try {
            updateUser(userId, newRole);
            toast({ title: "Role Updated", description: `User role has been updated to ${newRole}.` });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Update Failed", description: error.message });
        }
    };

    const handleDeleteUser = (userId: number) => {
        try {
            deleteUser(userId);
            toast({ title: "User Deleted", description: "The user has been successfully removed." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Deletion Failed", description: error.message });
        }
    };


  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-headline">Global Monitoring</h2>
          <p className="text-muted-foreground">Oversee all activity on the FloraChain platform.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(db?.batches || initialBatches).length}</div>
            <p className="text-xs text-muted-foreground">{inProgressBatches} in-progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(db?.products || initialProducts).length}</div>
            <p className="text-xs text-muted-foreground">{inProgressProducts} in-progress</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">{pendingApplications.length} pending applications</p>
          </CardContent>
        </Card>
         <Dialog open={isAddUserOpen} onOpenChange={setAddUserOpen}>
            <DialogTrigger asChild>
                <Button className="lg:col-start-4 h-full" size="lg">
                    <UserPlus className="mr-2"/> Add New User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New User</DialogTitle>
                    <DialogDescription>Enter the email and assign a role to a new platform member.</DialogDescription>
                </DialogHeader>
                <Form {...addUserForm}>
                    <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="space-y-4">
                        <FormField control={addUserForm.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input placeholder="user@company.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={addUserForm.control} name="role" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer', 'consumer'].map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={addUserForm.formState.isSubmitting}>
                                {addUserForm.formState.isSubmitting ? <LoaderCircle className="animate-spin" /> : "Add User"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
      </div>

       <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID, Product, Brand, User, or Role..." className="pl-9" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>Pending Farmer Applications</CardTitle>
                <CardDescription>Review and approve new farmers to join the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md max-h-[30rem] overflow-y-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-card">
                            <TableRow>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Farm</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingApplications.map(app => (
                                <TableRow key={app.id}>
                                    <TableCell>
                                        <div className="font-medium">{app.details.name}</div>
                                        <div className="text-xs text-muted-foreground">{app.details.email}</div>
                                    </TableCell>
                                    <TableCell>{app.details.farmName}</TableCell>
                                    <TableCell>{app.details.farmLocation}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild><Button variant="ghost">Review</Button></DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>Review Application: {app.details.name}</DialogTitle>
                                                    <DialogDescription>{app.details.farmName} - {app.details.farmLocation}</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4 text-sm">
                                                    <p><strong>Crops:</strong> {app.details.cropsGrown}</p>
                                                    <p><strong>Certifications:</strong> {app.details.certifications || 'N/A'}</p>
                                                    <p><strong>Contact:</strong> {app.details.email} / {app.details.phone}</p>
                                                    <div className="flex gap-4">
                                                        <a href="#" className="flex items-center gap-2 text-primary underline"><FileText className="h-4 w-4" /> KYC: {app.details.kycDocument}</a>
                                                        <a href="#" className="flex items-center gap-2 text-primary underline"><FileText className="h-4 w-4" /> Ownership: {app.details.farmOwnershipDocument}</a>
                                                    </div>
                                                </div>
                                                 <AlertDialogFooter>
                                                    <Button variant="destructive" onClick={() => handleApplicationAction(app.id, 'rejected')}><X className="mr-2" />Reject</Button>
                                                    <Button onClick={() => handleApplicationAction(app.id, 'approved')}><Check className="mr-2" />Approve</Button>
                                                </AlertDialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Button size="icon" variant="destructive" onClick={() => handleApplicationAction(app.id, 'rejected')}><X className="h-4 w-4"/></Button>
                                        <Button size="icon" onClick={() => handleApplicationAction(app.id, 'approved')}><Check className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pendingApplications.length === 0 && <TableRow><TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No pending applications.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        <Card className="xl:col-span-1">
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View, edit, and remove platform users.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md max-h-[30rem] overflow-y-auto">
                  <Table>
                      <TableHeader className="sticky top-0 bg-card"><TableRow><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                                <TableCell className="text-right space-x-2">
                                     <Dialog>
                                        <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit User Role</DialogTitle>
                                                <DialogDescription>Select a new role for {user.email}.</DialogDescription>
                                            </DialogHeader>
                                            <Select defaultValue={user.role} onValueChange={(newRole) => handleUpdateUserRole(user.id, newRole)}>
                                                <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                                                <SelectContent>
                                                    {['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer', 'consumer', 'admin'].map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </DialogContent>
                                    </Dialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the user {user.email}. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                         {filteredUsers.length === 0 && <TableRow><TableCell colSpan={3} className="h-24 text-center text-muted-foreground">No users found.</TableCell></TableRow>}
                      </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>All Batches & Products</CardTitle>
                <CardDescription>Log of every item registered on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h3 className="font-semibold">Ingredient Batches</h3>
                    <div className="border rounded-md max-h-[24.5rem] overflow-y-auto">
                      <Table>
                          <TableHeader className="sticky top-0 bg-card"><TableRow><TableHead>Batch ID</TableHead><TableHead>Product</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {filteredBatches.map(batch => (
                                <TableRow key={batch.batchId}>
                                    <TableCell className="font-mono text-xs">{batch.batchId}</TableCell>
                                    <TableCell className="font-medium">{batch.productName}</TableCell>
                                    <TableCell>{getStatus(batch.timeline)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm"><Link href={`/provenance/${batch.batchId}?role=admin`}>View</Link></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                             {filteredBatches.length === 0 && <TableRow><TableCell colSpan={4} className="h-24 text-center">No batches found.</TableCell></TableRow>}
                          </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Assembled Products</h3>
                     <div className="border rounded-md max-h-[24.5rem] overflow-y-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-card"><TableRow><TableHead>Product</TableHead><TableHead>Brand</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                          <TableBody>
                            {filteredProducts.map(product => (
                                <TableRow key={product.productId}>
                                    <TableCell className="font-medium">
                                        <div>{product.productName}</div>
                                        <div className="text-xs font-mono text-muted-foreground">{product.productId}</div>
                                    </TableCell>
                                    <TableCell><Badge variant="secondary">{product.brandName}</Badge></TableCell>
                                    <TableCell>{getStatus(product.timeline)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm"><Link href={`/provenance/${product.productId}?role=admin`}>View</Link></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredProducts.length === 0 && <TableRow><TableCell colSpan={4} className="h-24 text-center">No products found.</TableCell></TableRow>}
                          </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
