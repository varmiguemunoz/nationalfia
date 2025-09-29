import { useMemo, useCallback } from 'react';

type SanityCategory = {
  _id: string;
  title: string;
  description?: string;
};

type SanityPost = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  publishedAt?: string;
  alt?: string;
  mainImage?: string;
  categories?: SanityCategory[];
};

type FeaturedSectionResponse = Array<{
  featuredpost?: {
    _id: string;
    title: string;
    publishedAt?: string;
    slug: string;
    alt?: string;
    mainImage?: string;
    description?: string;
  };
}>;

export function useBlogData({
  allPosts,
  featuredRaw,
  categoriesRaw,
  selectedCategory,
}: {
  allPosts: SanityPost[];
  featuredRaw: FeaturedSectionResponse | undefined | null;
  categoriesRaw: SanityCategory[];
  selectedCategory: string;
}) {
  const uiCategories = useMemo(() => {
    const mapped = (categoriesRaw || []).map((c) => ({ id: c._id, label: c.title }));
    return [{ id: 'all', label: 'All Posts' }, ...mapped];
  }, [categoriesRaw]);

  const categoryIdToLabel = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categoriesRaw || []) {
      map.set(c._id, c.title);
    }
    return map;
  }, [categoriesRaw]);

  const getCategoryLabel = useCallback(
    (categoryId?: string) => categoryIdToLabel.get(categoryId || '') || 'Uncategorized',
    [categoryIdToLabel]
  );

  const featuredPost = useMemo(() => {
    const f = featuredRaw?.[0]?.featuredpost;
    if (!f) return undefined;
    const pubDate = f.publishedAt ? new Date(f.publishedAt) : new Date();
    return {
      slug: f.slug,
      data: {
        image: f.mainImage || '',
        title: f.title,
        id: f._id,
        category: undefined as unknown as string, // no category data on featured response; label will show 'Uncategorized'
        pubDate,
        description: f.description || '',
        readtime: ' ',
        slug: f.slug,
      },
    };
  }, [featuredRaw]);

  const mappedPosts = useMemo(() => {
    const safePosts = Array.isArray(allPosts) ? allPosts : [];
    const posts = safePosts.map((p) => {
      const firstCategoryId = p.categories && p.categories.length > 0 ? p.categories[0]._id : undefined;
      return {
        slug: p.slug,
        title: p.title,
        data: {
          image: p.mainImage || '',
          title: p.title,
          id: p._id,
          category: firstCategoryId as unknown as string,
          pubDate: p.publishedAt ? new Date(p.publishedAt) : new Date(),
          description: p.description || '',
          readTime: ' ',
        },
      };
    });
    // Sort newest first (also enforced by GROQ, this is a safe client-side fallback)
    posts.sort((a, b) => (b.data.pubDate as unknown as number) - (a.data.pubDate as unknown as number));
    return posts;
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return mappedPosts;
    return mappedPosts.filter((post) => post.data.category === selectedCategory);
  }, [mappedPosts, selectedCategory]);

  return { uiCategories, getCategoryLabel, featuredPost, filteredPosts };
}
