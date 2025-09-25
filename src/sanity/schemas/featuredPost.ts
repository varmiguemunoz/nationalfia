import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featuredsection',
  title: 'Sección Destacada',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredpost',
      title: 'Blog Destacado',
      type: 'reference',
      to: { type: 'post' },
      description: 'Selecciona un post para mostrar como destacado',
    }),
  ],
});
