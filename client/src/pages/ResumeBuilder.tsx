import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Download, FileText, ChevronLeft, Printer } from "lucide-react";
import { Link } from "wouter";
import { useReactToPrint } from "react-to-print";

// Types
interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  year: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string;
  experience: Experience[];
  education: Education[];
}

const initialData: ResumeData = {
  fullName: "Sean [Last Name]",
  email: "sean@example.com",
  phone: "(661) 555-0123",
  location: "Bakersfield, CA",
  summary: "Dedicated hospitality professional with a passion for marine ecology and conservation. Proven track record of reliability, customer service, and adaptability. Seeking to leverage strong work ethic and enthusiasm for the outdoors in an entry-level position in environmental science or animal care.",
  skills: "Customer Service, Teamwork, Adaptability, Outdoor Safety, Basic Biology, Data Entry",
  experience: [
    {
      id: "1",
      title: "Server / Hospitality Staff",
      company: "Local Restaurant",
      location: "Bakersfield, CA",
      startDate: "2020",
      endDate: "Present",
      description: "• Provided exceptional service to guests in a fast-paced environment.\n• Managed cash transactions and reconciled daily sales.\n• Collaborated with team members to ensure smooth operations during peak hours."
    }
  ],
  education: [
    {
      id: "1",
      degree: "High School Diploma",
      school: "Bakersfield High School",
      location: "Bakersfield, CA",
      year: "2019"
    }
  ]
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Sean_Resume",
  });

  const updateField = (field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          degree: "",
          school: "",
          location: "",
          year: ""
        }
      ]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#e6d5c3] selection:text-[#2c3e50]">
      {/* Header */}
      <header className="bg-[#2c3e50] text-[#fdfbf7] py-6 px-4 shadow-md border-b-4 border-[#8b4513] print:hidden">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#e6d5c3]" />
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[#fdfbf7]">
              Field Resume Builder
            </h1>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-[#e6d5c3]/30 text-[#e6d5c3] hover:bg-[#e6d5c3]/10 hover:text-white">
              <Link href="/">
                <ChevronLeft className="w-4 h-4 mr-2" /> Back to Field Guide
              </Link>
            </Button>
            <Button onClick={() => handlePrint && handlePrint()} className="bg-[#e6d5c3] text-[#2c3e50] hover:bg-white font-bold">
              <Printer className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl py-8 px-4 flex flex-col lg:flex-row gap-8 print:p-0 print:block">
        {/* Editor Column */}
        <div className="w-full lg:w-1/2 space-y-6 print:hidden">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input value={resumeData.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input value={resumeData.location} onChange={(e) => updateField('location', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input value={resumeData.email} onChange={(e) => updateField('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input value={resumeData.phone} onChange={(e) => updateField('phone', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Summary</label>
                <Textarea 
                  value={resumeData.summary} 
                  onChange={(e) => updateField('summary', e.target.value)} 
                  className="h-24"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills (comma separated)</label>
                <Textarea 
                  value={resumeData.skills} 
                  onChange={(e) => updateField('skills', e.target.value)} 
                  className="h-20"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button size="sm" variant="outline" onClick={addExperience}>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="space-y-4 p-4 border rounded-lg bg-secondary/10 relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Job Title</label>
                      <Input value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Company</label>
                      <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Start Date</label>
                      <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">End Date</label>
                      <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Location</label>
                      <Input value={exp.location} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Description</label>
                    <Textarea 
                      value={exp.description} 
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                      className="h-24"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button size="sm" variant="outline" onClick={addEducation}>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="space-y-4 p-4 border rounded-lg bg-secondary/10 relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Degree / Diploma</label>
                      <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">School</label>
                      <Input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Year</label>
                      <Input value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase text-muted-foreground">Location</label>
                      <Input value={edu.location} onChange={(e) => updateEducation(edu.id, 'location', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="w-full lg:w-1/2 print:w-full">
          <div className="sticky top-8 print:static">
            <div className="mb-4 flex justify-between items-center print:hidden">
              <h2 className="font-heading text-xl font-bold">Live Preview</h2>
              <span className="text-sm text-muted-foreground">A4 Format</span>
            </div>
            
            {/* Resume Paper */}
            <div 
              ref={componentRef}
              className="bg-white shadow-2xl print:shadow-none w-full min-h-[1123px] p-[40px] md:p-[60px] text-[#2c3e50]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {/* Resume Header */}
              <div className="border-b-2 border-[#2c3e50] pb-6 mb-6 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{resumeData.fullName}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-sans text-gray-600">
                  <span>{resumeData.location}</span>
                  <span>•</span>
                  <span>{resumeData.phone}</span>
                  <span>•</span>
                  <span>{resumeData.email}</span>
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
                  <p className="text-sm leading-relaxed text-gray-700">{resumeData.summary}</p>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1">Core Competencies</h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.split(',').map((skill, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-1 text-xs font-sans rounded text-gray-700 border border-gray-200">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1">Experience</h2>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-md">{exp.title}</h3>
                          <span className="text-sm font-sans text-gray-600">{exp.startDate} – {exp.endDate}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm italic font-semibold text-gray-700">{exp.company}</span>
                          <span className="text-sm text-gray-500">{exp.location}</span>
                        </div>
                        <p className="text-sm whitespace-pre-line text-gray-700 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1">Education</h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-md">{edu.school}</h3>
                          <span className="text-sm font-sans text-gray-600">{edu.year}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm italic text-gray-700">{edu.degree}</span>
                          <span className="text-sm text-gray-500">{edu.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
