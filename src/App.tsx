import { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Editor from './components/Editor/Editor';
import ResumePDF from './components/PDF/ResumePDF';
import Home from './components/Home/Home';
import { INITIAL_RESUME, type ResumeData } from './types/resume';
import { Download, Home as HomeIcon, Save } from 'lucide-react';
import './index.css';

function App() {
  const [view, setView] = useState<'home' | 'editor'>('home');
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Attempt to load from local storage
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_RESUME,
          ...parsed,
          meta: parsed.meta || INITIAL_RESUME.meta,
          templateId: parsed.templateId || INITIAL_RESUME.templateId,
        };
      } catch (e) {
        console.error("Failed to parse resume data", e);
        return INITIAL_RESUME;
      }
    }
    // Default to INITIAL_RESUME but don't persist it immediately if we want empty start?
    // Actually, let's keep it defined.
    return INITIAL_RESUME;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const handleExport = () => {
    const jsonString = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.meta.fileName || 'resume'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        setResumeData({
          ...INITIAL_RESUME,
          ...parsed,
          meta: parsed.meta || INITIAL_RESUME.meta,
          templateId: parsed.templateId || INITIAL_RESUME.templateId,
        });
        setView('editor');
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleTemplateSelect = (templateId: string) => {
    // potentially reset data if starting fresh, or keep?
    // "Start Fresh" usually means reset.
    setResumeData({ ...INITIAL_RESUME, templateId });
    setView('editor');
  };

  if (view === 'home') {
    return <Home onTemplateSelect={handleTemplateSelect} onUpload={handleUpload} />;
  }

  return (
    <div className="app-main">
      <div className="toolbar">
        <div className="toolbar-group">
          <button className="btn-icon" onClick={() => setView('home')} title="Back to Home">
            <HomeIcon size={20} color="white" />
          </button>
          <span className="app-title">Resume Editor</span>
        </div>
        <div className="toolbar-group">
          <input
            type="text"
            value={resumeData.meta.fileName}
            onChange={(e) => setResumeData({ ...resumeData, meta: { ...resumeData.meta, fileName: e.target.value } })}
            className="filename-input"
            placeholder="Filename"
          />

          <button className="btn secondary sm" onClick={handleExport} title="Save JSON">
            <Save size={16} /> JSON
          </button>

          {/* PDF Download Link */}
          <PDFDownloadLink
            document={<ResumePDF data={resumeData} />}
            fileName={`${resumeData.meta.fileName || 'resume'}.pdf`}
            className="btn primary sm"
            style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: 5 }}
          >
            {({ loading }) => (
              <>
                <Download size={16} />
                {loading ? 'Loading...' : 'Download PDF'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>
      <div className="app-container">
        <div className="editor-pane">
          <Editor data={resumeData} onChange={setResumeData} />
        </div>
        <div className="preview-pane">
          <PDFViewer width="100%" height="100%" showToolbar={false} style={{ border: 'none' }}>
            <ResumePDF data={resumeData} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}

export default App;
