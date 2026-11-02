import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameSi',
      title: 'Product Name (Sinhala)',
      type: 'string',
      description: 'Optional. Shown when a customer views the site in Sinhala. Falls back to the English name if left blank.',
    }),
    defineField({
      name: 'code',
      title: 'Product Code',
      type: 'string',
      description: 'Short code customers will quote on WhatsApp, e.g. BT-101',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (LKR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.required().min(1).max(5).error('Add between 1 and 5 images'),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Men / Women / Kids — add new categories under "Category" in the sidebar.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productType',
      title: 'Type',
      type: 'reference',
      to: [{type: 'productType'}],
      description: 'Casual / Office / Sports etc. — add new types under "Type" in the sidebar.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show first. Optional.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
      media: 'images.0',
    },
  },
})
