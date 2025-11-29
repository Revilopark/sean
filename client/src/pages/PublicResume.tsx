import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Printer, Mail, Phone, MapPin, Briefcase, GraduationCap, Image as ImageIcon } from "lucide-react";
import LZString from "lz-string";

// Types (duplicated from ResumeBuilder for standalone usage)
interface Experience {
  id: string;
  role: string;
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

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
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
  portfolio: PortfolioItem[];
}

export default function PublicResume() {
  const [location] = useLocation();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Extract data from URL query param 'd'
      const searchParams = new URLSearchParams(window.location.search);
      const compressedData = searchParams.get('d');
      
      if (compressedData) {
        const decompressed = LZString.decompressFromEncodedURIComponent(compressedData);
        if (decompressed) {
          setResumeData(JSON.parse(decompressed));
        } else {
          setError("Failed to load resume data. The link might be broken.");
        }
      } else {
        setError("No resume data found in the link.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while loading the resume.");
    }
  }, [location]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] p-4">
        <Card className="w-full max-w-md text-center p-6">
          <h1 className="text-xl font-bold text-red-600 mb-2">Error Loading Resume</h1>
          <p className="text-muted-foreground">{error}</p>
        </Card>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
        <div className="animate-pulse text-[#2c3e50]">Loading Field Log...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#e6d5c3] selection:text-[#2c3e50] pb-12">
      {/* Header */}
      <header className="bg-[#2c3e50] text-[#fdfbf7] py-6 px-4 shadow-md border-b-4 border-[#8b4513] print:hidden">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fdfbf7] rounded-full flex items-center justify-center text-[#2c3e50] font-bold border-2 border-[#8b4513]">
              SL
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider uppercase font-serif">Field Log: Resume</h1>
              <p className="text-xs text-gray-300 tracking-widest uppercase">Shared View</p>
            </div>
          </div>
          <Button onClick={() => window.print()} className="bg-[#e6d5c3] text-[#2c3e50] hover:bg-white font-bold">
            <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl mt-8 px-4 print:mt-0 print:px-0">
        <div className="bg-white shadow-xl print:shadow-none p-8 md:p-12 min-h-[1100px] relative overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
          
          {/* Resume Header */}
          <div className="relative z-10 mb-8 text-center border-b-2 border-[#2c3e50] pb-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2c3e50] mb-4 tracking-tight">{resumeData.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 font-medium uppercase tracking-wider">
              {resumeData.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#8b4513]" />
                  {resumeData.email}
                </div>
              )}
              {resumeData.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#8b4513]" />
                  {resumeData.phone}
                </div>
              )}
              {resumeData.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#8b4513]" />
                  {resumeData.location}
                </div>
              )}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
            {/* Main Column */}
            <div className="space-y-8">
              {/* Summary */}
              {resumeData.summary && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 flex items-center text-[#2c3e50]">
                    <Briefcase className="w-5 h-5 mr-2 text-[#8b4513]" />
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 flex items-center text-[#2c3e50]">
                    <Briefcase className="w-5 h-5 mr-2 text-[#8b4513]" />
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="relative pl-4 border-l-2 border-[#e6d5c3]">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-lg text-[#2c3e50]">{exp.role}</h3>
                          <span className="text-sm font-sans text-gray-500 whitespace-nowrap ml-2">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-md font-medium text-[#8b4513]">{exp.company}</span>
                          <span className="text-sm text-gray-500 italic">{exp.location}</span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Skills */}
              {resumeData.skills && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-[#2c3e50]">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-[#fdfbf7] border border-[#e6d5c3] text-xs font-medium text-[#2c3e50] rounded-sm">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 flex items-center text-[#2c3e50]">
                    <GraduationCap className="w-5 h-5 mr-2 text-[#8b4513]" />
                    Education
                  </h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-bold text-md text-[#2c3e50]">{edu.school}</h3>
                        <div className="text-sm text-[#8b4513] mb-1">{edu.degree}</div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{edu.year}</span>
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Section (Full Width) */}
          {resumeData.portfolio.length > 0 && (
            <div className="relative z-10 mt-8 pt-8 border-t-2 border-[#e6d5c3]">
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-6 pb-1 flex items-center text-[#2c3e50]">
                <ImageIcon className="w-5 h-5 mr-2 text-[#8b4513]" />
                Field Portfolio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resumeData.portfolio.map((item) => (
                  <div key={item.id} className="break-inside-avoid bg-[#fdfbf7] p-4 rounded border border-[#e6d5c3]">
                    {item.image && (
                      <div className="mb-3 aspect-video w-full overflow-hidden rounded border border-gray-200 bg-gray-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="font-bold text-md text-[#2c3e50] mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
