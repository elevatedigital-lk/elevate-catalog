'use client'

import {useLanguage} from './LanguageProvider'
import {HomepageContent} from '@/sanity'

interface ProposalSectionProps {
  content: HomepageContent
}

export default function ProposalSection({content}: ProposalSectionProps) {
  const {lang} = useLanguage()

  // If HTML embed is provided, render it
  if (content.proposalV4Content && !content.showProposalSections) {
    return (
      <div
        className="prose prose-sm max-w-none"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: content.proposalV4Content}}
      />
    )
  }

  // Otherwise render sections
  if (!content.proposalSections || content.proposalSections.length === 0) {
    return null
  }

  return (
    <div className="space-y-12">
      {content.proposalSections.map((section, idx) => {
        const title =
          lang === 'si' ? section.titleSi || section.titleEn : section.titleEn
        const sectionContent =
          lang === 'si' ? section.contentSi || section.contentEn : section.contentEn

        if (!title) return null

        return (
          <div key={idx} className={`section-${section.type}`}>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {sectionContent}
            </div>
          </div>
        )
      })}
    </div>
  )
}
