import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const RichTextField: React.FC<RichTextFieldProps> = ({ value, onChange, label }) => {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['link'], // link
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'], // remove formatting button
        ],
    };

    return (
        <div className="rich-text-field">
            {label && <label className="field-label">{label}</label>}
            <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />
        </div>
    );
};

export default RichTextField;
