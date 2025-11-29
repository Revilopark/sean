import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Download, FileText, ChevronLeft, Printer, Image as ImageIcon, Upload, Sparkles, X, Share2, Copy, Check } from "lucide-react";
import LZString from "lz-string";
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
  ],
  portfolio: []
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem("resumeData");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    setLastSaved(new Date());
  }, [resumeData]);
  const [showAIReview, setShowAIReview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResults, setAnalysisResults] = useState<{score: number, missingKeywords: string[], suggestions: string[]} | null>(null);
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

  const addPortfolioItem = () => {
    setResumeData(prev => ({
      ...prev,
      portfolio: [
        ...prev.portfolio,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          image: ""
        }
      ]
    }));
  };

  const updatePortfolioItem = (id: string, field: keyof PortfolioItem, value: string) => {
    setResumeData(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removePortfolioItem = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(item => item.id !== id)
    }));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePortfolioItem(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateShareLink = () => {
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(resumeData));
    const url = `${window.location.origin}/resume/shared?d=${compressed}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const analyzeResume = () => {
    if (!jobDescription.trim()) return;

    // Simple keyword extraction and matching logic
    const jdLower = jobDescription.toLowerCase();
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    
    // Common environmental keywords to look for
    const keywords = [
      "conservation", "ecology", "marine", "biology", "field work", "data collection",
      "research", "monitoring", "species", "habitat", "gis", "reporting",
      "communication", "teamwork", "safety", "outdoor", "wildlife", "sampling"
    ];

    const foundKeywords = keywords.filter(k => resumeText.includes(k));
    const missingKeywords = keywords.filter(k => jdLower.includes(k) && !resumeText.includes(k));
    
    // Calculate a simple score
    const score = Math.min(100, Math.round((foundKeywords.length / (foundKeywords.length + missingKeywords.length)) * 100) + 50);

    const suggestions = [];
    if (missingKeywords.length > 0) {
      suggestions.push(`Consider adding these keywords found in the job description: ${missingKeywords.join(", ")}`);
    }
    if (resumeData.summary.length < 100) {
      suggestions.push("Your professional summary is quite short. Try expanding it to highlight your passion for conservation.");
    }
    if (resumeData.portfolio.length === 0) {
      suggestions.push("Adding portfolio items (photos of field work) can significantly boost your application for outdoor roles.");
    }

    setAnalysisResults({
      score,
      missingKeywords,
      suggestions
    });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#e6d5c3] selection:text-[#2c3e50]">
      {/* Header */}
      <header className="bg-[#2c3e50] text-[#fdfbf7] py-6 px-4 shadow-md border-b-4 border-[#8b4513] print:hidden">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#e6d5c3]" />
            <div className="flex flex-col">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#fdfbf7]">
                Field Resume Builder
              </h1>
              {lastSaved && (
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <span className="text-xs text-[#e6d5c3] font-mono font-medium tracking-wide">
                    Saved at {lastSaved.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-[#e6d5c3]/30 text-[#e6d5c3] hover:bg-[#e6d5c3]/10 hover:text-white">
              <Link href="/">
                <ChevronLeft className="w-4 h-4 mr-2" /> Back to Field Guide
              </Link>
            </Button>
            <Button onClick={() => setShowAIReview(true)} className="bg-blue-600 text-white hover:bg-blue-700 font-bold border-none">
              <Sparkles className="w-4 h-4 mr-2" /> AI Review
            </Button>
            <Button onClick={generateShareLink} className="bg-[#2c3e50] text-white hover:bg-[#34495e] font-bold border-none">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button onClick={() => handlePrint && handlePrint()} className="bg-[#e6d5c3] text-[#2c3e50] hover:bg-white font-bold">
              <Printer className="w-4 h-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#8b4513]" />
                Share Resume
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowShareModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-sm text-muted-foreground">
                Anyone with this link can view your resume and portfolio. The link contains all your data securely.
              </p>
              <div className="flex items-center gap-2">
                <Input value={shareUrl} readOnly className="bg-muted" />
                <Button size="icon" onClick={copyToClipboard} className={copied ? "bg-green-600 hover:bg-green-700" : ""}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                  Open Public View
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Review Modal */}
      {showAIReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white z-10 border-b">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                AI Resume Scanner
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAIReview(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {!analysisResults ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Paste the job description below. We'll scan your resume against it to find missing keywords and suggest improvements.
                  </p>
                  <Textarea 
                    placeholder="Paste job description here..." 
                    className="min-h-[200px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button onClick={analyzeResume} className="w-full" disabled={!jobDescription.trim()}>
                    Scan Resume
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                    <div>
                      <h3 className="font-bold text-lg">Match Score</h3>
                      <p className="text-sm text-muted-foreground">Based on keyword overlap</p>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{analysisResults.score}%</div>
                  </div>

                  {analysisResults.missingKeywords.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold text-red-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        Missing Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisResults.missingKeywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-sm rounded border border-red-100">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-bold text-blue-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {analysisResults.suggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm p-3 bg-blue-50 text-blue-800 rounded border border-blue-100">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" onClick={() => setAnalysisResults(null)} className="w-full">
                    Scan Another Job
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Portfolio & Projects</CardTitle>
              <Button size="sm" variant="outline" onClick={addPortfolioItem}>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.portfolio.map((item) => (
                <div key={item.id} className="space-y-4 p-4 border rounded-lg bg-secondary/10 relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                    onClick={() => removePortfolioItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Project Title</label>
                    <Input value={item.title} onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Description</label>
                    <Textarea 
                      value={item.description} 
                      onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)} 
                      className="h-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase text-muted-foreground">Project Image / Document</label>
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img src={item.image} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                      )}
                      <div className="relative">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          id={`file-${item.id}`}
                          onChange={(e) => handleImageUpload(item.id, e)}
                        />
                        <Button asChild variant="outline" size="sm">
                          <label htmlFor={`file-${item.id}`} className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" /> Upload Photo
                          </label>
                        </Button>
                      </div>
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

              {/* Portfolio */}
              {resumeData.portfolio.length > 0 && (
                <div className="mb-8 break-inside-avoid">
                  <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1">Field Portfolio</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {resumeData.portfolio.map((item) => (
                      <div key={item.id} className="break-inside-avoid">
                        {item.image && (
                          <div className="mb-2 aspect-video w-full overflow-hidden rounded border border-gray-200 bg-gray-50">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
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
