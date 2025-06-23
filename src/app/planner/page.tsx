
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Lightbulb, MapPin, Clock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  suggestOptimalShootTime,
  type SuggestOptimalShootTimeOutput,
} from '@/ai/flows/suggest-optimal-shoot-time';

export default function PlannerPage() {
  const [preferences, setPreferences] = useState('A cinematic, moody pre-wedding shoot in an urban setting. Prefer golden hour lighting.');
  const [trendingData, setTrendingData] = useState('Popular spots: Downtown rooftop bars, industrial-chic alleys. Golden hour shoots are trending high for engagement and pre-wedding sessions.');
  const [suggestion, setSuggestion] = useState<SuggestOptimalShootTimeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestion(null);

    try {
      const result = await suggestOptimalShootTime({
        userPreferences: preferences,
        trendingData: trendingData,
      });
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center my-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            AI Shoot <span className="text-primary">Planner</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Get AI-powered suggestions for the perfect shoot time and location.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 pb-12">
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-accent" />
                <span>Your preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="preferences">Describe your ideal shoot</Label>
                  <Textarea
                    id="preferences"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    rows={4}
                    className="bg-background"
                    placeholder="e.g., A vintage style fashion shoot in a park during autumn."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trendingData">Trending Data (Optional)</Label>
                  <Textarea
                    id="trendingData"
                    value={trendingData}
                    onChange={(e) => setTrendingData(e.target.value)}
                    rows={4}
                    className="bg-background"
                    placeholder="e.g., Rooftop locations are popular this season."
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Suggestion...
                    </>
                  ) : (
                    'Get Suggestion'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {isLoading && (
              <Card className="bg-card/80 backdrop-blur-sm border-border animate-pulse">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <span>AI Suggestion</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                    </div>
                     <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-6 bg-muted rounded w-1/2"></div>
                    </div>
                     <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-12 bg-muted rounded w-full"></div>
                    </div>
                </CardContent>
              </Card>
            )}

            {suggestion && (
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <span>AI Suggestion</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-muted-foreground">
                      <Clock className="w-5 h-5" /> Optimal Time
                    </h3>
                    <p className="text-lg text-foreground pl-7">{suggestion.optimalTime}</p>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-muted-foreground">
                      <MapPin className="w-5 h-5" /> Optimal Location
                    </h3>
                    <p className="text-lg text-foreground pl-7">{suggestion.optimalLocation}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground">Reasoning</h3>
                    <p className="text-foreground text-sm mt-1">{suggestion.reasoning}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isLoading && !suggestion && (
                 <Card className="bg-card/80 backdrop-blur-sm border-border flex items-center justify-center min-h-[400px]">
                    <CardContent className="pt-6 text-center text-muted-foreground">
                        <Lightbulb className="w-12 h-12 mx-auto mb-4" />
                        <p>Your AI-powered suggestions will appear here.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
