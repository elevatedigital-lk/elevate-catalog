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
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in the product page link. Click "Generate" to create it from the product name.',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
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
      description: 'Use 2–3 clear photos. Keep file sizes small (phone camera photos are fine) — the site compresses them automatically, but fewer photos means a faster-loading page for customers.',
      validation: (Rule) => Rule.required().min(1).max(3).error('Add between 1 and 3 images'),
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
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
      description: 'Optional. More detail shown on the product\'s own page (material, fit, etc.).',
    }),
    defineField({
      name: 'descriptionSi',
      title: 'Description (Sinhala)',
      type: 'text',
      rows: 4,
      description: 'Optional. Falls back to the English description if left blank.',
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      description: 'Customers must pick one of these before inquiring. Add as many as you offer; toggle "In Stock" off to disable a color without deleting it.',
      of: [
        {
          type: 'object',
          name: 'colorOption',
          fields: [
            defineField({name: 'name', title: 'Color Name (English)', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'nameSi', title: 'Color Name (Sinhala)', type: 'string', description: 'Optional, falls back to English.'}),
            defineField({
              name: 'hex',
              title: 'Swatch Color',
              type: 'string',
              description: 'Optional. A hex code for the little color dot, e.g. #1a1a1a for black, #8b4513 for brown.',
            }),
            defineField({name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'inStock'},
            prepare({title, subtitle}) {
              return {title, subtitle: subtitle === false ? 'Out of stock' : 'In stock'}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      description: 'Customers must pick one of these before inquiring. Toggle "In Stock" off to disable a size without deleting it.',
      of: [
        {
          type: 'object',
          name: 'sizeOption',
          fields: [
            defineField({name: 'size', title: 'Size', type: 'string', description: 'e.g. 40, 41, 42 or S / M / L', validation: (Rule) => Rule.required()}),
            defineField({name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true}),
          ],
          preview: {
            select: {title: 'size', subtitle: 'inStock'},
            prepare({title, subtitle}) {
              return {title, subtitle: subtitle === false ? 'Out of stock' : 'In stock'}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sizeChartImage',
      title: 'Size Chart Image',
      type: 'image',
      description: 'Optional. Upload a size chart photo/diagram to show on the product page.',
    }),
    defineField({
      name: 'sizeChartTable',
      title: 'Size Chart Table (text)',
      type: 'array',
      description: 'Optional. A simple text table shown alongside (or instead of) the image — e.g. Size 40 → 25.5 cm.',
      of: [
        {
          type: 'object',
          name: 'sizeChartRow',
          fields: [
            defineField({name: 'size', title: 'Size', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'measurementCm', title: 'Foot Length (cm)', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {
            select: {size: 'size', measurementCm: 'measurementCm'},
            prepare({size, measurementCm}) {
              return {title: `Size ${size}`, subtitle: `${measurementCm} cm`}
            },
          },
        },
      ],
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
