export type Stage = 0 | 1 | 2 | 3 | 4 | 5;

export const STAGE_LABELS: Record<Stage, string> = {
  0: "Submitted",
  1: "Documents under review",
  2: "Documents verified",
  3: "With the authority",
  4: "Ready for collection",
  5: "Delivered",
};

export interface HistoryEntry {
  stage: Stage;
  timestamp: string; // ISO 8601
  note?: string;
}

export interface Application {
  reference: string;
  firstName: string;
  service: string;
  stage: Stage;
  history: HistoryEntry[];
  officerRemark: string;
  estimatedDate: string; // ISO date YYYY-MM-DD
  extraDocsRequired?: boolean;
}

export const applications: Application[] = [
  {
    reference: "CT-2026-0042",
    firstName: "Amara",
    service: "Educational certificate attestation",
    stage: 5,
    history: [
      { stage: 0, timestamp: "2026-10-14T09:12:00Z", note: "Request received and reference issued." },
      { stage: 1, timestamp: "2026-10-15T10:30:00Z", note: "Documents submitted to review team." },
      { stage: 2, timestamp: "2026-10-17T14:05:00Z", note: "All documents verified and accepted." },
      { stage: 3, timestamp: "2026-10-20T08:45:00Z", note: "File lodged with the issuing authority." },
      { stage: 4, timestamp: "2026-10-27T16:00:00Z", note: "Attestation complete. Ready for collection." },
      { stage: 5, timestamp: "2026-10-29T11:20:00Z", note: "Documents delivered to applicant." },
    ],
    officerRemark: "All attestations completed without issue. Please retain originals for your records.",
    estimatedDate: "2026-10-29",
  },
  {
    reference: "CT-2026-0043",
    firstName: "Rohan",
    service: "Commercial document legalisation",
    stage: 3,
    history: [
      { stage: 0, timestamp: "2026-10-20T11:00:00Z", note: "Request received and reference issued." },
      { stage: 1, timestamp: "2026-10-21T09:15:00Z", note: "Documents submitted to review team." },
      { stage: 2, timestamp: "2026-10-23T13:40:00Z", note: "All documents verified and accepted." },
      { stage: 3, timestamp: "2026-10-25T10:00:00Z", note: "File lodged with the Ministry of Foreign Affairs." },
    ],
    officerRemark: "File is currently with the authority. Processing times may vary during public holidays.",
    estimatedDate: "2026-11-04",
  },
  {
    reference: "CT-2026-0044",
    firstName: "Lena",
    service: "Personal document translation and notarisation",
    stage: 1,
    extraDocsRequired: true,
    history: [
      { stage: 0, timestamp: "2026-10-28T08:30:00Z", note: "Request received and reference issued." },
      { stage: 1, timestamp: "2026-10-29T10:00:00Z", note: "Documents submitted to review team." },
    ],
    officerRemark:
      "Additional supporting documents are required. Please upload a certified copy of your passport via the secure portal link sent to your email.",
    estimatedDate: "2026-11-10",
  },
  {
    reference: "CT-2026-0045",
    firstName: "Tariq",
    service: "Legal power of attorney attestation",
    stage: 2,
    history: [
      { stage: 0, timestamp: "2026-10-26T14:00:00Z", note: "Request received and reference issued." },
      { stage: 1, timestamp: "2026-10-27T09:30:00Z", note: "Documents submitted to review team." },
      { stage: 2, timestamp: "2026-10-30T11:45:00Z", note: "All documents verified and accepted." },
    ],
    officerRemark: "Documents verified successfully. File will be forwarded to the authority shortly.",
    estimatedDate: "2026-11-07",
  },
];
