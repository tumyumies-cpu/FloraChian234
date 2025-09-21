import type { TimelineEvent } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProvenanceTimelineProps {
  events: TimelineEvent[];
}

export function ProvenanceTimeline({ events }: ProvenanceTimelineProps) {
  return (
    <div className="relative pl-6 after:absolute after:inset-y-0 after:left-6 after:w-px after:bg-border">
      {events.map((event, index) => (
        <div key={event.id} className="relative grid grid-cols-[auto_1fr] items-start gap-x-3 pb-8">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-background">
            <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <event.icon className="h-5 w-5" />
            </div>
          </div>
          <div className="pt-1.5">
            <Card className="transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                  <span className="text-sm font-medium text-muted-foreground">{event.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
