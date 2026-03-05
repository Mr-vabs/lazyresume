import React from 'react';
import type { ResumeData } from '../types/ResumeData';

interface PreviewProps {
  resumeData: ResumeData;
}

export const Preview: React.FC<PreviewProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, projects, skills, sectionOrder } = resumeData;

  const sectionHeader = (title: string) => (
    <div className="mb-2 border-b border-black pb-1 break-inside-avoid">
      <h2 className="text-[14pt] font-bold text-black font-serif uppercase tracking-wider">{title}</h2>
    </div>
  );

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'education':
        return education.length > 0 && (
          <div key="education" className="mb-4">
            {sectionHeader('Education')}
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{edu.school}</span>
                  <span>{edu.location}</span>
                </div>
                <div className="flex justify-between items-baseline italic">
                  <span>{edu.degree}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'experience':
        return experience.length > 0 && (
          <div key="experience" className="mb-4">
            {sectionHeader('Experience')}
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{exp.title}</span>
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline italic mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-0.5">
                  {exp.description.map((desc, idx) => (
                    desc.trim() && <li key={idx} className="pl-1">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'projects':
        return projects.length > 0 && (
          <div key="projects" className="mb-4">
            {sectionHeader('Projects')}
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold">{proj.name}</span>
                    {proj.technologies && <span> | <span className="italic">{proj.technologies}</span></span>}
                  </div>
                  <span>{proj.startDate} – {proj.endDate}</span>
                </div>
                <ul className="list-disc ml-5 space-y-0.5">
                  {proj.description.map((desc, idx) => (
                    desc.trim() && <li key={idx} className="pl-1">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return skills.length > 0 && (
          <div key="skills" className="mb-4 break-inside-avoid">
            {sectionHeader('Technical Skills')}
            <div className="space-y-1">
              {skills.map((skill) => (
                <div key={skill.id} className="flex">
                  <span className="font-bold mr-2">{skill.category}:</span>
                  <span>{skill.items}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex justify-center bg-gray-200 overflow-y-auto print:bg-white print:overflow-visible">
      {/* 
        This div is styled to roughly look like an 8.5x11 page 
        and specifically styled with font-serif for ATS/Latex look 
        Removed min-h constraint to allow natural multi-page flow.
      */}
      <div className="bg-white w-[8.5in] p-[0.5in] shadow-xl my-8 print:shadow-none print:m-0 print:p-[0.5in] font-serif text-[11pt] text-black">
        
        {/* Header / Personal Info */}
        <div className="text-center mb-6">
          <h1 className="text-[24pt] font-bold mb-1 leading-tight">{personalInfo.name}</h1>
          <div className="flex flex-wrap justify-center items-center gap-x-2 text-[10pt]">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && (personalInfo.email || personalInfo.socials.length > 0) && <span>|</span>}
            
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
            {personalInfo.email && personalInfo.socials.length > 0 && <span>|</span>}
            
            {personalInfo.socials.map((social, index) => (
              <React.Fragment key={social.id}>
                {social.url && (
                  <a href={social.url.startsWith('http') ? social.url : `https://${social.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {social.label ? `${social.label}: ${social.url}` : social.url}
                  </a>
                )}
                {index < personalInfo.socials.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        {sectionOrder.map(sectionId => renderSection(sectionId))}

      </div>
    </div>
  );
};