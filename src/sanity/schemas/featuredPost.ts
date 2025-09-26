import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featuredsection',
  title: 'Featured Section',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredpost',
      title: 'Featured Post',
      type: 'reference',
      to: { type: 'post' },
      description: 'Select a post to show as featured',
    }),
  ],
});
