import React from 'react';
import { Upload, FileText, ArrowRight } from 'lucide-react';

interface HomeProps {
    onTemplateSelect: (templateId: string) => void;
    onUpload: (file: File) => void;
}

const Home: React.FC<HomeProps> = ({ onTemplateSelect, onUpload }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Resume Builder</h1>
                <p className="subtitle">Build professional resumes in minutes. Export to PDF.</p>
            </div>

            <div className="options-container">
                <div className="option-card">
                    <div className="card-icon">
                        <FileText size={48} color="#007bff" />
                    </div>
                    <h3>Start Fresh</h3>
                    <p>Create a new resume using our professional template.</p>
                    <button className="btn primary full-width" onClick={() => onTemplateSelect('standard')}>
                        Select Standard Template <ArrowRight size={16} />
                    </button>
                </div>

                <div className="option-divider">OR</div>

                <div className="option-card upload-card">
                    <div className="card-icon">
                        <Upload size={48} color="#ffffff" />
                    </div>
                    <h3>Upload Existing</h3>
                    <p>Continue editing a previously saved JSON file.</p>

                    <label className="btn secondary full-width upload-label">
                        Upload JSON
                        <input type="file" accept=".json" onChange={handleFileChange} hidden />
                    </label>
                </div>
            </div>

            <style>{`
        .home-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #242424;
            color: #fff;
            padding: 20px;
        }
        .hero-section {
            text-align: center;
            margin-bottom: 50px;
        }
        .hero-section h1 {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 1.2rem;
            color: #aaa;
        }
        .options-container {
            display: flex;
            gap: 40px;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }
        .option-card {
            background: #2a2a2a;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 30px;
            width: 300px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 15px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .option-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            border-color: #444;
        }
        .card-icon {
            margin-bottom: 10px;
        }
        .option-divider {
            font-weight: bold;
            color: #555;
            font-size: 1.2rem;
        }
        .upload-card .card-icon {
             color: #aaa;
        }
        .upload-label {
            cursor: pointer;
            display: flex; 
            align-items: center; 
            justify-content: center;
        }
      `}</style>
        </div>
    );
};

export default Home;
