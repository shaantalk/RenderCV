import React from 'react';
import type { ResumeData, ResumeSection, ResumeItem } from '../../types/resume';
import { Plus, Trash2, FileText, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import RichTextField from './RichTextField';

interface EditorProps {
    data: ResumeData;
    onChange: (data: ResumeData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
    const handleDetailsChange = (field: keyof typeof data.details, value: string) => {
        onChange({
            ...data,
            details: { ...data.details, [field]: value },
        });
    };

    const handleLinkChange = (id: string, field: 'label' | 'url', value: string) => {
        const newLinks = data.details.links.map(l => l.id === id ? { ...l, [field]: value } : l);
        onChange({ ...data, details: { ...data.details, links: newLinks } });
    };

    const addLink = () => {
        const newLink = { id: uuidv4(), label: 'Link', url: '' };
        onChange({ ...data, details: { ...data.details, links: [...data.details.links, newLink] } });
    };

    const removeLink = (id: string) => {
        const newLinks = data.details.links.filter(l => l.id !== id);
        onChange({ ...data, details: { ...data.details, links: newLinks } });
    };

    const addSection = (type: ResumeSection['type'] = 'custom', title: string = 'New Section') => {
        const newSection: ResumeSection = {
            id: uuidv4(),
            title,
            type,
            items: [],
        };
        onChange({
            ...data,
            sections: [...data.sections, newSection],
        });
    };

    const updateSection = (id: string, updatedSection: ResumeSection) => {
        onChange({
            ...data,
            sections: data.sections.map((sec) => (sec.id === id ? updatedSection : sec)),
        });
    };

    const removeSection = (id: string) => {
        onChange({
            ...data,
            sections: data.sections.filter((sec) => sec.id !== id),
        });
    };

    const addItem = (sectionId: string) => {
        const section = data.sections.find((sec) => sec.id === sectionId);
        if (!section) return;

        const newItem: ResumeItem = {
            id: uuidv4(),
            title: 'Title',
            description: '<ul><li>Key achievement...</li></ul>',
        };

        updateSection(sectionId, {
            ...section,
            items: [...section.items, newItem],
        });
    };

    const updateItem = (sectionId: string, itemId: string, field: keyof ResumeItem, value: string) => {
        const section = data.sections.find((sec) => sec.id === sectionId);
        if (!section) return;

        const updatedItems = section.items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
        );

        updateSection(sectionId, { ...section, items: updatedItems });
    };

    const removeItem = (sectionId: string, itemId: string) => {
        const section = data.sections.find((sec) => sec.id === sectionId);
        if (!section) return;

        updateSection(sectionId, {
            ...section,
            items: section.items.filter((item) => item.id !== itemId),
        });
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Resume Editor</h2>
            </div>

            <div className="section-card details-section">
                <h3>Personal Details</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={data.details.name}
                            onChange={(e) => handleDetailsChange('name', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={data.details.email}
                            onChange={(e) => handleDetailsChange('email', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            value={data.details.phone}
                            onChange={(e) => handleDetailsChange('phone', e.target.value)}
                        />
                    </div>
                </div>

                <h4>Links</h4>
                {data.details.links.map(link => (
                    <div key={link.id} className="form-grid" style={{ marginBottom: 10 }}>
                        <input type="text" value={link.label} onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)} placeholder="Label (e.g. LinkedIn)" />
                        <div style={{ display: 'flex', gap: 5 }}>
                            <input type="text" value={link.url} onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)} placeholder="URL" style={{ flex: 1 }} />
                            <button onClick={() => removeLink(link.id)} className="btn-icon danger"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
                <button onClick={addLink} className="btn primary outline sm"><Plus size={14} /> Add Link</button>
            </div>

            <div className="sections-list">
                {data.sections.map((section) => (
                    <div key={section.id} className="section-card">
                        <div className="section-header">
                            <div className="section-title-edit">
                                <FileText size={16} />
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateSection(section.id, { ...section, title: e.target.value })}
                                    className="section-title-input"
                                />
                            </div>
                            <button
                                onClick={() => removeSection(section.id)}
                                className="btn-icon danger"
                                title="Remove Section"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="section-items">
                            {section.items.map((item) => (
                                <div key={item.id} className="item-card">
                                    <div className="item-header">
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                                            placeholder="Title / Company"
                                            className="item-title-input"
                                        />
                                        <button
                                            onClick={() => removeItem(section.id, item.id)}
                                            className="btn-icon danger sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Subtitle / Role</label>
                                            <input
                                                type="text"
                                                value={item.subtitle || ''}
                                                onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input
                                                type="text"
                                                value={item.date || ''}
                                                onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <RichTextField
                                            value={item.description}
                                            onChange={(val) => updateItem(section.id, item.id, 'description', val)}
                                        />
                                    </div>
                                </div>
                            ))}

                            <button onClick={() => addItem(section.id)} className="btn primary outline full-width">
                                <Plus size={16} /> Add Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="add-blocks-container">
                <h4>Add Building Blocks</h4>
                <div className="blocks-grid">
                    <button onClick={() => addSection('experience', 'Work Experience')} className="btn primary">
                        <Briefcase size={16} /> Work Experience
                    </button>
                    <button onClick={() => addSection('education', 'Education')} className="btn primary">
                        <GraduationCap size={16} /> Education
                    </button>
                    <button onClick={() => addSection('custom', 'Skills')} className="btn primary">
                        <Code size={16} /> Skills
                    </button>
                    <button onClick={() => addSection('custom', 'Certifications')} className="btn primary">
                        <Award size={16} /> Certifications
                    </button>
                    <button onClick={() => addSection('custom', 'Custom Section')} className="btn secondary">
                        <Plus size={16} /> Custom
                    </button>
                </div>
            </div>

            <style>{`
            .add-blocks-container {
                margin-top: 30px;
                padding: 20px;
                background: #2a2a2a;
                border-radius: 8px;
                border: 1px solid #333;
            }
            .add-blocks-container h4 {
                margin-top: 0;
                margin-bottom: 15px;
            }
            .blocks-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
        `}</style>

        </div>
    );
};

export default Editor;
