
"use client";

import { useState, useMemo } from 'react';
import type { TimelineEvent, UserRole } from '@/lib/data';
import { iconMap } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Check, Lock, Edit, EyeOff, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { updateTimelineEvent } from '@/app/actions';
import { ProcessingEventForm } from './processing-event-form';
import type { ProcessingEventValues, SupplierEventValues, ManufacturingEventValues, DistributionEventValues, RetailEventValues } from '@/lib/schemas';
import { SupplierEventForm } from './supplier-event-form';
import { ManufacturingEventForm } from './manufacturing-event-form';
import { DistributionEventForm } from './distribution-event-form';
import { RetailEventForm } from './retail-event-form';


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
    distributor: ['farmer', 'processor', 'supplier', 'brand', 'distributor'],
    retailer: ['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer'],
    consumer: ['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer'],
    admin: ['farmer', 'processor', 'supplier', 'brand', 'distributor', 'retailer', 'consumer'],
};


export function InteractiveTimeline({ initialEvents, role, batchId, isProduct = false }: InteractiveTimelineProps) {
  const [events, setEvents] = useState(initialEvents);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async (eventId: number, data: any) => {
    setLoading(true);
    const result = await updateTimelineEvent(batchId, eventId, data);

    if (result.success && result.batch) {
      setEvents(result.batch.timeline);
      setEditingEventId(null);
      toast({
        title: "Update Successful!",
        description: `The '${events.find(e => e.id === eventId)?.title}' step has been completed.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.message || "An unknown error occurred.",
      });
    }
    setLoading(false);
  };
  
  const handleSimpleConfirmation = async (eventId: number, title: string) => {
    setLoading(true);
    const result = await updateTimelineEvent(batchId, eventId, { description: `${title} confirmed by ${role}.` });
     if (result.success && result.batch) {
      setEvents(result.batch.timeline);
      setEditingEventId(null);
      toast({
        title: "Update Successful!",
        description: `The '${title}' step has been completed.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.message || "An unknown error occurred.",
      });
    }
    setLoading(false);
  };

  const timelineEvents = useMemo(() => {
    if (isProduct) {
        // For products, only show the product-specific timeline steps
        const productSteps = events.filter(e => e.id >= 99);
        // De-duplicate ingredient steps, showing only the first occurrence for context
        const ingredientSteps = events.filter(e => e.id < 99);
        const uniqueIngredientSteps = Array.from(new Map(ingredientSteps.map(e => [e.id, e])).values());
        
        return [...uniqueIngredientSteps, ...productSteps].map(e => ({ ...e, uniqueId: e.id.toString() }));
    }
    // For single batches, just use ID
    return events.map((e, index) => ({...e, uniqueId: `${e.id}-${index}`}));
  }, [events, isProduct]);


  const renderForm = (event: TimelineEvent) => {
    if (editingEventId !== event.id) return null;

    switch (event.id) {
        case 3: // Local Processing & Dispatch
            return (
                <ProcessingEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 5: // Supplier Processing & Dispatch
            return (
                <SupplierEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 100: // Manufacturing & Packaging
            return (
                <ManufacturingEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 101: // Distribution
            return (
                <DistributionEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        case 103: // In-Store Provenance
            return (
                <RetailEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                    initialData={event.formData}
                />
            );
        default:
            return null;
    }
  }
  
  const canViewDescription = (event: TimelineEvent) => {
    if (event.status !== 'complete' || !event.description) return false;
    const allowedRoles = visibilityRules[role] || [];
    // Ensure allowedRole exists before checking inclusion
    return event.allowedRole && allowedRoles.includes(event.allowedRole);
  }

  const isSimpleConfirmation = (event: TimelineEvent) => {
      // Add event IDs that should be simple confirmations without a form
      const simpleConfirmationIds = [2, 4, 102];
      return simpleConfirmationIds.includes(event.id);
  }

  return (
    <div className="relative pl-6 after:absolute after:inset-y-0 after:left-[1.625rem] after:w-px after:bg-border -ml-2">
      {timelineEvents.map((event) => {
        const config = statusConfig[event.status];
        const EventIcon = iconMap[event.icon];
        const canTakeAction = event.allowedRole === role && event.status === 'pending';
        const showDescription = canViewDescription(event);

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
                      onClick={() => {
                        if (isSimpleConfirmation(event)) {
                            handleSimpleConfirmation(event.id, event.title);
                        } else {
                            setEditingEventId(event.id);
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/> : <config.icon className="mr-2 h-4 w-4" />}
                      {event.cta}
                    </Button>
                  )}
                </CardHeader>

                {event.status === 'complete' && event.description && (
                     <CardContent>
                        {showDescription ? (
                            <CardDescription className="whitespace-pre-wrap">{event.description}</CardDescription>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                                <EyeOff className="h-4 w-4" />
                                <span>Details are confidential for your role.</span>
                            </div>
                        )}
                    </CardContent>
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
