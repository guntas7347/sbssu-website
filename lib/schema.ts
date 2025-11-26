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

export const societySchema = {
  fields: {
    members: {
      type: "array",
      label: "Society Members",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Full Name" },
          position: { type: "text", required: true, label: "Position" },
          contact: { type: "text", label: "Email / Phone" },
          photo: { type: "image", label: "Photo" },
        },
      },
    },
  },
};

export const viceChancellorSchema = {
  fields: {
    name: { type: "text", required: true, label: "Full Name" },
    position: { type: "text", required: true, label: "Position" },
    phone: { type: "text", required: true, label: "Email" },
    email: { type: "text", required: true, label: "Phone" },
    photo: { type: "image", required: true, label: "Photo" },
    message: { type: "textarea", required: true, label: "Message" },
    officeHours: { type: "text", required: true, label: "Office Hours" },
    officeLocation: { type: "text", required: true, label: "Office Location" },
  },
};

export const authoritiesSchema = {
  fields: {
    authorities: {
      type: "array",
      label: "Authorities",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Name" },
          designation: { type: "text", required: true, label: "Designation" },
          phone: { type: "text", label: "Phone" },
          email: { type: "text", label: "Email" },
          photo: { type: "image", label: "Photo" },
          about: { type: "textarea", label: "About" },
        },
      },
    },
  },
};

export const bogSchema = {
  fields: {
    about: {
      type: "textarea",
      required: true,
      label: "About the Board",
    },

    boardMembers: {
      type: "array",
      label: "Board Members",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Name" },
          designation: { type: "text", required: true, label: "Designation" },
        },
      },
    },

    meetingSchedule: {
      type: "textarea",
      required: true,
      label: "Meeting Schedule",
    },
  },
};

export const HeroGallerySchema = {
  fields: {
    images: {
      type: "array",
      label: "Images",
      item: {
        fields: {
          photo: { type: "image", required: true, label: "Photo" },
        },
      },
    },
  },
};

export const governanceSchema = {
  fields: {
    about: {
      type: "textarea",
      label: "About University Governance",
      required: true,
    },
    cards: {
      type: "array",
      label: "Cards",
      item: {
        fields: {
          heading: { type: "text", label: "Heading" },
          subHeading: { type: "text", label: "Sub Heading" },
          list: {
            type: "text",
            label: "List (seperate by comma (,))",
          },
        },
      },
    },
    sbsAct: {
      type: "file",
      label: "SBS ACT 2021 PDF",
    },
  },
};
export const academicCouncilSchema: Schema = {
  fields: {
    about: {
      type: "textarea",
      required: true,
      label: "About the Academic Council",
    },

    councilMembers: {
      type: "array",
      label: "Council Members",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Name" },
          designation: { type: "text", required: true, label: "Designation" },
        },
      },
    },

    responsibilities: {
      type: "array-string",
      label: "Responsibilities",
    },
    meetingSchedule: {
      type: "textarea",
      required: true,
      label: "Meeting Schedule",
    },
  },
};

export const committeesSchema: Schema = {
  fields: {
    about: {
      type: "textarea",
      required: true,
      label: "About the Committees",
    },

    committees: {
      type: "array",
      label: "Committees",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Commttee Name" },
          purpose: {
            type: "textarea",
            required: true,
            label: "Purpose",
          },

          members: {
            type: "array-string",
            label: "Committee Members",
          },
        },
      },
    },
  },
};

export const byLawsSchema: Schema = {
  fields: {
    about: {
      type: "textarea",
      required: true,
      label: "About University By-Laws",
    },

    documents: {
      type: "array",
      label: "Documents",
      item: {
        fields: {
          title: { type: "text", required: true, label: "Title" },
          size: {
            type: "text",
            required: true,
            label: "File Size (e.g., 2.5 MB)",
          },
          description: {
            type: "text",
            required: true,
            label: "Description",
          },
          file: { type: "file", required: true, label: "PDF File" },
        },
      },
    },

    keyProvisions: {
      type: "array",
      label: "Key Provisions",
      item: {
        fields: {
          title: { type: "text", required: true, label: "Title" },
          provision: { type: "text", required: true, label: "Provision" },
        },
      },
    },

    amendmentProcedure: {
      type: "textarea",
      required: true,
      label: "Amendment Procedure",
    },
  },
};

export const rtiSchema: Schema = {
  fields: {
    pio: {
      type: "array",
      label: "Public Information Officer (PIO)",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Name" },
          designation: { type: "text", required: true, label: "Designation" },
          email: { type: "text", required: true, label: "Email" },
          phone: { type: "text", required: true, label: "Phone" },
          officeHours: { type: "text", required: true, label: "Office Hours" },
        },
      },
    },

    appellateAuthority: {
      type: "array",
      label: "Appellate Authority",
      item: {
        fields: {
          name: { type: "text", required: true, label: "Name" },
          designation: { type: "text", required: true, label: "Designation" },
          email: { type: "text", required: true, label: "Email" },
          phone: { type: "text", required: true, label: "Phone" },
          remarks: { type: "text", required: true, label: "Remarks" },
        },
      },
    },

    importantInfo: {
      type: "array",
      label: "Important Information",
      item: {
        fields: {
          applicationFee: {
            type: "text",
            required: true,
            label: "Application Fee",
          },
          responseTime: {
            type: "text",
            required: true,
            label: "Response Time",
          },
          appealPeriod: {
            type: "text",
            required: true,
            label: "Appeal Period",
          },
          bplCitizens: {
            type: "text",
            required: true,
            label: "BPL Citizens",
          },
        },
      },
    },

    documents: {
      type: "array",
      label: "RTI Documents",
      item: {
        fields: {
          file: { type: "file", required: true, label: "PDF File" },
        },
      },
    },
  },
};

export const meetingsSchema: Schema = {
  fields: {
    meetings: {
      type: "array",
      label: "Meetings",
      item: {
        fields: {
          name: {
            type: "text",
            required: true,
            label: "Meeting Name",
          },

          date: {
            type: "text",
            required: true,
            label: "Meeting Date (YYYY-MM-DD)",
          },

          category: {
            type: "select",
            required: true,
            label: "Category",
            options: [
              "Academic Council",
              "Finance Committee",
              "Planning Board",
              "Examination Board",
              "Research Committee",
              "Other",
            ],
          },

          agenda: {
            type: "textarea",
            label: "Agenda",
          },

          documents: {
            type: "array",
            label: "Documents",
            item: {
              fields: {
                doc: {
                  type: "file",
                  required: true,
                  label: "Document Title",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const academicRegulationsSchema = {
  fields: {
    overview: {
      type: "textarea",
      required: true,
      label: "Overview",
    },
    regulations: {
      type: "array",
      label: "Regulations",
      item: {
        fields: {
          Title: { type: "text", required: true, label: "Title" },
          items: {
            type: "array-string",
            label: "Items",
          },
        },
      },
    },

    documents: {
      type: "array",
      label: "Downloadable Documents",
      item: {
        fields: {
          size: { type: "text", required: true, label: "File Size" },
          description: { type: "text", required: true, label: "Description" },
          file: { type: "file", required: true, label: "PDF File" },
        },
      },
    },

    importantNote: {
      type: "textarea",
      required: true,
      label: "Important Note",
    },
  },
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
};
