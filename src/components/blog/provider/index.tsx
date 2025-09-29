import { useMemo, useState, useEffect } from 'react';

import HeroBlog from '../hero-blog';
import FeaturedBlog from '../featured-blog';
import GridBlog from '../grid-blog';
import { Loader } from 'lucide-react';
import { useBlogData } from '@/hooks/use-blog-data';

export default function Provider({ allPosts, categories, featuredPost }: any) {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const selectedCategory = searchParams?.get('category') || 'all';
  const [isReady, setIsReady] = useState(false);

  // Progressive loading - show content after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const {
    uiCategories,
    getCategoryLabel,
    featuredPost: featured,
    filteredPosts,
  } = useBlogData({
    allPosts,
    featuredRaw: featuredPost,
    categoriesRaw: categories,
    selectedCategory,
  });

  if (!isReady) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-primary">Loading blog content...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroBlog showFilters={false} selectedCategory={selectedCategory} categories={uiCategories} />

      <div className="w-full max-w-6xl px-4 pb-24 md:mx-auto">
        {/* Featured Article Section */}
        {featured && (
          <FeaturedBlog
            selectedCategory={selectedCategory}
            featuredPost={featured as any}
            getCategoryLabel={getCategoryLabel}
          />
        )}

        <GridBlog
          getCategoryLabel={getCategoryLabel}
          selectedCategory={selectedCategory}
          filteredPosts={filteredPosts as any}
        />
      </div>
    </>
  );
}
