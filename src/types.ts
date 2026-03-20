
export interface Company {
  id: string;
  name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  created_at?: string;
}

export interface Job {
  id: string;
  title: string;
  type: 'Full-Time' | 'Part-Time' | 'Remote' | 'Internship';
  location: string;
  description: string;
  salary: string;
  company_id: string;
  created_at: string;
  companies?: Company; // This handles the Supabase join
}

