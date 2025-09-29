import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

type Props = {
  getCategoryLabel: (parameter: any) => void | any;
  selectedCategory: string;
  featuredPost: {
    slug: string;
    data: {
      image: string;
      title: string;
      id: string;
      category: string;
      pubDate: Date;
      description: string;
      readtime: string;
      slug: string;
    };
  };
};

export default function FeaturedBlog({ getCategoryLabel, featuredPost }: Props) {
  return (
    <section className="mb-16 w-full">
      <a href={`/blog/${featuredPost?.slug}`}>
        <Card className="group overflow-hidden border border-gray-200 bg-transparent transition-all duration-500">
          <div className="md:flex">
            {/* Image */}
            <div className="relative overflow-hidden md:w-1/2">
              <img
                src={featuredPost?.data?.image}
                alt={featuredPost?.data?.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[600px]"
                width={500}
                height={500}
                loading={'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <Badge variant="secondary" className="bo absolute left-4 top-4 bg-gray-800 text-white">
                Featured
              </Badge>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center bg-gradient-card p-8 md:w-1/2">
              <div className="mb-4">
                <Badge variant="outline" className="mb-3 border-accent/30 text-white">
                  {getCategoryLabel(featuredPost?.data?.category)}
                </Badge>
                <h2 className="mb-4 text-2xl font-bold text-foreground transition-colors duration-300 md:text-3xl">
                  {featuredPost?.data?.title}
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{featuredPost?.data?.description}</p>
              </div>

              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{featuredPost?.data?.pubDate.toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{featuredPost?.data?.readtime}</span>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  className="bg-gray-800 text-white transition-all duration-300 hover:bg-gray-700"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </a>
    </section>
  );
}
