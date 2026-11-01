export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How long does document attestation take?",
    answer:
      "Standard attestation takes 5–7 working days from the date we receive your original documents. An express service (2–3 working days) is available for most document types, subject to authority availability. Timelines may extend during public holidays.",
    category: "Timelines",
  },
  {
    id: "faq-2",
    question: "What documents do I need to provide?",
    answer:
      "Requirements vary by service. At minimum you will need the original document (or a certified copy), a valid government-issued photo ID, and a completed application form. Commercial clearing may require additional company registration records. Full checklists are provided after you submit a quote request.",
    category: "Requirements",
  },
  {
    id: "faq-3",
    question: "What is the difference between attestation and apostille?",
    answer:
      "An apostille is a standardised certificate issued under the 1961 Hague Convention and is accepted directly by all 120-plus member countries. Attestation is the broader process of having a document authenticated by the relevant embassy or authority — required for countries not party to the Hague Convention.",
    category: "General",
  },
  {
    id: "faq-4",
    question: "Can I track the status of my application?",
    answer:
      "Yes. Every application is assigned a unique reference number (formatted CT-YYYY-NNNN) at submission. You can enter this reference on the Track page at any time to see your current stage, history, and estimated completion date.",
    category: "Tracking",
  },
  {
    id: "faq-5",
    question: "Do you handle commercial and corporate documents?",
    answer:
      "Yes. Our commercial clearing service covers trade licences, certificates of incorporation, chamber of commerce attestation, certificates of origin, and import/export permits. We manage the complete sequence of filings on your behalf.",
    category: "Services",
  },
  {
    id: "faq-6",
    question: "Which languages do you offer translation for?",
    answer:
      "Our network of sworn translators covers more than 40 language pairs, including Arabic, French, Spanish, German, Mandarin, Hindi, Urdu, and all major European languages. Please contact us if your language pair is not listed.",
    category: "Services",
  },
  {
    id: "faq-7",
    question: "How do I submit my documents?",
    answer:
      "You may submit documents in person at our offices, by registered courier, or — for digital-native documents — via the secure upload link provided after you submit a quote request. Physical originals are required for most attestation and apostille services.",
    category: "Requirements",
  },
  {
    id: "faq-8",
    question: "What is your refund policy?",
    answer:
      "If we are unable to process your application due to an error on our part, we will provide a full refund or re-process at no additional cost. Government and authority fees paid on your behalf are non-refundable once submitted. Please review our refund policy for full details.",
    category: "Fees",
  },
  {
    id: "faq-9",
    question: "How are your fees structured?",
    answer:
      "Our fees are itemised: a service fee for ClearTrack's handling, plus any government or embassy fees applicable to your specific document and destination country. A detailed fee schedule is provided in your quote. There are no hidden charges.",
    category: "Fees",
  },
  {
    id: "faq-10",
    question: "Are my documents kept confidential?",
    answer:
      "All documents and personal data are handled in strict confidence. Access is limited to authorised staff processing your application. We do not share your information with third parties except the government authorities required to process your request.",
    category: "General",
  },
  {
    id: "faq-11",
    question: "What happens if additional documents are required?",
    answer:
      "If our review team identifies missing or insufficient documents, you will receive an email with a secure upload link and a precise list of what is needed. Your application is paused until the additional documents are received, and your estimated completion date is updated accordingly.",
    category: "Tracking",
  },
  {
    id: "faq-12",
    question: "Can I request an express service after submission?",
    answer:
      "Express upgrades may be possible depending on the current stage and authority availability. Please contact our office as soon as possible with your reference number. We cannot guarantee upgrades once a file has been lodged with an authority.",
    category: "Timelines",
  },
];
