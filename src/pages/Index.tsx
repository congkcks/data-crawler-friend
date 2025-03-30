
import { useState } from 'react';
import { CrawlForm } from '@/components/CrawlForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';

const Index = () => {
  const [crawlResults, setCrawlResults] = useState(null);

  const handleCrawlComplete = (data: any) => {
    console.log("Crawl completed with data:", data);
    setCrawlResults(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-crawl-dark-blue dark:text-white mb-2">Website Data Crawler</h1>
          <p className="text-gray-600 dark:text-gray-300">Easily extract product names and images from any website</p>
        </header>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <CrawlForm onCrawlComplete={handleCrawlComplete} />
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700">
                <h2 className="text-sm font-semibold text-crawl-dark-blue dark:text-blue-300 mb-2">How to use</h2>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Enter your API key (get one from the settings panel)</li>
                  <li>Enter the URL of the website you want to crawl</li>
                  <li>Click "Start Crawl" and wait for the results</li>
                  <li>View products extracted from the website</li>
                </ol>
              </div>
            </div>
            
            <div>
              {crawlResults ? (
                <ResultsDisplay results={crawlResults} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[250px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Results Yet</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Enter a URL and start crawling to see product data here
                    </p>
                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm border rounded-md text-crawl-dark-blue dark:text-crawl-accent border-crawl-dark-blue dark:border-crawl-accent animate-pulse-slow">
                      Ready to crawl
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
