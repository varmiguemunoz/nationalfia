import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'agent',
  title: 'Agents',
  description: 'The National FIA Agents',
  type: 'document',
  fields: [
    defineField({
      name: 'fullname',
      title: 'FullName',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(100).error('The full name is too long or too short'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'fullname',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]+/g, '')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
    }),
    defineField({
      name: 'scheduleurl',
      title: 'Schedule url',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(100).error('The schedule url is too long or too short'),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      validation: (rule) => rule.required().error('You must provide an headshot'),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(100).error('The email is too long or too short'),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.required().min(10).max(100).error('The phone is too long or too short'),
    }),
    defineField({
      name: 'license',
      title: 'License',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100).error('The license is too long or too short'),
    }),
    defineField({
      name: 'npn',
      title: 'NPN Number',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100).error('The NPN is too long or too short'),
    }),
    defineField({
      name: 'license_states',
      title: 'License States',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .custom((value) => {
            if (!value) return 'This field is required';

            if (!value.includes(',')) {
              return 'Enter multiple states separated by commas (e.g. "ohio,california")';
            }

            const states = value.split(',').map((s) => s.trim());
            if (states.some((s) => s.length === 0)) {
              return 'Each state must be a non-empty string';
            }

            return true; // válido
          })
          .min(5)
          .max(100),
    }),

    defineField({
      name: 'bio',
      title: 'Bio',
      validation: (rule) => rule.required(),
      type: 'blockContent',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'fullname',
      media: 'headshot',
    },
  },
});
