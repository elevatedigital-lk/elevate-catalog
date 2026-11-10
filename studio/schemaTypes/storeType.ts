import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'storeType',
  title: 'Store Type (Theme)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Footwear Store, Clothing Store',
    }),
    defineField({
      name: 'nameSi',
      title: 'Store Name (Sinhala)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
    }),
    defineField({
      name: 'descriptionSi',
      title: 'Description (Sinhala)',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (emoji or icon type)',
      type: 'string',
      description: '👟 for shoes, 👕 for clothes, etc.',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color (Hex)',
      type: 'string',
      description: '#000000 - used for accents and theme',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first in dropdown',
    }),
    defineField({
      name: 'isDefault',
      title: 'Default Store Type',
      type: 'boolean',
      description: 'Set to true for Footwear Store',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current'},
  },
})
