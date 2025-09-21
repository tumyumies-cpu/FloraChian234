"use client";

import { useState } from 'react';
import type { TimelineEvent, UserRole } from '@/lib/data';
import { iconMap } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Check, Lock, Edit, Upload, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateTimelineEvent } from '@/app/actions';

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

const EventUpdateForm = ({ event, onUpdate, onCancel }: { event: TimelineEvent, onUpdate: (data: any) => void, onCancel: () => void }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate({ description, date: new Date().toLocaleDateString('en-CA') });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-background border-t">
      <h4 className="font-semibold">Update: {event.title}</h4>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter details for this step..."
        rows={3}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button type="submit" disabled={loading || !description}>
          {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          Submit Update
        </Button>
      </div>
    </form>
  );
};

export function InteractiveTimeline({ initialEvents, role, batchId }: InteractiveTimelineProps) {
  const [events, setEvents] = useState(initialEvents);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleUpdate = async (eventId: number, data: { description: string; date: string }) => {
    const result = await updateTimelineEvent(batchId, eventId, { 
      description: data.description, 
      date: data.date 
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

  return (
    <div className="relative pl-6 after:absolute after:inset-y-0 after:left-[1.625rem] after:w-px after:bg-border -ml-2">
      {events.map((event) => {
        const config = statusConfig[event.status];
        const isEditing = editingEventId === event.id;
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
                    <CardDescription>{event.description}</CardDescription>
                  </CardContent>
                )}
                {isEditing && (
                  <EventUpdateForm
                    event={event}
                    onUpdate={(data) => handleUpdate(event.id, data)}
                    onCancel={() => setEditingEventId(null)}
                  />
                )}
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}
