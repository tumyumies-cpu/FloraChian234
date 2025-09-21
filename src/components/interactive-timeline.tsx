
"use client";

import { useState } from 'react';
import type { TimelineEvent, UserRole } from '@/lib/data';
import { iconMap } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Check, Lock, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { updateTimelineEvent } from '@/app/actions';
import { ProcessingEventForm } from './processing-event-form';
import type { ProcessingEventValues, SupplierEventValues } from '@/lib/schemas';
import { SupplierEventForm } from './supplier-event-form';

interface InteractiveTimelineProps {
  initialEvents: TimelineEvent[];
  role: UserRole | string;
  batchId: string;
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

export function InteractiveTimeline({ initialEvents, role, batchId }: InteractiveTimelineProps) {
  const [events, setEvents] = useState(initialEvents);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async (eventId: number, data: ProcessingEventValues | SupplierEventValues) => {
    setLoading(true);
    const result = await updateTimelineEvent(batchId, eventId, { 
      ...data,
      date: new Date().toLocaleDateString('en-CA') 
    });

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

  const handleCtaClick = (event: TimelineEvent) => {
    if (event.allowedRole === role && event.status === 'pending') {
      setEditingEventId(event.id);
    } else if (event.status !== 'pending') {
       // Do nothing, just let the card be a display
    }
     else {
      let description = "This step is not yet available.";
      if (event.allowedRole !== role) {
        description = `This action is reserved for the '${event.allowedRole}' role.`;
      }
      toast({
        variant: "destructive",
        title: "Action Not Available",
        description,
      });
    }
  };

  const renderForm = (event: TimelineEvent) => {
    if (editingEventId !== event.id) return null;

    switch (event.id) {
        case 2: // Local Processing
            return (
                <ProcessingEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                />
            );
        case 3: // Supplier Acquisition
            return (
                <SupplierEventForm
                    loading={loading}
                    onSubmit={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                />
            );
        default:
            return null;
    }
  }

  return (
    <div className="relative pl-6 after:absolute after:inset-y-0 after:left-[1.625rem] after:w-px after:bg-border -ml-2">
      {events.map((event) => {
        const config = statusConfig[event.status];
        const EventIcon = iconMap[event.icon];
        const canTakeAction = event.allowedRole === role && event.status === 'pending';

        return (
          <div key={event.id} className="relative grid grid-cols-[auto_1fr] items-start gap-x-3 pb-8">
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
                      onClick={() => handleCtaClick(event)}
                    >
                      <config.icon className="mr-2 h-4 w-4" />
                      {event.cta}
                    </Button>
                  )}
                </CardHeader>
                {event.description && (
                  <CardContent>
                    <CardDescription className="whitespace-pre-wrap">{event.description}</CardDescription>
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
