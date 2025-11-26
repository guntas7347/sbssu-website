import { getCouncilMeetings } from "@/lib/db";
import { Metadata } from "next";
import { MeetingPageClient } from "./ClientPage";
import { getPage } from "@/lib/getPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Academic Council Meetings | University Portal",
  description:
    "View agendas, minutes, and schedules of Academic Council meetings. Stay updated on university academic decisions and proceedings.",
  keywords: [
    "Academic Council",
    "University Meetings",
    "Agendas",
    "Minutes",
    "Schedules",
  ],
  openGraph: {
    title: "Academic Council Meetings",
    description:
      "Browse official Academic Council meeting schedules, agendas, and documents.",
    url: "https://yourdomain.edu/academic-council-meetings",
    siteName: "University Portal",
  },
};

export default async function AcademicCouncilMeetingPage() {
  const { page, updatedAt } = await getPage("council-meetings");
  if (!page) return notFound();

  return <MeetingPageClient meetings={page} updatedAt={updatedAt} />;
}
