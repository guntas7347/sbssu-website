import React from "react";
import { GraduationCap, LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
}

const PageHeader = ({
  title = "Default Title",
  subTitle = "",
  icon: Icon = GraduationCap,
}: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center text-white">
        <Icon className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subTitle && (
          <p className="text-lg md:text-xl max-w-3xl mx-auto">{subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
