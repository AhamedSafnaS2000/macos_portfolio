import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Vite-resolved worker URL (version-matched to react-pdf's pdfjs-dist)
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const RESUME_FILE = "/files/resume.pdf";

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls windowKey="resume" />
        <h2>Resume.pdf</h2>
        <a href={RESUME_FILE} download>
          <Download size={18} />
        </a>
      </div>

      <div className="max-h-[80vh] overflow-auto">
        <Document file={RESUME_FILE}>
          <Page pageNumber={1} />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;