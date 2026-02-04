import getData from "@/lib/getData";
import AddDepartment from "./AddDepartment";

const Page = async ({ params }) => {
  const { id } = await params;

  if (id === "add") {
    return <AddDepartment />;
  }
  const { payload: department } = await getData(
    `admin/manage-departments/${id}`
  );

  return <AddDepartment editingDept={department} />;
};

export default Page;
