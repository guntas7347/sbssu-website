import { Schema } from "./schema";

export const HODSchema: Schema = {
  fields: {
    hodPic: {
      type: "image",
      label: "HOD Pic",
      required: true,
    },
    name: {
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter full name",
    },
    position: {
      type: "text",
      label: "Position",
      required: true,
    },
    email: {
      type: "text",
      label: "Email",
      required: true,
      placeholder: "example@domain.com",
    },
    phone: {
      type: "text",
      label: "Phone",
      required: true,
      placeholder: "000-000-0000",
    },
    message: {
      type: "textarea",
      label: "Message",
      required: true,
    },
    qualifications: {
      type: "array-string",
      label: "Qualifications",
      required: false,
    },
  },
};

export const FacultySchema: Schema = {
  fields: {
    faculty: {
      type: "array",
      label: "Faculty Members",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          name: {
            type: "text",
            label: "Full Name",
            required: true,
          },
          designation: {
            type: "text",
            label: "Designation",
            required: true,
          },
          email: {
            type: "text",
            label: "Email",
            required: true,
          },
          photo: {
            type: "image",
            label: "Profile Photo",
            required: true,
          },
          qualifications: {
            type: "textarea",
            label: "Qualifications",
            required: false,
          },
          specialization: {
            type: "textarea",
            label: "Research Interests (comma separated)",
            required: false,
          },
        },
      },
    },
  },
};

export const BoardOfStudiesSchema: Schema = {
  fields: {
    about: {
      type: "textarea",
      label: "About BOS",
      required: true,
    },

    bosMembers: {
      type: "array",
      label: "BOS Members",
      item: {
        fields: {
          name: {
            type: "text",
            label: "Member Name",
            required: true,
          },
          role: {
            type: "text",
            label: "Role / Designation",
            required: true,
          },
          type: {
            type: "select",
            label: "Member Type",
            required: true,
            options: ["Internal", "External", "Industry", "Alumni", "Other"],
          },
        },
      },
    },

    responsibilities: {
      type: "array-string",
      label: "Key Responsibilities",
      required: true,
    },

    meetingInfo: {
      type: "textarea",
      label: "Meeting Schedule Text",
      required: true,
    },
    file: {
      type: "file",
      label: "Attachment",
      required: false,
    },
  },
};

export const CourseOutcomesSchema: Schema = {
  fields: {
    peos: {
      type: "array",
      label: "Program Educational Objectives (PEOs)",
      item: {
        fields: {
          title: {
            type: "text",
            label: "PEO Title (e.g. PEO 1)",
            required: true,
          },
          description: {
            type: "textarea",
            label: "PEO Description",
            required: true,
          },
        },
      },
    },

    pos: {
      type: "array",
      label: "Program Outcomes (POs)",
      item: {
        fields: {
          code: {
            type: "text",
            label: "PO Code (e.g. PO1)",
            required: true,
          },
          title: {
            type: "text",
            label: "PO Title",
            required: true,
          },
          description: {
            type: "textarea",
            label: "PO Description",
            required: true,
          },
        },
      },
    },

    psos: {
      type: "array",
      label: "Program Specific Outcomes (PSOs)",
      item: {
        fields: {
          code: {
            type: "text",
            label: "PSO Code (e.g. PSO1)",
            required: true,
          },
          description: {
            type: "textarea",
            label: "PSO Description",
            required: true,
          },
        },
      },
    },
  },
};

export const LaboratoriesSchema: Schema = {
  fields: {
    intro: {
      type: "textarea",
      label: "Laboratories Introduction",
      required: true,
    },

    labs: {
      type: "array",
      label: "Laboratories",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          name: {
            type: "text",
            label: "Lab Name",
            required: true,
          },
          location: {
            type: "text",
            label: "Location",
            required: true,
          },
          description: {
            type: "textarea",
            label: "Description",
            required: true,
          },
          equipment: {
            type: "textarea",
            label: "Equipment (comma separated)",
            required: false,
          },
          capacity: {
            type: "number",
            label: "Student Capacity",
            required: true,
          },
          lab_incharge: {
            type: "text",
            label: "Lab In-charge",
            required: true,
          },
          photo: {
            type: "image",
            label: "Image",
            required: false,
          },
        },
      },
    },
  },
};

export const ResearchProjectsSchema: Schema = {
  fields: {
    research: {
      type: "array",
      label: "Research Projects",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          title: {
            type: "text",
            label: "Project Title",
            required: true,
          },
          description: {
            type: "textarea",
            label: "Project Description",
            required: true,
          },
          pi_name: {
            type: "text",
            label: "Principal Investigator",
            required: true,
          },
          funding_agency: {
            type: "text",
            label: "Funding Agency",
            required: true,
          },
          start_year: {
            type: "number",
            label: "Start Year",
            required: true,
          },
          end_year: {
            type: "number",
            label: "End Year",
            required: true,
          },
          funding_amount: {
            type: "text",
            label: "Funding Amount",
            required: true,
          },
          file: {
            type: "file",
            label: "Attachment",
            required: false,
          },
        },
      },
    },
  },
};

export const StudentSocietiesSchema: Schema = {
  fields: {
    societies: {
      type: "array",
      label: "Student Societies",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          name: {
            type: "text",
            label: "Society Name",
            required: true,
          },
          description: {
            type: "textarea",
            label: "Description",
            required: true,
          },
          coordinator: {
            type: "text",
            label: "Faculty Coordinator",
            required: true,
          },
          student_coordinators: {
            type: "textarea",
            label: "Student Coordinators",
            required: true,
          },
          activities: {
            type: "textarea",
            label: "Activities",
            required: true,
          },
        },
      },
    },
  },
};

export const TimetablesSchema: Schema = {
  fields: {
    timetables: {
      type: "array",
      label: "Class Timetables",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          class_name: {
            type: "text",
            label: "Class Name",
            required: true,
          },
          semester: {
            type: "text",
            label: "Semester",
            required: true,
          },
          academic_year: {
            type: "text",
            label: "Academic Year (e.g. 2025-26)",
            required: true,
          },
          file: {
            type: "file",
            label: "Timetable PDF",
            required: true,
          },
        },
      },
    },
  },
};

export const AcademicCalendarSchema: Schema = {
  fields: {
    items: {
      type: "array",
      label: "Academic Calendar",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          subTitle: {
            type: "text",
            label: "Year",
            required: true,
          },
          desc: {
            type: "textarea",
            label: "Description",
            required: false,
          },
          footer: {
            type: "text",
            label: "Footer Note (e.g. Published date)",
            required: false,
          },
          file: {
            type: "file",
            label: "Download File",
            required: false,
          },
        },
      },
    },
  },
};

export const SyllabusSchema: Schema = {
  fields: {
    items: {
      type: "array",
      label: "Syllabus",
      item: {
        fields: {
          id: {
            type: "text",
            required: true,
          },
          subTitle: {
            type: "text",
            label: "Heading",
            required: true,
          },
          desc: {
            type: "textarea",
            label: "Description",
            required: false,
          },
          footer: {
            type: "text",
            label: "Footer Note (e.g. Published date)",
            required: false,
          },
          file: {
            type: "file",
            label: "Download File",
            required: false,
          },
        },
      },
    },
  },
};
