import { Car, Download, GraduationCap } from "lucide-react";

const DownloadCard = ({ data, title, icon: SVG = GraduationCap }) => {
  const downloadUrl = data?.file?.url || data?.photo?.url || null;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <SVG className="w-6 h-6 text-orange-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{data?.subTitle}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{data?.desc || "N/A"}</p>

      {downloadUrl && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">{data?.footer}</span>
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default DownloadCard;
