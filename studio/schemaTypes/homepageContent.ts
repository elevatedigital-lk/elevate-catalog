import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banners',
      title: 'Banner Slider (3 images, auto-rotate)',
      type: 'array',
      of: [
        defineField({
          name: 'bannerSlide',
          title: 'Banner Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Banner Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headingEn',
              title: 'Heading (English)',
              type: 'string',
            }),
            defineField({
              name: 'headingSi',
              title: 'Heading (Sinhala)',
              type: 'string',
            }),
            defineField({
              name: 'subheadingEn',
              title: 'Subheading (English)',
              type: 'string',
            }),
            defineField({
              name: 'subheadingSi',
              title: 'Subheading (Sinhala)',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'proposalV4Content',
      title: 'Proposal V4 Content (HTML embed)',
      type: 'text',
      description: 'Paste HTML from ELEVATE_CATALOG_PROPOSAL_V4.html or manage sections below',
    }),
    defineField({
      name: 'showProposalSections',
      title: 'Show Proposal Sections',
      type: 'boolean',
      description: 'If true, use sections below instead of HTML embed',
      initialValue: false,
    }),
    defineField({
      name: 'proposalSections',
      title: 'Proposal Sections',
      type: 'array',
      hidden: ({parent}) => !parent?.showProposalSections,
      of: [
        defineField({
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Problem', value: 'problem'},
                  {title: 'Solution', value: 'solution'},
                  {title: 'Features', value: 'features'},
                  {title: 'Pricing', value: 'pricing'},
                  {title: 'ROI', value: 'roi'},
                  {title: 'CTA', value: 'cta'},
                ],
              },
            }),
            defineField({
              name: 'titleEn',
              title: 'Title (English)',
              type: 'string',
            }),
            defineField({
              name: 'titleSi',
              title: 'Title (Sinhala)',
              type: 'string',
            }),
            defineField({
              name: 'contentEn',
              title: 'Content (English)',
              type: 'text',
            }),
            defineField({
              name: 'contentSi',
              title: 'Content (Sinhala)',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaButtonEn',
      title: 'CTA Button Text (English)',
      type: 'string',
      initialValue: 'See Demo',
    }),
    defineField({
      name: 'ctaButtonSi',
      title: 'CTA Button Text (Sinhala)',
      type: 'string',
      initialValue: 'ඩෙමෝ බලන්න',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
