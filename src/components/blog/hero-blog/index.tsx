import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  showFilters: boolean;
  selectedCategory: string;
  categories: {
    id: string;
    label: string;
  }[];
};

export default function HeroBlog({ showFilters, selectedCategory, categories }: Props) {
  return (
    <section className="px-4 pb-16 pt-24">
      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 w-full rounded-full bg-transparent opacity-10 blur-3xl md:scale-150"></div>

          <div className="relative">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-black md:text-6xl lg:text-7xl">
              Insurance Standards{' '}
              <span className="bg-gradient-primary bg-clip-text text-gray-800"> & Client Growth Strategies</span>
            </h1>

            <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Professional ethics, sales strategies, and IUL market insights for today’s insurance leaders.
            </p>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <Button variant="ghost" size="sm" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <div className={`flex flex-wrap justify-center gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                {categories.map((category) => (
                  <a href={`/blog?category=${category.id}`}>
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      className="px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: selectedCategory === category.id ? '#111827' : '#f3f4f6',
                        color: selectedCategory === category.id ? '#fff' : '#111827',
                      }}
                    >
                      {category.label}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
