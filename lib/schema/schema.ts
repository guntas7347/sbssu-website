import {
  academicCouncilSchema,
  academicRegulationsSchema,
  authoritiesSchema,
  bogSchema,
  byLawsSchema,
  committeesSchema,
  DownloadCardSchema,
  governanceSchema,
  HeroGallerySchema,
  meetingsSchema,
  rtiSchema,
  societySchema,
  viceChancellorSchema,
} from "./central";
import {
  AcademicCalendarSchema,
  BoardOfStudiesSchema,
  CourseOutcomesSchema,
  FacultySchema,
  HODSchema,
  LaboratoriesSchema,
  ResearchProjectsSchema,
  StudentSocietiesSchema,
  SyllabusSchema,
  TimetablesSchema,
} from "./department";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "file"
  | "array"
  | "array-string";

type FieldSchema = {
  type: FieldType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // for select
  item?: Schema; // for array
};

export type Schema = {
  fields: Record<string, FieldSchema>;
};

export const schemaRegistry = {
  society: societySchema,
  "vc-message": viceChancellorSchema,
  bog: bogSchema,
  authorities: authoritiesSchema,
  "hero-gallery": HeroGallerySchema,
  "governance-structure": governanceSchema,
  "academic-council": academicCouncilSchema,
  "university-committees": committeesSchema,
  "university-bylaws": byLawsSchema,
  "rti-cell": rtiSchema,
  "council-meetings": meetingsSchema,
  "academic-regulations": academicRegulationsSchema,
  hod: HODSchema,
  faculty: FacultySchema,
  bos: BoardOfStudiesSchema,
  "course-outcomes": CourseOutcomesSchema,
  labs: LaboratoriesSchema,
  "funded-research": ResearchProjectsSchema,
  "student-society": StudentSocietiesSchema,
  timetable: TimetablesSchema,
  "academic-calendar": AcademicCalendarSchema,
  syllabus: SyllabusSchema,
  courses: DownloadCardSchema,
  "fees-structure": DownloadCardSchema,
  "academic-eligibility": DownloadCardSchema,
  "graduation-certificate": DownloadCardSchema,
};
