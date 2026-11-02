import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'offer',
  title: 'Offer',
  type: 'document',
  description:
    'A time-limited offer for specific products, e.g. "Christmas Sale" running all of December. Only one offer should be active (dates overlapping today) at a time — the site shows whichever one is currently in range.',
  fields: [
    defineField({
      name: 'title',
      title: 'Offer Title (English)',
      type: 'string',
      description: 'e.g. "Christmas Sale"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleSi',
      title: 'Offer Title (Sinhala)',
      type: 'string',
    }),
    defineField({
      name: 'bannerTextEn',
      title: 'Banner Text (English)',
      type: 'string',
      description: 'Short line shown in the homepage banner, e.g. "20% off selected styles this December"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerTextSi',
      title: 'Banner Text (Sinhala)',
      type: 'string',
    }),
    defineField({
      name: 'discountPercent',
      title: 'Discount %',
      type: 'number',
      description: 'Optional. If set, the discounted price is shown automatically on offer products.',
      validation: (Rule) => Rule.min(0).max(90),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products on Offer',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Only these products will show the offer badge and discounted price.',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', start: 'startDate', end: 'endDate'},
    prepare({title, start, end}) {
      return {title, subtitle: `${start} → ${end}`}
    },
  },
})
