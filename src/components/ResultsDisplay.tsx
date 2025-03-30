
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ImageData {
  url: string;
  alt: string;
}

interface ResultsDisplayProps {
  results: {
    images: ImageData[];
    url: string;
  } | null;
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  if (!results) {
    return null;
  }

  const downloadImage = (imageUrl: string, altText: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = altText || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full shadow-lg border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-crawl-dark-blue dark:text-crawl-accent">Crawl Results</CardTitle>
        <CardDescription>Found {results.images.length} images from {results.url}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.images.map((image, index) => (
              <ImageCard key={index} image={image} onDownload={downloadImage} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const ImageCard = ({ image, onDownload }: { image: ImageData; onDownload: (url: string, alt: string) => void }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        )}
        <img
          src={image.url}
          alt={image.alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-3 flex justify-between items-center">
        <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">{image.alt || "Image"}</p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDownload(image.url, image.alt)}
          className="h-8 w-8 p-0"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
