import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().max(500, 'Max 500 characters').min(1, 'Please write a message'),
  budget: z.enum(['lt25', '25-50', '50-100', '100+']).optional(),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactSplit() {
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      budget: 'lt25',
    },
  });

  function onSubmit(values: ContactSchema) {
    // Replace with your submission logic
    console.log('contact-submit', values);
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-md border border-slate-200 bg-transparent">
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="mb-2 text-4xl font-semibold tracking-[-0.02em] text-slate-900">
              Contact National Federation of Insurance Agents
            </h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">First name</FormLabel>
                      <FormControl>
                        <Input className="text-black" placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Last name</FormLabel>
                      <FormControl>
                        <Input className="text-black" placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input className="text-black" type="email" placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Company</FormLabel>
                    <FormControl>
                      <Input className="text-black" placeholder="National Federation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black">Phone</FormLabel>
                      <span className="text-xs text-slate-400">Optional</span>
                    </div>
                    <FormControl>
                      <Input className="text-black" placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-black">How can we help you?</FormLabel>
                      <span className="text-xs text-slate-400">Max 500 characters</span>
                    </div>
                    <FormControl>
                      <Textarea className="text-black" rows={5} placeholder="I want to Join NFIA..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit" className="bg-black py-5 text-white hover:bg-black/30">
                  Send message
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
