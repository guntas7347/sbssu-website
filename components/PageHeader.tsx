import { GraduationCap } from "lucide-react";

const PageHeader = ({
  title = "",
  subTitle = "",
  icon: SVG = GraduationCap,
}) => {
  return (
    <div className="bg-linear-to-r from-orange-600 to-green-600 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <SVG className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl">{subTitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
