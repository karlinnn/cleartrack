export type Stage =
  | "Submitted"
  | "Documents under review"
  | "Documents verified"
  | "With the authority"
  | "Ready for collection"
  | "Delivered";

export const STAGES: Stage[] = [
  "Submitted",
  "Documents under review",
  "Documents verified",
  "With the authority",
  "Ready for collection",
  "Delivered",
];

export interface HistoryEntry {
  date: string; // ISO
  note: string;
}

export interface Application {
  reference: string;
  firstName: string;
  service: string;
  stageIndex: number; // 0-5
  history: HistoryEntry[];
  officerRemark: string;
  estimatedDate: string; // "DD Month YYYY"
  additionalDocumentsRequired?: boolean;
}

export const APPLICATIONS: Application[] = [
  {
    reference: "CT-2026-0042",
    firstName: "Priya",
    service: "Document attestation",
    stageIndex: 1,
    history: [
      { date: "2026-10-28T09:14:00Z", note: "File received at ClearTrack office." },
      { date: "2026-10-29T10:02:00Z", note: "Assigned to clearing officer. Documents under review." },
    ],
    officerRemark:
      "Original birth certificate received. Awaiting sight of the supporting authority letter before submission.",
    estimatedDate: "7 November 2026",
    additionalDocumentsRequired: true,
  },
  {
    reference: "CT-2026-0043",
    firstName: "James",
    service: "Apostille certification",
    stageIndex: 3,
    history: [
      { date: "2026-10-22T08:30:00Z", note: "File received at ClearTrack office." },
      { date: "2026-10-23T11:45:00Z", note: "Documents reviewed and verified. No issues found." },
      { date: "2026-10-24T09:00:00Z", note: "Documents verified and submitted to the authority." },
      { date: "2026-10-27T14:20:00Z", note: "Submission acknowledged by competent authority. Processing underway." },
    ],
    officerRemark:
      "Submission is with the Foreign, Commonwealth and Development Office. Standard queue — no issues reported.",
    estimatedDate: "5 November 2026",
  },
  {
    reference: "CT-2026-0044",
    firstName: "Fatima",
    service: "Translation and notarisation",
    stageIndex: 4,
    history: [
      { date: "2026-10-18T10:00:00Z", note: "File received at ClearTrack office." },
      { date: "2026-10-19T09:30:00Z", note: "Translation completed. Documents under notary review." },
      { date: "2026-10-21T11:00:00Z", note: "Notarisation complete. Documents verified." },
      { date: "2026-10-22T08:45:00Z", note: "Submitted to the relevant authority." },
      { date: "2026-10-29T15:10:00Z", note: "Authority has released the documents. Ready for collection." },
    ],
    officerRemark:
      "Documents are ready at our Dubai office. You may collect Monday to Thursday, 08:30–17:00.",
    estimatedDate: "Available now",
  },
  {
    reference: "CT-2026-0045",
    firstName: "Mohammed",
    service: "Commercial document clearing",
    stageIndex: 5,
    history: [
      { date: "2026-10-10T09:00:00Z", note: "File received at ClearTrack office." },
      { date: "2026-10-11T10:15:00Z", note: "Commercial documents reviewed. Complete set confirmed." },
      { date: "2026-10-13T09:00:00Z", note: "Documents verified. Authority submission prepared." },
      { date: "2026-10-14T08:30:00Z", note: "Submitted to Chamber of Commerce." },
      { date: "2026-10-20T13:45:00Z", note: "Chamber attestation collected. Documents ready." },
      { date: "2026-10-22T11:00:00Z", note: "Delivered by registered courier. Signed receipt confirmed." },
    ],
    officerRemark: "All documents delivered and signed for. File closed.",
    estimatedDate: "Completed",
  },
];
