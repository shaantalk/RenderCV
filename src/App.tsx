import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Editor from './components/Editor/Editor';
import ResumePDF from './components/PDF/ResumePDF';
import { INITIAL_RESUME, type ResumeData } from './types/resume';
import './index.css';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : INITIAL_RESUME;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <div className="app-container">
      <div className="editor-pane">
        <Editor data={resumeData} onChange={setResumeData} />
      </div>
      <div className="preview-pane">
        <PDFViewer width="100%" height="100%" showToolbar={true}>
          <ResumePDF data={resumeData} />
        </PDFViewer>
      </div>
    </div>
  );
}

export default App;
