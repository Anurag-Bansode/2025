export interface Department {
  department: string;
  about: string;
  message_from_hod: {
    name: string;
    designation: string;
    message: string;
  };
  faculty_members: {
    name: string;
    designation: string;
  }[];
  research_scholars: {
    name: string;
    src: string;
    emailId: string;
    dept: string;
    researchArea: string;
    supervisor: string;
    PersonalPage: string;
    status: string;
  }[];
  research_areas: string[];
  announcements: {
    title: string;
    date: string;
    link: string;
  }[];
  latest_news: {
    title: string;
  }[];
  contact: {
    department: string;
    college: string;
    location: string;
    email: string;
    phone: string;
  };
  programme_offered: string[];
  notable_alumni: string[];
  rank_holder: string[];
  placed_student: {
    company: string;
    student_placed: string[];
  }[];
  lab_facilities: {
    link?: string;
    description?: string;
  }[];
  demographic: {
    total_students: number;
    btech: ProgramDemographic;
    mtech: ProgramDemographic;
  };
}

interface YearWiseCount {
  year: string;
  count: number;
}

interface ProgramDemographic {
  total: number;
  year_wise: YearWiseCount[];
}

export interface DepartmentsData {
  name: string;
  description: string;
  url: string;
}
