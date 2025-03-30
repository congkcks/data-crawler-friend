
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  name: string;
  image: string;
}

interface ResultsDisplayProps {
  results: {
    products: Product[];
    url: string;
  } | null;
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  if (!results) {
    return null;
  }

  return (
    <Card className="w-full shadow-lg border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-crawl-dark-blue dark:text-crawl-accent">Crawl Results</CardTitle>
        <CardDescription>Found {results.products.length} products from {results.url}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
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
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{product.name}</h3>
      </div>
    </div>
  );
};

// Add the useState import
import { useState } from 'react';
