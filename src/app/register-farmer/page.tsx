
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FarmerApplicationSchema, type FarmerApplicationValues } from "@/lib/schemas";
import { LoaderCircle, Send, FileText, CheckCircle, Leaf } from "lucide-react";
import Link from 'next/link';
import { useDbContext } from "@/context/db-context";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function FileInputField({ field, label, id }: { field: any, label: string, id: string }) {
    const fileRef = field.ref;
    const fileName = field.value?.[0]?.name;
  
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="relative">
                    <Input 
                        type="text" 
                        readOnly 
                        value={fileName || ""} 
                        placeholder="Click to upload a document"
                        className="cursor-pointer"
                        onClick={() => document.getElementById(id)?.click()}
                    />
                    <Input
                        id={id}
                        type="file"
                        className="hidden"
                        {...field}
                        ref={fileRef}
                        value={undefined} // value is controlled by react-hook-form
                        onChange={(e) => field.onChange(e.target.files)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                         {fileName ? <CheckCircle className="h-5 w-5 text-green-500" /> : <FileText className="h-5 w-5 text-muted-foreground" />}
                    </div>
                </div>
            </FormControl>
            <FormMessage />
      </FormItem>
    );
}

export default function RegisterFarmerPage() {
    const { addFarmerApplication } = useDbContext();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<FarmerApplicationValues>({
        resolver: zodResolver(FarmerApplicationSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            farmName: "",
            farmLocation: "",
            cropsGrown: "",
            certifications: "",
            agreement: false,
        },
    });

    const kycFileRef = form.register("kycDocument");
    const farmDocFileRef = form.register("farmOwnershipDocument");

    async function onSubmit(values: FarmerApplicationValues) {
        setLoading(true);
        try {
            // We are only storing the file names for simulation
            const applicationData = {
                ...values,
                kycDocument: values.kycDocument[0].name,
                farmOwnershipDocument: values.farmOwnershipDocument[0].name
            };
            addFarmerApplication(applicationData);
            setSubmitted(true);
            toast({
                title: "Application Submitted!",
                description: "Thank you. Your application is under review.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: error.message || "An unknown error occurred.",
            });
        } finally {
            setLoading(false);
        }
    }
    
    if (submitted) {
        return (
             <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background p-4">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                           <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="mt-4 font-headline">Application Received!</CardTitle>
                        <CardDescription>Thank you for your interest in joining FloraChain. Our team will review your application and get back to you via email within 5-7 business days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/">Return to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-3xl py-12">
            <div className="flex justify-center mb-8">
                <Link href="/" className="flex items-center gap-2 text-primary">
                    <Leaf className="h-8 w-8" />
                    <span className="font-headline text-2xl font-semibold">FloraChain</span>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Farmer Registration & Verification</CardTitle>
                    <CardDescription>Complete the form below to apply to become a verified farmer on the FloraChain platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <h3 className="text-lg font-medium border-b pb-2">Your Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            
                            <h3 className="text-lg font-medium border-b pb-2 pt-4">Farm Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="farmName" render={({ field }) => (
                                    <FormItem><FormLabel>Farm Name</FormLabel><FormControl><Input placeholder="e.g., Sunrise Organics" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="farmLocation" render={({ field }) => (
                                    <FormItem><FormLabel>Farm Location (City, State)</FormLabel><FormControl><Input placeholder="e.g., Erode, Tamil Nadu" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                             <FormField control={form.control} name="cropsGrown" render={({ field }) => (
                                <FormItem><FormLabel>Primary Ayurvedic Crops Grown</FormLabel><FormControl><Input placeholder="e.g., Ashwagandha, Turmeric, Tulsi" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="certifications" render={({ field }) => (
                                <FormItem><FormLabel>Certifications (Optional)</FormLabel><FormControl><Input placeholder="e.g., USDA Organic, India Organic" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />

                            <h3 className="text-lg font-medium border-b pb-2 pt-4">Document Upload</h3>
                            <p className="text-sm text-muted-foreground -mt-4">Please upload documents for KYC and farm ownership verification. Max file size: 5MB. Accepted formats: JPG, PNG, PDF.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <FormField control={form.control} name="kycDocument" render={({ field }) => (
                                    <FileInputField field={{...kycFileRef, value: field.value}} label="KYC Document" id="kycDocument" />
                                )}/>
                                <FormField control={form.control} name="farmOwnershipDocument" render={({ field }) => (
                                    <FileInputField field={{...farmDocFileRef, value: field.value}} label="Farm Ownership/Lease Document" id="farmOwnershipDocument" />
                                )}/>
                            </div>

                            <FormField control={form.control} name="agreement" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I agree to the <a href="#" className="text-primary underline">terms and conditions</a> of the FloraChain platform.
                                        </FormLabel>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            
                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={loading} size="lg">
                                {loading ? (
                                    <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                                ) : (
                                   <><Send className="mr-2" />Submit Application</>
                                )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
