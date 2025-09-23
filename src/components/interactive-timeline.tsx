
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { TimelineEvent, UserRole } from '@/lib/data';
import { iconMap } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Check, Lock, Edit, EyeOff, LoaderCircle, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { formatTimelineDescription } from '@/app/actions';
import { ProcessingEventForm } from './processing-event-form';
import { SupplierEventForm } from './supplier-event-form';
import { ManufacturingEventForm } from './manufacturing-event-form';
import { DistributionEventForm } from './distribution-event-form';
import { RetailEventForm } from './retail-event-form';
import Link from 'next/link';
import { useDbContext } from '@/context/db-context';


interface InteractiveTimelineProps {
  initialEvents: TimelineEvent[];
  role: UserRole | string;
  batchId: string;
  isProduct?: boolean;
}

const statusConfig = {
  complete: {
    icon: Check,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  pending: {
    icon: Edit,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  locked: {
    icon: Lock,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/80',
    borderColor: 'border-border',
  },
};

const visibilityRules: Record<string, string[]> = {
    farmer: ['farmer'],
    processor: ['farmer', 'processor'],
    supplier: ['farmer', 'processor', 'supplier'],
    brand: ['farmer', 'processor', 'supplier', 'brand'],
    distributor: ['distributor'],
    retailer: ['distributor', 'retailer', 'consumer'],
    consumer: ['consumer'], // Only allow consumer role to see consumerDescription
    admin: ['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer', 'consumer'],
};


export function InteractiveTimeline({ initialEvents, role, batchId, isProduct = false }: InteractiveTimelineProps) {
  const [events, setEvents] useState(initialEvents);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { updateTimelineEvent } = useDbContext();

  useEffect(() => {
    setEvents(initialEvents);
    if (role === 'consumer') {
        setEvents(prevEvents => prevEvents.filter(e => e.id !== 104));
    }
  }, [initialEvents, role]);

  const handleUpdate = (eventId: number, data: any) => {
    setLoading(true);
    try {
        const description = formatTimelineDescription(eventId, data);
        const eventData = {
            description: description ?? '',
            date: new Date().toLocaleDateString('en-CA'),
            formData: data,
        }
        updateTimelineEvent(batchId, eventId, eventData, isProduct);
        setEditingEventId(null);
        toast({
            title: "Update Successful!",
            description: `The '${events.find(e => e.id === eventId)?.title}' step has been completed.`,
        });
    } catch(error) {
        console.error("Update failed", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "An unknown error occurred.",
        });
    } finally {
        setLoading(false);
    }
  };
  
  const handleSimpleConfirmation = (eventId: number, title: string) => {
    setLoading(true);
    try {
        const eventData = { description: `${title} confirmed by ${role}.` };
        updateTimelineEvent(batchId, eventId, eventData, isProduct);
        setEditingEventId(null);
        toast({
            title: "Update Successful!",
            description: `The '${title}' step has been completed.`,
        });
    } catch (error) {
        console.error("Update failed", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "An unknown error occurred.",
        });
    } finally {
        setLoading(false);
    }
  };

  const timelineEvents = useMemo(() => {
    if (isProduct) {
        return events.map((e, index) => ({...e, uniqueId: `${e.id}-${index}`}));
    }
    return events.map(e => ({...e, uniqueId: e.id.toString()}));
  }, [events, isProduct]);


  const renderForm = (event: TimelineEvent) => {
    if (editingEventId !== event.id) return null;

    const handleSubmit = async (data: any) => {
      handleUpdate(event.id, data);
    }

    switch (event.id) {
        case 3: // Local Processing
            return (
                <ProcessingEventForm
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 5: // Supplier Processing & Dispatch
            return (
                <SupplierEventForm
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 100: // Manufacturing & Packaging
            return (
                <ManufacturingEventForm
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 101: // Distribution
            return (
                <DistributionEventForm
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 103: // In-Store Inventory
            return (
                <RetailEventForm
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        default:
            return null;
    }
  }

  const getDescriptionForRole = (event: TimelineEvent) => {
      if (role === 'consumer') {
          return event.consumerDescription;
      }
      return event.description;
  }
  
  const canViewDescription = (event: TimelineEvent) => {
    if (event.status !== 'complete') return false;
    const description = getDescriptionForRole(event);
    if (!description) return false;
    
    if (role === 'consumer') return true;

    const allowedRoles = visibilityRules[role] || [];
    return event.allowedRole && allowedRoles.includes(event.allowedRole);
  }

  const isSimpleConfirmation = (event: TimelineEvent) => {
      const simpleConfirmationIds = [2, 4, 102];
      return simpleConfirmationIds.includes(event.id);
  }

  const handleButtonClick = (event: TimelineEvent) => {
    if (event.id === 6) { // Ready for Formulation
      router.push(`/assemble-product?role=${role}`);
      return;
    }

    if (isSimpleConfirmation(event)) {
      handleSimpleConfirmation(event.id, event.title);
    } else {
      setEditingEventId(event.id);
    }
  };


  return (
    <div className="relative pl-6 after:absolute after:inset-y-0 after:left-[1.625rem] after:w-px after:bg-border -ml-2">
      {timelineEvents.map((event) => {
        const config = statusConfig[event.status];
        const EventIcon = iconMap[event.icon];
        const canTakeAction = event.allowedRole === role && event.status === 'pending';
        const showDescription = canViewDescription(event);
        const description = getDescriptionForRole(event);


        return (
          <div key={event.uniqueId} className="relative grid grid-cols-[auto_1fr] items-start gap-x-3 pb-8">
            {/* Icon */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-background">
              <div className={cn("z-10 flex h-10 w-10 items-center justify-center rounded-full", config.bgColor, config.color)}>
                <EventIcon className="h-5 w-5" />
              </div>
            </div>

            {/* Card */}
            <div className="pt-1.5">
              <Card className={cn("transform transition-all duration-300", config.borderColor)}>
                <CardHeader className="flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                    {event.date && <span className="text-sm font-medium text-muted-foreground">{event.date}</span>}
                  </div>
                  {canTakeAction && (
                    <Button
                      size="sm"
                      onClick={() => handleButtonClick(event)}
                      disabled={loading && (editingEventId === event.id || isSimpleConfirmation(event))}
                    >
                      {loading && (editingEventId === event.id || isSimpleConfirmation(event)) ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/> : <config.icon className="mr-2 h-4 w-4" />}
                      {event.cta}
                    </Button>
                  )}
                </CardHeader>

                {event.status === 'complete' && (
                    <>
                    {description && (
                        <CardContent>
                            {showDescription ? (
                                <CardDescription className="whitespace-pre-wrap">{description}</CardDescription>
                            ) : (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                                    <EyeOff className="h-4 w-4" />
                                    <span>Details are confidential for your role.</span>
                                </div>
                            )}
                        </CardContent>
                    )}
                     {role !== 'consumer' && showDescription && (
                        <CardFooter>
                           <Button asChild variant="secondary" size="sm">
                                <Link href={`/document/${batchId}?stage=${event.id}`} target="_blank">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Report
                                </Link>
                           </Button>
                        </CardFooter>
                     )}
                    </>
                )}


                {renderForm(event)}
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}
