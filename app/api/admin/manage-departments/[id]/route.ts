import { send } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const department = await prisma.department.findUnique({
      where: { id },
    });

    if (!department) return send(404, "Not found");
    return send(200, "Department fetched", department);
  } catch (err) {
    return send(500, "ISR");
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    if (id !== "add") return send(400, "Bad Req");

    const body = await req.json();

    const created = await prisma.department.create({
      data: {
        name: body.name,
        departmentCode: body.departmentCode,
        establishmentYear: body.establishmentYear,
        location: body.location,
        description: body.description,
        hidden: body.hidden ?? false,
      },
    });

    return send(201, "Department created", created);
  } catch (err) {
    return send(500, "ISR");
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params; // real id comes from route
    const body = await req.json();

    const updated = await prisma.department.update({
      where: { id },
      data: {
        name: body.name,
        departmentCode: body.departmentCode,
        establishmentYear: body.establishmentYear,
        location: body.location,
        description: body.description,
        hidden: body.hidden,
      },
    });

    return send(200, "Department updated", updated);
  } catch (err) {
    return send(500, "ISR");
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.department.delete({
      where: { id },
    });

    return send(200, "Department deleted");
  } catch (err) {
    return send(500, "ISR");
  }
}
