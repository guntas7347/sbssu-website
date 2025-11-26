import prisma from "./prisma";

export async function getNotices(limit = 10) {
  return prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export const getCouncilMeetings = async () => {
  try {
    const meetings = await prisma.councilMeeting.findMany({
      include: {
        uploader: { select: { username: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = meetings.map((m) => ({
      id: m.id,
      name: m.name,
      date: m.date.toISOString().split("T")[0], // YYYY-MM-DD
      category: m.category,
      agenda: m.agenda,
      isUpcoming: m.isUpcoming,
      documents: m.documents,
      uploadedBy: m.uploader?.username || null,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    }));

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
