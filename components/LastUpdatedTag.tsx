import React from "react";

const LastUpdatedTag = ({ date = new Date() }: { date?: string | Date }) => {
  return (
    <div className="mt-10 pr-10 text-right">
      Last Updated : {new Date(date).toDateString()}
    </div>
  );
};

export default LastUpdatedTag;
