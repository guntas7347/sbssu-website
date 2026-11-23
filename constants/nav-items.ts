interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    children: [
      { label: "About", path: "/about" },
      { label: "Mission & Vision", path: "/mission" },
      { label: "Legacy Content", path: "/legacy-website" },
    ],
  },
  {
    label: "Administration",
    children: [
      { label: "Vice-Chancellor's Desk", path: "/vc" },
      { label: "Board of Governors", path: "/administration/bog" },
      { label: "Authorities", path: "/administration/authorities" },
      {
        label: "Governance",
        children: [
          {
            label: "Board of Governors Meetings",
            path: "/legacy-website?Id=12",
          },
          {
            label: "Finance Committee Meetings",
            path: "/legacy-website?Id=1123&mode=category",
          },
          {
            label: "Building Works Meetings",
            path: "/legacy-website?Id=1134&mode=category",
          },
          {
            label: "Internal Quality Assurance Committee Meetings",
            path: "/legacy-website?Id=1135&mode=category",
          },
          {
            label: "Academic Council Meetings",
            path: "/legacy-website?Id=1112&mode=category",
          },
        ],
      },

      { label: "Committees", path: "/legacy-website?Id=213" },
      { label: "RTI-Laws", path: "/legacy-website?Id=214" },
      { label: "By-Laws", path: "/legacy-website?Id=1137&mode=category" },
    ],
  },
  {
    label: "Academics",
    children: [
      {
        label: "Academic Council",
        path: "/academics/council",
      },
      {
        label: "Office Bearers",
        path: "/legacy-website?Id=31&mode=category",
      },
      {
        label: "Academic Regulations",
        path: "/legacy-website?Id=1200&mode=category",
      },
      {
        label: "Academic Link",
        path: "/legacy-website?Id=35003&mode=category",
      },
      {
        label: "Courses",
        path: "/legacy-website?Id=1145&mode=category",
      },
      {
        label: "Eligibility",
        path: "/legacy-website?Id=1147&mode=category",
      },
      {
        label: "Syllabus",
        children: [
          {
            label: "Engineering",
            children: [
              {
                label: "Ist Year (Common)",
                path: "/legacy-website?Id=1160&mode=category",
              },
              {
                label: "Mechanical Engg.",
                path: "/legacy-website?Id=1161&mode=category",
              },
              {
                label: "Chemical Engg.",
                path: "/legacy-website?Id=1162&mode=category",
              },
              {
                label: "Computer Engg.",
                path: "/legacy-website?Id=1163&mode=category",
              },
              {
                label: "Electrical Engg.",
                path: "/legacy-website?Id=1164&mode=category",
              },
              {
                label: "Electronics Engg.",
                path: "/legacy-website?Id=1165&mode=category",
              },
              {
                label: "Civil Engg.",
                path: "/legacy-website?Id=1166&mode=category",
              },
            ],
          },
          {
            label: "Computer Application",
            children: [
              { label: "BCA", path: "/legacy-website?Id=1167&mode=category" },
              { label: "MMCA", path: "/legacy-website?Id=1168&mode=category" },
              { label: "PGDCA", path: "/legacy-website?Id=1169&mode=category" },
            ],
          },
          {
            label: "Applied Science",
            children: [
              { label: "B.SC", path: "/legacy-website?Id=1170&mode=category" },
              { label: "B.COM", path: "/legacy-website?Id=1171&mode=category" },
              { label: "M.COM", path: "/legacy-website?Id=1172&mode=category" },
            ],
          },
          {
            label: "Diploma",
            children: [
              {
                label: "Electrical",
                path: "/legacy-website?Id=1173&mode=category",
              },
              {
                label: "Mechanical",
                path: "/legacy-website?Id=1174&mode=category",
              },
              {
                label: "Computer",
                path: "/legacy-website?Id=1175&mode=category",
              },
              {
                label: "Electronics",
                path: "/legacy-website?Id=1176&mode=category",
              },
            ],
          },
          {
            label: "M.Tech",
            children: [
              {
                label: "Mechanical Engg.",
                path: "/legacy-website?Id=1177&mode=category",
              },
              {
                label: "Chemical Engg.",
                path: "/legacy-website?Id=1178&mode=category",
              },
              {
                label: "Computer Engg.",
                path: "/legacy-website?Id=1179&mode=category",
              },
              {
                label: "Electrical Engg.",
                path: "/legacy-website?Id=1180&mode=category",
              },
              {
                label: "Electronics Engg.",
                path: "/legacy-website?Id=1181&mode=category",
              },
              {
                label: "Civil Engg.",
                path: "/legacy-website?Id=1182&mode=category",
              },
            ],
          },
          {
            label: "Agriculture",
            path: "/legacy-website?Id=1183&mode=category",
          },
          {
            label: "Architecture",
            path: "/legacy-website?Id=1184&mode=category",
          },
          { label: "P.HD", path: "/legacy-website?Id=1185&mode=category" },
        ],
      },
      {
        label: "Fee Detail",
        path: "/legacy-website?Id=1146&mode=category",
      },
      {
        label: "Notices",
        path: "/legacy-website?Id=35004&mode=category",
      },
      {
        label: "Notifications",
        path: "/legacy-website?Id=35005&mode=category",
      },
      {
        label: "Extension of Approvals (AICTE)",
        path: "/legacy-website?Id=1948&mode=category",
      },
      {
        label: "Academic Calendar",
        path: "/legacy-website?Id=1125&mode=category",
      },
      {
        label: "Gradation Certificate",
        path: "/legacy-website?Id=1148&mode=category",
      },
    ],
  },
  {
    label: "Departments",
    path: "/departments",
    children: [
      {
        label: "Chemical Engineering",
        path: "/departments/chemical",
      },
      {
        label: "Civil Engineering",
        path: "/departments/civil",
      },
      {
        label: "Computer Science & Engineering",
        path: "/departments/cse",
      },
      {
        label: "Electronics & Communication Engineering",
        path: "/departments/ece",
      },
      {
        label: "Electrical Engineering",
        path: "/departments/electrical",
      },
      {
        label: "Mechanical Engineering",
        path: "/departments/mechanical",
      },
      {
        label: "School of Architecture",
        path: "/departments/arch",
      },
      {
        label: "Applied Sciences & Humanities",
        path: "/departments/dash",
      },
      {
        label: "Computer Applications",
        path: "/departments/ca",
      },
      {
        label: "University Business School",
        path: "/departments/ubs",
      },
      {
        label: "PolyWing",
        path: "/departments/polywing",
      },
      {
        label: "Agriculture Department",
        path: "/departments/agriculture",
      },
    ],
  },
  {
    label: "Central",
    children: [
      {
        label: "Computer Centre",
        path: "/legacy-website?Id=225",
      },
      {
        label: "Library",
        path: "/legacy-website?Id=226",
      },
      {
        label: "Workshop",
        path: "/legacy-website?Id=227",
      },
      {
        label: "Sports",
        path: "/legacy-website?Id=228",
      },
      {
        label: "Health Centre",
        path: "/legacy-website?Id=229",
      },
      {
        label: "Google Development Group",
        path: "https://gdg.community.dev/gdg-on-campus-shaheed-bhagat-singh-state-university-firozpur-india/",
      },
    ],
  },
  {
    label: "Campus",
    children: [
      {
        label: "Virtual Tool",
        path: "https://drive.google.com/file/d/1KLEibLUQeXW5It-m7IpTnCv3su0p2lE6/view?t=4.393",
      },
      {
        label: "Academic Area",
        path: "/legacy-website?Id=230",
      },
      {
        label: "Student Hostels",
        path: "/legacy-website?Id=231",
      },
      {
        label: "Market Complex",
        path: "/legacy-website?Id=232",
      },
      {
        label: "Sports Complex",
        path: "/legacy-website?Id=233",
      },
      {
        label: "Symposium for Extra-Curricular Activities (SECA)",
        path: "/legacy-website?Id=35006",
      },
      {
        label: "Indian Society for Technical Education (ISTE)",
        path: "/legacy-website?Id=35007",
      },
      {
        label: "National Service Scheme (NSS)",
        path: "/legacy-website?Id=35008",
      },
      {
        label: "National Cadet Corps (NCC)",
        path: "/legacy-website?Id=35009",
      },
      {
        label: "Association of Revolutionary Bees (AREV)",
        path: "/legacy-website?Id=35010",
      },
    ],
  },
  {
    label: "Examination",
    children: [
      {
        label: "Office Bearers",
        path: "/legacy-website?Id=31&mode=category",
      },

      {
        label: "Date Sheet",
        path: "/legacy-website?Id=21&mode=category",
      },
      {
        label: "NAD",
        children: [
          {
            label: "Academic Bank of Credits",
            path: "https://www.abc.gov.in/",
          },
          {
            label: "Digilocker",
            path: "https://digilocker.gov.in/",
          },
          {
            label: "Notices",
            path: "https://sbssu.ac.in/SDetail.aspx?Id=1401",
          },
        ],
      },
      {
        label: "Notices",
        path: "/legacy-website?Id=34&mode=category",
        children: [
          {
            label: "Important Notices",
            path: "/legacy-website?Id=1139&mode=category",
          },
          {
            label: "Notices",
            path: "/legacy-website?Id=23&mode=category",
          },
        ],
      },
      {
        label: "Download Form",
        path: "/legacy-website?Id=34&mode=category",
      },
      {
        label: "Question Paper Template",
        path: "/legacy-website?Id=34&mode=category",
      },
    ],
  },
  {
    label: "Placement",
    children: [
      { label: "Training & Placement Cell", path: "/placement" },
      { label: "Recruiters & Partners", path: "/placement/recruiters" },
      { label: "Placement Records", path: "/placement/records" },
      {
        label: "Memorandum of Understanding",
        path: "/legacy-website?Id=1143&mode=category",
      },
    ],
  },
  {
    label: "R&D",
    children: [
      {
        label: "Research Projects",
        path: "/legacy-website?Id=2006",
      },
      {
        label: "PhD Admissions Guidelines",
        path: "/legacy-website?Id=2001",
      },
      {
        label: "PhD Regulations",
        path: "/legacy-website?Id=2002",
      },
      {
        label: "PhD Registered Candidates",
        path: "/legacy-website?Id=2003",
      },
      {
        label: "PhD Vacant Slots",
        path: "/legacy-website?Id=2004",
      },
      {
        label: "Notices",
        path: "/legacy-website?Id=2005",
      },
    ],
  },
  { label: "Grievances", path: "https://grievances.sbssu.ac.in" },
  {
    label: "Download",
    children: [
      {
        label: "Information Brochure",
        path: "/legacy-website?Id=24&mode=category",
      },
      {
        label: "Tenders",
        path: "/legacy-website?Id=25&mode=category",
      },
      {
        label: "Staff Forms",
        path: "/legacy-website?Id=25261&mode=category",
      },
      {
        label: "Student Forms",
        path: "/legacy-website?Id=26&mode=category",
      },
      {
        label: "National Institutional Ranking Framework (NIRF)",
        path: "/legacy-website?Id=25262&mode=category",
      },
    ],
  },
  { label: "Contact", path: "/contact" },
];
