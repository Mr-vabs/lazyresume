import React from 'react';
import type { ResumeData, SocialLink } from '../types/ResumeData';
import { Plus, Trash2 } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface EditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const Editor: React.FC<EditorProps> = ({ resumeData, setResumeData }) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const updateArrayItem = <K extends keyof ResumeData>(
    arrayName: K,
    index: number,
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    setResumeData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[arrayName] as any[])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addArrayItem = <K extends keyof ResumeData>(arrayName: K, defaultItem: any) => {
    setResumeData(prev => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [arrayName]: [...(prev[arrayName] as any[]), { ...defaultItem, id: crypto.randomUUID() }]
    }));
  };

  const removeArrayItem = <K extends keyof ResumeData>(arrayName: K, index: number) => {
    setResumeData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[arrayName] as any[])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const updateStringArrayItem = <K extends keyof ResumeData>(
    arrayName: K,
    itemIndex: number,
    field: string,
    stringIndex: number,
    value: string
  ) => {
    setResumeData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[arrayName] as any[])];
      const newStrings = [...newArray[itemIndex][field]];
      newStrings[stringIndex] = value;
      newArray[itemIndex] = { ...newArray[itemIndex], [field]: newStrings };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addStringArrayItem = <K extends keyof ResumeData>(
    arrayName: K,
    itemIndex: number,
    field: string
  ) => {
    setResumeData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[arrayName] as any[])];
      newArray[itemIndex] = {
        ...newArray[itemIndex],
        [field]: [...newArray[itemIndex][field], ""]
      };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setResumeData((prev) => {
        const oldIndex = prev.sectionOrder.indexOf(active.id as string);
        const newIndex = prev.sectionOrder.indexOf(over!.id as string);
        return {
          ...prev,
          sectionOrder: arrayMove(prev.sectionOrder, oldIndex, newIndex),
        };
      });
    }
  };

  const handleArrayDragEnd = <K extends keyof ResumeData>(arrayName: K, event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setResumeData((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const arr = prev[arrayName] as any[];
        const oldIndex = arr.findIndex(item => item.id === active.id);
        const newIndex = arr.findIndex(item => item.id === over!.id);
        return {
          ...prev,
          [arrayName]: arrayMove(arr, oldIndex, newIndex),
        };
      });
    }
  };

  const handleSocialDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setResumeData((prev) => {
        const oldIndex = prev.personalInfo.socials.findIndex(s => s.id === active.id);
        const newIndex = prev.personalInfo.socials.findIndex(s => s.id === over!.id);
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            socials: arrayMove(prev.personalInfo.socials, oldIndex, newIndex),
          }
        };
      });
    }
  };

  const addSocial = () => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        socials: [...prev.personalInfo.socials, { id: crypto.randomUUID(), label: '', url: '' }]
      }
    }));
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    setResumeData(prev => {
      const newSocials = [...prev.personalInfo.socials];
      newSocials[index] = { ...newSocials[index], [field]: value };
      return {
        ...prev,
        personalInfo: { ...prev.personalInfo, socials: newSocials }
      };
    });
  };

  const removeSocial = (index: number) => {
    setResumeData(prev => {
      const newSocials = [...prev.personalInfo.socials];
      newSocials.splice(index, 1);
      return {
        ...prev,
        personalInfo: { ...prev.personalInfo, socials: newSocials }
      };
    });
  };

  const removeStringArrayItem = <K extends keyof ResumeData>(
    arrayName: K,
    itemIndex: number,
    field: string,
    stringIndex: number
  ) => {
    setResumeData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[arrayName] as any[])];
      const newStrings = [...newArray[itemIndex][field]];
      newStrings.splice(stringIndex, 1);
      newArray[itemIndex] = { ...newArray[itemIndex], [field]: newStrings };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="p-6 space-y-8 no-print h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Resume Data</h2>
      </div>

      {/* Section Order */}
      <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Section Order</h3>
        <p className="text-sm text-gray-500 mb-4">Drag sections to reorder them on your resume.</p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSectionDragEnd}>
          <SortableContext items={resumeData.sectionOrder} strategy={verticalListSortingStrategy}>
            {resumeData.sectionOrder.map((sectionId) => (
              <SortableItem key={sectionId} id={sectionId}>
                <div className="capitalize font-medium text-gray-700">
                  {sectionId}
                </div>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </section>

      {/* Personal Info */}
      <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} className={inputClass} placeholder="Jake Ryan" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} className={inputClass} placeholder="jake@su.edu" />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="text" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} className={inputClass} placeholder="123-456-7890" />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass}>Social Links</label>
            <button onClick={addSocial} className="text-blue-600 hover:text-blue-800 flex items-center text-xs font-medium">
              <Plus size={14} className="mr-1" /> Add Link
            </button>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSocialDragEnd}>
            <SortableContext items={resumeData.personalInfo.socials.map(s => s.id)} strategy={verticalListSortingStrategy}>
              {resumeData.personalInfo.socials.map((social, index) => (
                <SortableItem key={social.id} id={social.id}>
                  <div className="flex gap-2 items-center">
                    <input type="text" value={social.label} onChange={e => updateSocial(index, 'label', e.target.value)} className={inputClass} placeholder="Label (e.g. LinkedIn)" />
                    <input type="text" value={social.url} onChange={e => updateSocial(index, 'url', e.target.value)} className={inputClass} placeholder="URL" />
                    <button onClick={() => removeSocial(index)} className="text-gray-400 hover:text-red-500 p-2 ml-auto">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Education */}
      <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Education</h3>
          <button onClick={() => addArrayItem('education', { school: '', degree: '', location: '', startDate: '', endDate: '' })} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleArrayDragEnd('education', e)}>
            <SortableContext items={resumeData.education.map(e => e.id)} strategy={verticalListSortingStrategy}>
              {resumeData.education.map((edu, index) => (
                <SortableItem key={edu.id} id={edu.id}>
                  <div className="relative group">
                    <button onClick={() => removeArrayItem('education', index)} className="absolute -top-1 right-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pr-6">
                      <div>
                        <label className={labelClass}>School / University</label>
                        <input type="text" value={edu.school} onChange={e => updateArrayItem('education', index, 'school', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Degree / Major</label>
                        <input type="text" value={edu.degree} onChange={e => updateArrayItem('education', index, 'degree', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Location</label>
                        <input type="text" value={edu.location} onChange={e => updateArrayItem('education', index, 'location', e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={labelClass}>Start Date</label>
                          <input type="text" value={edu.startDate} onChange={e => updateArrayItem('education', index, 'startDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>End Date</label>
                          <input type="text" value={edu.endDate} onChange={e => updateArrayItem('education', index, 'endDate', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
          <button onClick={() => addArrayItem('experience', { company: '', title: '', location: '', startDate: '', endDate: '', description: [''] })} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleArrayDragEnd('experience', e)}>
            <SortableContext items={resumeData.experience.map(e => e.id)} strategy={verticalListSortingStrategy}>
              {resumeData.experience.map((exp, index) => (
                <SortableItem key={exp.id} id={exp.id}>
                  <div className="relative group">
                    <button onClick={() => removeArrayItem('experience', index)} className="absolute -top-1 right-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-4 pr-6">
                      <div>
                        <label className={labelClass}>Company</label>
                        <input type="text" value={exp.company} onChange={e => updateArrayItem('experience', index, 'company', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Job Title</label>
                        <input type="text" value={exp.title} onChange={e => updateArrayItem('experience', index, 'title', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Location</label>
                        <input type="text" value={exp.location} onChange={e => updateArrayItem('experience', index, 'location', e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={labelClass}>Start Date</label>
                          <input type="text" value={exp.startDate} onChange={e => updateArrayItem('experience', index, 'startDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>End Date</label>
                          <input type="text" value={exp.endDate} onChange={e => updateArrayItem('experience', index, 'endDate', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Bullet Points</label>
                      <div className="space-y-2">
                        {exp.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex gap-2">
                            <input type="text" value={desc} onChange={e => updateStringArrayItem('experience', index, 'description', descIndex, e.target.value)} className={inputClass} placeholder="Describe your responsibilities and achievements..." />
                            <button onClick={() => removeStringArrayItem('experience', index, 'description', descIndex)} className="text-gray-400 hover:text-red-500 p-2">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => addStringArrayItem('experience', index, 'description')} className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-2">
                          <Plus size={14} className="mr-1" /> Add Bullet Point
                        </button>
                      </div>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
          <button onClick={() => addArrayItem('projects', { name: '', technologies: '', startDate: '', endDate: '', description: [''] })} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-6">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleArrayDragEnd('projects', e)}>
            <SortableContext items={resumeData.projects.map(e => e.id)} strategy={verticalListSortingStrategy}>
              {resumeData.projects.map((proj, index) => (
                <SortableItem key={proj.id} id={proj.id}>
                  <div className="relative group">
                    <button onClick={() => removeArrayItem('projects', index)} className="absolute -top-1 right-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-4 pr-6">
                      <div>
                        <label className={labelClass}>Project Name</label>
                        <input type="text" value={proj.name} onChange={e => updateArrayItem('projects', index, 'name', e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Technologies Used</label>
                        <input type="text" value={proj.technologies} onChange={e => updateArrayItem('projects', index, 'technologies', e.target.value)} className={inputClass} placeholder="e.g. React, Node.js, Python" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:col-span-2">
                        <div>
                          <label className={labelClass}>Start Date</label>
                          <input type="text" value={proj.startDate} onChange={e => updateArrayItem('projects', index, 'startDate', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>End Date</label>
                          <input type="text" value={proj.endDate} onChange={e => updateArrayItem('projects', index, 'endDate', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className={labelClass}>Bullet Points</label>
                      <div className="space-y-2">
                        {proj.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex gap-2">
                            <input type="text" value={desc} onChange={e => updateStringArrayItem('projects', index, 'description', descIndex, e.target.value)} className={inputClass} />
                            <button onClick={() => removeStringArrayItem('projects', index, 'description', descIndex)} className="text-gray-400 hover:text-red-500 p-2">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => addStringArrayItem('projects', index, 'description')} className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-2">
                          <Plus size={14} className="mr-1" /> Add Bullet Point
                        </button>
                      </div>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
          <button onClick={() => addArrayItem('skills', { category: '', items: '' })} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleArrayDragEnd('skills', e)}>
            <SortableContext items={resumeData.skills.map(e => e.id)} strategy={verticalListSortingStrategy}>
              {resumeData.skills.map((skill, index) => (
                <SortableItem key={skill.id} id={skill.id}>
                  <div className="flex gap-3 items-start group relative">
                    <div className="w-1/3">
                      <input type="text" value={skill.category} onChange={e => updateArrayItem('skills', index, 'category', e.target.value)} className={inputClass} placeholder="Category (e.g. Languages)" />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input type="text" value={skill.items} onChange={e => updateArrayItem('skills', index, 'items', e.target.value)} className={inputClass} placeholder="Items (comma separated)" />
                      <button onClick={() => removeArrayItem('skills', index)} className="text-gray-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1 absolute -right-2 top-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

    </div>
  );
};