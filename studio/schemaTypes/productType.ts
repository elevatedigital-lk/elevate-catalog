import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productType',
  title: 'Type (Casual / Office / Sports...)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameSi',
      title: 'Name (Sinhala)',
      type: 'string',
      description: 'Optional. Shown when a customer views the site in Sinhala.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first in the filter dropdown.',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'nameSi'},
  },
})
