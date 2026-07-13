import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import MobileHeader from "../components/MobileHeader.jsx";
import MobileHomeBar from "../components/MobileHomeBar.jsx";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Vite-resolved worker URL (version-matched to react-pdf's pdfjs-dist)
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const RESUME_FILE = "/files/resume.pdf";

const MobileResumeView = ({ onBack }) => {
  return (
    <div className="flex h-dvh flex-col bg-white">
      <MobileHeader
        title="Resume"
        onBack={onBack}
        rightAction={
          <a href={RESUME_FILE} download>
            <Download size={20} />
          </a>
        }
      />

      <div className="flex-1 overflow-auto p-3">
        <Document file={RESUME_FILE}>
          <Page pageNumber={1} width={Math.min(window.innerWidth - 24, 900)} />
        </Document>
      </div>

      <MobileHomeBar />
    </div>
  );
};

export default MobileResumeView;