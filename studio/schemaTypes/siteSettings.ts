import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings (How to Order / Policy Notes)',
  type: 'document',
  description: 'There should only be ONE of these documents — it holds the store-wide "How to Order" guide and policy notes shown across the site.',
  fields: [
    defineField({
      name: 'policyNoteEn',
      title: 'Policy Note (English)',
      type: 'text',
      rows: 4,
      description:
        'E.g. sole manufacturer notice, made-to-order timing, delivery charges. Shown on the homepage and product pages.',
    }),
    defineField({
      name: 'policyNoteSi',
      title: 'Policy Note (Sinhala)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'orderingStepsEn',
      title: 'How to Order — Steps (English)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One line per step, in order.',
    }),
    defineField({
      name: 'orderingStepsSi',
      title: 'How to Order — Steps (Sinhala)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
