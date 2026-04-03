export interface FAQItem {
  q: string;
  a: string;
}

export type FAQCategory =
  | "GENERAL"
  | "ACCOUNT"
  | "PROPERTIES"
  | "PAYMENTS"
  | "SUPPORT";

export const faqData: Record<FAQCategory, FAQItem[]> = {
  GENERAL: [
    {
      q: "What is this platform about?",
      a: "Manage properties, connect with agents, and explore listings in one system.",
    },
    {
      q: "Is the platform free?",
      a: "Core features are free. Some advanced tools may require subscription.",
    },
    {
      q: "Can I use mobile?",
      a: "Yes, fully responsive across devices.",
    },
    {
      q: "Is my data secure?",
      a: "We use encrypted communication and modern security practices.",
    },
  ],

  ACCOUNT: [
    {
      q: "How can I reset password?",
      a: "Use 'Forgot Password' on login page.",
    },
    {
      q: "Change phone number?",
      a: "Update from profile settings.",
    },
    {
      q: "Delete account?",
      a: "Request via settings or support.",
    },
    {
      q: "Multiple accounts?",
      a: "We recommend one account per user.",
    },
  ],

  PROPERTIES: [
    {
      q: "How to list property?",
      a: "Dashboard → Add Property.",
    },
    {
      q: "Edit property later?",
      a: "Yes, anytime.",
    },
    {
      q: "Approval time?",
      a: "Usually within 24 hours.",
    },
    {
      q: "Why rejected?",
      a: "Check required details and images.",
    },
  ],

  PAYMENTS: [
    {
      q: "Payment methods?",
      a: "Cards and local systems supported.",
    },
    {
      q: "Are payments secure?",
      a: "Yes, encrypted transactions.",
    },
    {
      q: "Refunds?",
      a: "Depends on service policy.",
    },
    {
      q: "Invoices?",
      a: "Available in billing section.",
    },
  ],

  SUPPORT: [
    {
      q: "Contact support?",
      a: "Use support page or email.",
    },
    {
      q: "Response time?",
      a: "Within 24 hours.",
    },
    {
      q: "Live chat?",
      a: "Available during working hours.",
    },
    {
      q: "Report bugs?",
      a: "Use support section.",
    },
  ],
};

export const categories = Object.keys(faqData) as FAQCategory[];
