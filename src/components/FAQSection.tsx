import React from "react";

interface FAQSectionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * FAQSection — renders Q&A as visible blocks with HTML answers.
 *
 * IMPORTANT: `answer` is rendered via dangerouslySetInnerHTML so that
 * inline <strong>, <em>, links from generated content render correctly.
 * The accordion was removed 2026-09-10: Radix did not render the content of a
 * closed block, so FAQ answers were missing from the DOM entirely while the
 * FAQPage schema stayed complete. Answers now render as visible h3 + text.
 *
 * Also strips trailing GPT artefacts like "---" or "**E-E-A-T signal:** ..."
 * residue.
 */
const FAQSection: React.FC<FAQSectionProps> = ({ items }) => (
  <div className="w-full space-y-6">
    {items.map((item, i) => (
      <div key={i}>
        <h3 className="text-lg font-semibold mb-2 text-left">
          {item.question}
        </h3>
        <div className="text-foreground/80">
          <div
            className="prose prose-sm max-w-none [&_strong]:text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: item.answer.replace(/\s*---\s*$/, "").trim(),
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default FAQSection;
