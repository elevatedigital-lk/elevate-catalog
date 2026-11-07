import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings (How to Order / Policy Notes)',
  type: 'document',
  description: 'There should only be ONE of these documents — it holds the store-wide "How to Order" guide and policy notes shown across the site.',
  fields: [
    defineField({
      name: 'heroSlides',
      title: 'Homepage Image Slider',
      type: 'array',
      description:
        'The banner slider at the top of the homepage. Add up to a handful of images — each can be switched on/off without deleting it, and dragged to reorder.',
      of: [
        {
          type: 'object',
          name: 'heroSlide',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text (for accessibility, optional)',
              type: 'string',
            }),
            defineField({
              name: 'enabled',
              title: 'Show this slide',
              type: 'boolean',
              initialValue: true,
              description: 'Turn off to hide this slide without deleting it.',
            }),
          ],
          preview: {
            select: {media: 'image', enabled: 'enabled', alt: 'alt'},
            prepare({media, enabled, alt}) {
              return {
                title: alt || 'Slide',
                subtitle: enabled === false ? 'Hidden' : 'Visible',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'offerBarEn',
      title: 'Top Announcement Bar (English)',
      type: 'string',
      description: 'Short line shown in a slim black bar at the very top of every page, e.g. "Islandwide delivery • Handmade in Sri Lanka". Leave blank to hide it.',
    }),
    defineField({
      name: 'offerBarSi',
      title: 'Top Announcement Bar (Sinhala)',
      type: 'string',
    }),
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
