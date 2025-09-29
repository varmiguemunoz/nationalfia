import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { searchAgents } from '@/utils/sanity';
import { navigate } from 'astro:transitions/client';
import { Button } from '../ui/button';

const contactSchema = z.object({
  lastName: z.string().optional().nullable(),
  npn: z.string().optional().nullable(),
  license: z.string().optional().nullable(),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default function Search() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      npn: null,
      license: null,
      lastName: null,
    },
  });

  async function onSubmit(values: ContactSchema) {
    const results = await searchAgents({
      lastName: values.lastName || null,
      npn: values.npn || null,
      license: values.license || null,
    });

    if (results.length > 0) {
      navigate(`/agent/${results[0].slug}`);
    } else {
      alert('No results found');
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-md bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Last Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="Agent Lastname Here"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">License number</FormLabel>
                  <FormControl>
                    <Input className="text-black" placeholder="1123763" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="npn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">NPN number</FormLabel>
                  <FormControl>
                    <Input className="text-black" placeholder="1123763" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="bg-black text-white hover:bg-black/90">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
