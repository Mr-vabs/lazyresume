import React, { useState, useRef } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { initialResumeData } from './utils/sampleData';
import type { ResumeData } from './types/ResumeData';
import { Upload, Download, Printer } from 'lucide-react';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setResumeData(json as ResumeData);
      } catch (error) {
        console.error("Failed to parse JSON", error);
        alert("Invalid resume JSON file");
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-gray-100 print:h-auto print:overflow-visible">
      {/* Sidebar / Editor */}
      <div className="w-1/2 h-full flex flex-col no-print bg-white shadow-xl z-10 border-r border-gray-300">
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">ATS Resume Maker</h1>
          <div className="flex gap-2">
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImport} 
              ref={fileInputRef} 
              className="hidden" 
            />
            <button 
              onClick={triggerImport}
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm transition-colors"
              title="Import JSON"
            >
              <Upload size={16} /> Import
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded text-sm transition-colors"
              title="Export JSON"
            >
              <Download size={16} /> Export
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded text-sm transition-colors"
              title="Print to PDF"
            >
              <Printer size={16} /> Print / PDF
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Editor resumeData={resumeData} setResumeData={setResumeData} />
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="w-1/2 h-full flex flex-col print:w-full print:h-auto">
        <div className="flex-1 overflow-y-auto print:overflow-visible">
          <Preview resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

export default App;