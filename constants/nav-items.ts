export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    children: [
      { label: "About", href: "/about" },
      { label: "Mission & Vision", href: "/mission" },
      { label: "Legacy Content", href: "/legacy-website" },
    ],
  },
  {
    label: "Administration",
    children: [
      { label: "Vice-Chancellor's Desk", href: "/vc" },
      { label: "Board of Governors", href: "/administration/bog" },
      { label: "Authorities", href: "/administration/authorities" },
      {
        label: "Governance",
        children: [
          {
            label: "Board of Governors Meetings",
            href: "/legacy-website?Id=12",
          },
          {
            label: "Finance Committee Meetings",
            href: "/legacy-website?Id=1123&mode=category",
          },
          {
            label: "Building Works Meetings",
            href: "/legacy-website?Id=1134&mode=category",
          },
          {
            label: "Internal Quality Assurance Committee Meetings",
            href: "/legacy-website?Id=1135&mode=category",
          },
          {
            label: "Academic Council Meetings",
            href: "/legacy-website?Id=1112&mode=category",
          },
        ],
      },

      { label: "Committees", href: "/legacy-website?Id=213" },
      { label: "RTI-Laws", href: "/legacy-website?Id=214" },
      { label: "By-Laws", href: "/legacy-website?Id=1137&mode=category" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Others", href: "/pages/academics" },
      {
        label: "Academic Council",
        href: "/academics/council",
      },
      {
        label: "Office Bearers",
        href: "/legacy-website?Id=31&mode=category",
      },
      {
        label: "Academic Regulations",
        href: "/legacy-website?Id=1200&mode=category",
      },
      {
        label: "Academic Link",
        href: "/legacy-website?Id=35003&mode=category",
      },
      {
        label: "Courses",
        href: "/legacy-website?Id=1145&mode=category",
      },
      {
        label: "Eligibility",
        href: "/legacy-website?Id=1147&mode=category",
      },
      {
        label: "Syllabus",
        children: [
          {
            label: "Engineering",
            children: [
              {
                label: "Ist Year (Common)",
                href: "/legacy-website?Id=1160&mode=category",
              },
              {
                label: "Mechanical Engg.",
                href: "/legacy-website?Id=1161&mode=category",
              },
              {
                label: "Chemical Engg.",
                href: "/legacy-website?Id=1162&mode=category",
              },
              {
                label: "Computer Engg.",
                href: "/legacy-website?Id=1163&mode=category",
              },
              {
                label: "Electrical Engg.",
                href: "/legacy-website?Id=1164&mode=category",
              },
              {
                label: "Electronics Engg.",
                href: "/legacy-website?Id=1165&mode=category",
              },
              {
                label: "Civil Engg.",
                href: "/legacy-website?Id=1166&mode=category",
              },
            ],
          },
          {
            label: "Computer Application",
            children: [
              { label: "BCA", href: "/legacy-website?Id=1167&mode=category" },
              { label: "MMCA", href: "/legacy-website?Id=1168&mode=category" },
              { label: "PGDCA", href: "/legacy-website?Id=1169&mode=category" },
            ],
          },
          {
            label: "Applied Science",
            children: [
              { label: "B.SC", href: "/legacy-website?Id=1170&mode=category" },
              { label: "B.COM", href: "/legacy-website?Id=1171&mode=category" },
              { label: "M.COM", href: "/legacy-website?Id=1172&mode=category" },
            ],
          },
          {
            label: "Diploma",
            children: [
              {
                label: "Electrical",
                href: "/legacy-website?Id=1173&mode=category",
              },
              {
                label: "Mechanical",
                href: "/legacy-website?Id=1174&mode=category",
              },
              {
                label: "Computer",
                href: "/legacy-website?Id=1175&mode=category",
              },
              {
                label: "Electronics",
                href: "/legacy-website?Id=1176&mode=category",
              },
            ],
          },
          {
            label: "M.Tech",
            children: [
              {
                label: "Mechanical Engg.",
                href: "/legacy-website?Id=1177&mode=category",
              },
              {
                label: "Chemical Engg.",
                href: "/legacy-website?Id=1178&mode=category",
              },
              {
                label: "Computer Engg.",
                href: "/legacy-website?Id=1179&mode=category",
              },
              {
                label: "Electrical Engg.",
                href: "/legacy-website?Id=1180&mode=category",
              },
              {
                label: "Electronics Engg.",
                href: "/legacy-website?Id=1181&mode=category",
              },
              {
                label: "Civil Engg.",
                href: "/legacy-website?Id=1182&mode=category",
              },
            ],
          },
          {
            label: "Agriculture",
            href: "/legacy-website?Id=1183&mode=category",
          },
          {
            label: "Architecture",
            href: "/legacy-website?Id=1184&mode=category",
          },
          { label: "P.HD", href: "/legacy-website?Id=1185&mode=category" },
        ],
      },
      {
        label: "Fee Detail",
        href: "/legacy-website?Id=1146&mode=category",
      },
      {
        label: "Notices",
        href: "/legacy-website?Id=35004&mode=category",
      },
      {
        label: "Notifications",
        href: "/legacy-website?Id=35005&mode=category",
      },
      {
        label: "Extension of Approvals (AICTE)",
        href: "/legacy-website?Id=1948&mode=category",
      },
      {
        label: "Academic Calendar",
        href: "/legacy-website?Id=1125&mode=category",
      },
      {
        label: "Gradation Certificate",
        href: "/legacy-website?Id=1148&mode=category",
      },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    children: [
      {
        label: "Chemical Engineering",
        href: "/departments/chemical",
      },
      {
        label: "Civil Engineering",
        href: "/departments/civil",
      },
      {
        label: "Computer Science & Engineering",
        href: "/departments/cse",
      },
      {
        label: "Electronics & Communication Engineering",
        href: "/departments/ece",
      },
      {
        label: "Electrical Engineering",
        href: "/departments/electrical",
      },
      {
        label: "Mechanical Engineering",
        href: "/departments/mechanical",
      },
      {
        label: "School of Architecture",
        href: "/departments/arch",
      },
      {
        label: "Applied Sciences & Humanities",
        href: "/departments/dash",
      },
      {
        label: "Computer Applications",
        href: "/departments/ca",
      },
      {
        label: "University Business School",
        href: "/departments/ubs",
      },
      {
        label: "PolyWing",
        href: "/departments/polywing",
      },
      {
        label: "Agriculture Department",
        href: "/departments/agriculture",
      },
    ],
  },
  {
    label: "Central",
    children: [
      {
        label: "Computer Centre",
        href: "/legacy-website?Id=225",
      },
      {
        label: "Library",
        href: "/legacy-website?Id=226",
      },
      {
        label: "Workshop",
        href: "/legacy-website?Id=227",
      },
      {
        label: "Sports",
        href: "/legacy-website?Id=228",
      },
      {
        label: "Health Centre",
        href: "/legacy-website?Id=229",
      },
      {
        label: "Google Development Group",
        href: "https://gdg.community.dev/gdg-on-campus-shaheed-bhagat-singh-state-university-firozpur-india/",
      },
    ],
  },
  {
    label: "Campus",
    children: [
      {
        label: "Virtual Tool",
        href: "https://drive.google.com/file/d/1KLEibLUQeXW5It-m7IpTnCv3su0p2lE6/view?t=4.393",
      },
      {
        label: "Academic Area",
        href: "/legacy-website?Id=230",
      },
      {
        label: "Student Hostels",
        href: "/legacy-website?Id=231",
      },
      {
        label: "Market Complex",
        href: "/legacy-website?Id=232",
      },
      {
        label: "Sports Complex",
        href: "/legacy-website?Id=233",
      },
      {
        label: "Symposium for Extra-Curricular Activities (SECA)",
        href: "/legacy-website?Id=35006",
      },
      {
        label: "Indian Society for Technical Education (ISTE)",
        href: "/legacy-website?Id=35007",
      },
      {
        label: "National Service Scheme (NSS)",
        href: "/legacy-website?Id=35008",
      },
      {
        label: "National Cadet Corps (NCC)",
        href: "/legacy-website?Id=35009",
      },
      {
        label: "Association of Revolutionary Bees (AREV)",
        href: "/legacy-website?Id=35010",
      },
    ],
  },
  {
    label: "Examination",
    children: [
      { label: "Others", href: "/pages/examination" },
      {
        label: "Office Bearers",
        href: "/legacy-website?Id=31&mode=category",
      },

      {
        label: "Date Sheet",
        href: "/legacy-website?Id=21&mode=category",
      },
      {
        label: "NAD",
        children: [
          {
            label: "Academic Bank of Credits",
            href: "https://www.abc.gov.in/",
          },
          {
            label: "Digilocker",
            href: "https://digilocker.gov.in/",
          },
          {
            label: "Notices",
            href: "https://sbssu.ac.in/SDetail.aspx?Id=1401",
          },
        ],
      },
      {
        label: "Notices",
        href: "/legacy-website?Id=34&mode=category",
        children: [
          {
            label: "Important Notices",
            href: "/legacy-website?Id=1139&mode=category",
          },
          {
            label: "Notices",
            href: "/legacy-website?Id=23&mode=category",
          },
        ],
      },
      {
        label: "Download Form",
        href: "/legacy-website?Id=34&mode=category",
      },
      {
        label: "Question Paper Template",
        href: "/legacy-website?Id=34&mode=category",
      },
    ],
  },
  {
    label: "Placement",
    children: [
      { label: "Training & Placement Cell", href: "/placement" },
      { label: "Recruiters & Partners", href: "/placement/recruiters" },
      { label: "Placement Records", href: "/placement/records" },
      {
        label: "Memorandum of Understanding",
        href: "/legacy-website?Id=1143&mode=category",
      },
    ],
  },
  {
    label: "R&D",
    children: [
      {
        label: "Research Projects",
        href: "/legacy-website?Id=2006",
      },
      {
        label: "PhD Admissions Guidelines",
        href: "/legacy-website?Id=2001",
      },
      {
        label: "PhD Regulations",
        href: "/legacy-website?Id=2002",
      },
      {
        label: "PhD Registered Candidates",
        href: "/legacy-website?Id=2003",
      },
      {
        label: "PhD Vacant Slots",
        href: "/legacy-website?Id=2004",
      },
      {
        label: "Notices",
        href: "/legacy-website?Id=2005",
      },
    ],
  },
  { label: "Grievances", href: "https://grievances.sbssu.ac.in" },
  {
    label: "Download",
    children: [
      {
        label: "Information Brochure",
        href: "/legacy-website?Id=24&mode=category",
      },
      {
        label: "Tenders",
        href: "/legacy-website?Id=25&mode=category",
      },
      {
        label: "Staff Forms",
        href: "/legacy-website?Id=25261&mode=category",
      },
      {
        label: "Student Forms",
        href: "/legacy-website?Id=26&mode=category",
      },
      {
        label: "National Institutional Ranking Framework (NIRF)",
        href: "/legacy-website?Id=25262&mode=category",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];
