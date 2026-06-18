import { Download } from "lucide-react";
import MobileHeader from "../components/MobileHeader.jsx";
import MobileHomeBar from "../components/MobileHomeBar.jsx";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MobileResumeView = ({ onBack }) => {
  return (
    <div className="flex h-full flex-col bg-gray-100">
      <div className="h-3 bg-white" />
      <MobileHeader
        title="Resume.pdf"
        onBack={onBack}
        rightAction={
          <a
            href="/files/resume.pdf"
            download
            className="flex items-center justify-center text-[#007aff]"
          >
            <Download size={20} />
          </a>
        }
      />

      <div className="flex-1 overflow-y-auto flex items-start justify-center p-2">
        <Document file="/files/resume.pdf">
          <Page
            pageNumber={1}
            width={Math.min(window.innerWidth - 16, 500)}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileResumeView;
