'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateProvenanceStory } from '@/ai/flows/generate-provenance-story';
import type { BatchData } from '@/lib/data';
import { LoaderCircle, Sparkles } from 'lucide-react';

interface StoryGeneratorProps {
  batch: BatchData;
}

export function StoryGenerator({ batch }: StoryGeneratorProps) {
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setStory(null);
    try {
      const result = await generateProvenanceStory({
        batchId: batch.batchId,
        farmName: batch.farmName,
        location: batch.location,
        harvestDate: batch.harvestDate,
        processingDetails: batch.processingDetails,
      });
      setStory(result.story);
    } catch (e) {
      console.error(e);
      setError('Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">The Story of Your Product</CardTitle>
        <CardDescription>
          Use our AI storyteller to weave the details of this batch into an engaging narrative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {story && (
          <div className="mb-6 space-y-4 rounded-lg border bg-secondary/30 p-4 text-sm text-foreground/80">
            {story.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              {story ? 'Regenerate Story' : 'Generate Story'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
