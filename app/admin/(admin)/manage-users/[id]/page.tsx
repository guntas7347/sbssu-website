import getData from "@/lib/getData";
import React from "react";
import AddUser from "./UserForm";

const Page = async ({ params }) => {
  const { id } = await params;

  const { payload: departments } = await getData(`public/departments`);

  if (id === "add") {
    return <AddUser departments={departments} editingUser={false} />;
  }
  const { payload: user } = await getData(`admin/users/${id}`);

  return <AddUser departments={departments} editingUser={user} />;
};

export default Page;
