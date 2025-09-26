
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FarmerApplicationSchema, type FarmerApplicationValues } from "@/lib/schemas";
import { LoaderCircle, Send, FileText, CheckCircle, Leaf, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { useDbContext } from "@/context/db-context";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage, content } from '@/context/language-context';
import { LanguageSwitcher } from "@/components/language-switcher";

function FileInputField({ field, label, id, placeholder }: { field: any, label: string, id: string, placeholder: string }) {
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
                        placeholder={placeholder}
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
    const { language } = useLanguage();
    const c = content[language].register;

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
                title: c.toast.successTitle,
                description: c.toast.successDescription,
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: c.toast.failureTitle,
                description: error.message || c.toast.failureDescription,
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
                        <CardTitle className="mt-4 font-headline">{c.submitted.title}</CardTitle>
                        <CardDescription>{c.submitted.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/">{c.submitted.homeButton}</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-3xl py-12">
            <div className="flex justify-between items-center mb-8">
                 <Button asChild variant="ghost">
                  <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                  </Link>
              </Button>
                <LanguageSwitcher />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{c.form.title}</CardTitle>
                    <CardDescription>{c.form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <h3 className="text-lg font-medium border-b pb-2">{c.form.yourInfo.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>{c.form.yourInfo.name.label}</FormLabel><FormControl><Input placeholder={c.form.yourInfo.name.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>{c.form.yourInfo.email.label}</FormLabel><FormControl><Input placeholder={c.form.yourInfo.email.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>{c.form.yourInfo.phone.label}</FormLabel><FormControl><Input placeholder={c.form.yourInfo.phone.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            
                            <h3 className="text-lg font-medium border-b pb-2 pt-4">{c.form.farmDetails.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="farmName" render={({ field }) => (
                                    <FormItem><FormLabel>{c.form.farmDetails.farmName.label}</FormLabel><FormControl><Input placeholder={c.form.farmDetails.farmName.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="farmLocation" render={({ field }) => (
                                    <FormItem><FormLabel>{c.form.farmDetails.farmLocation.label}</FormLabel><FormControl><Input placeholder={c.form.farmDetails.farmLocation.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                             <FormField control={form.control} name="cropsGrown" render={({ field }) => (
                                <FormItem><FormLabel>{c.form.farmDetails.crops.label}</FormLabel><FormControl><Input placeholder={c.form.farmDetails.crops.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="certifications" render={({ field }) => (
                                <FormItem><FormLabel>{c.form.farmDetails.certs.label}</FormLabel><FormControl><Input placeholder={c.form.farmDetails.certs.placeholder} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />

                            <h3 className="text-lg font-medium border-b pb-2 pt-4">{c.form.docs.title}</h3>
                            <p className="text-sm text-muted-foreground -mt-4">{c.form.docs.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <FormField control={form.control} name="kycDocument" render={({ field }) => (
                                    <FileInputField field={{...kycFileRef, value: field.value}} label={c.form.docs.kyc.label} id="kycDocument" placeholder={c.form.docs.kyc.placeholder} />
                                )}/>
                                <FormField control={form.control} name="farmOwnershipDocument" render={({ field }) => (
                                    <FileInputField field={{...farmDocFileRef, value: field.value}} label={c.form.docs.ownership.label} id="farmOwnershipDocument" placeholder={c.form.docs.ownership.placeholder} />
                                )}/>
                            </div>

                            <FormField control={form.control} name="agreement" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            {c.form.agreement.label} <a href="#" className="text-primary underline">{c.form.agreement.link}</a>.
                                        </FormLabel>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            
                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={loading} size="lg">
                                {loading ? (
                                    <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{c.form.submitButtonLoading}</>
                                ) : (
                                   <><Send className="mr-2" />{c.form.submitButton}</>
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
