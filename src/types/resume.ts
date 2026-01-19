export type ResumeLink = {
  id: string;
  label: string;
  url: string;
};

export type ResumeDetails = {
  name: string;
  email: string;
  phone: string;
  links: ResumeLink[];
};

export type ResumeItem = {
  id: string;
  title: string; // e.g., Company name or Project title
  subtitle?: string; // e.g., Role or Tech stack
  date?: string;
  description: string; // Rich HTML
};

export type ResumeSection = {
  id: string;
  title: string;
  type: 'experience' | 'education' | 'projects' | 'custom';
  items: ResumeItem[];
};

export type ResumeData = {
  templateId: string;
  meta: {
    fileName: string;
  };
  details: ResumeDetails;
  sections: ResumeSection[];
};

export const INITIAL_RESUME: ResumeData = {
  templateId: 'standard',
  meta: {
    fileName: 'resume',
  },
  details: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    links: [
      { id: '1', label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      { id: '2', label: 'GitHub', url: 'https://github.com/johndoe' },
    ],
  },
  sections: [
    {
      id: 'sec_1',
      title: 'Experience',
      type: 'experience',
      items: [
        {
          id: 'item_1',
          title: 'Acme Corp',
          subtitle: 'Senior Developer',
          date: '2020 - Present',
          description: '<p>Led a team of developers to build...</p>',
        },
      ],
    },
    {
      id: 'sec_2',
      title: 'Education',
      type: 'education',
      items: [
        {
          id: 'item_2',
          title: 'University of Tech',
          subtitle: 'B.S. Computer Science',
          date: '2016 - 2020',
          description: '<p>Graduated with honors.</p>',
        },
      ],
    },
  ],
};
