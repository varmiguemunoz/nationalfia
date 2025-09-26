import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const contactSchema = z.object({
  lastName: z.string().optional(),
  npn: z.string().optional(),
  license: z.string().optional(),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default function Search() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      npn: '',
      license: '',
      lastName: '',
    },
  });

  function onSubmit(values: ContactSchema) {
    // Replace with your submission logic
    console.log('contact-submit', values);
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
                  <Input className="text-black" placeholder="agent lastname here" {...field} />
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
                    <Input className="text-black" placeholder="1123763" {...field} />
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
                    <Input className="text-black" placeholder="1123763" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
