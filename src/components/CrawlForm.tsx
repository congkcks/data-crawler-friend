
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { KeyIcon } from 'lucide-react';

interface CrawlFormProps {
  onCrawlComplete: (data: any) => void;
}

export const CrawlForm = ({ onCrawlComplete }: CrawlFormProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState(FirecrawlService.getApiKey() || '');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to proceed",
        variant: "destructive",
      });
      return;
    }
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to crawl",
        variant: "destructive",
      });
      return;
    }

    // Check if URL is valid
    try {
      new URL(url);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      FirecrawlService.saveApiKey(apiKey);
      
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success && result.data) {
        toast({
          title: "Success",
          description: `Found ${result.data.images.length} images on the website`,
        });
        onCrawlComplete(result.data);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to crawl website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: "Failed to crawl website",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setIsLoading(false);
      
      // Reset progress after a delay
      setTimeout(() => {
        setProgress(0);
      }, 1000);
    }
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-crawl-dark-blue dark:text-crawl-accent">Website Image Crawler</CardTitle>
        <CardDescription>Enter a URL to extract all images from a website</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              Gemini API Key
            </label>
            <div className="flex">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
                placeholder="Enter your Gemini API key"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={toggleApiKeyVisibility}
                className="ml-2"
              >
                <KeyIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your Gemini API key is stored locally and never sent to our servers
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Website URL
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
              placeholder="https://example.com"
              disabled={isLoading}
              required
            />
          </div>
          
          {progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Crawling in progress...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </form>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !url.trim()}
          className="w-full bg-crawl-dark-blue hover:bg-crawl-light-blue text-white transition-all duration-200"
        >
          {isLoading ? "Crawling..." : "Start Crawl"}
        </Button>
      </CardFooter>
    </Card>
  );
};
