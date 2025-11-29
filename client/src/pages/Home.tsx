import { useState } from "react";
import { opportunities } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MapPin, Briefcase, DollarSign, ExternalLink, Filter, BookOpen, Compass, ArrowUpDown, Clock, GraduationCap, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OpportunityMap } from "@/components/OpportunityMap";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredOpportunities = opportunities.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "proximity") {
      const distA = parseInt(a.distance_from_bakersfield.replace(/[^0-9]/g, "")) || 0;
      const distB = parseInt(b.distance_from_bakersfield.replace(/[^0-9]/g, "")) || 0;
      return distA - distB;
    }
    return 0;
  });

  const getTravelTime = (distanceStr: string) => {
    const miles = parseInt(distanceStr.replace(/[^0-9]/g, "")) || 0;
    if (miles === 0) return "Local";
    const hours = Math.round(miles / 60 * 10) / 10; // Assuming 60mph avg
    return `~${hours} hrs drive`;
  };

  const categories = Array.from(new Set(opportunities.map((job) => job.category)));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header / Journal Cover */}
      <header className="relative bg-sidebar-primary text-sidebar-primary-foreground py-12 border-b-8 border-accent shadow-lg">
        <div className="absolute inset-0 bg-[url('/assets/hero-desk.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-8 h-8 text-accent" />
                <span className="font-mono text-sm tracking-widest uppercase text-accent/80">Field Log: Vol. 1</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-white drop-shadow-md">
                Sean's Career <br className="hidden md:block" />
                <span className="text-accent italic">Expedition Log</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-sidebar-primary-foreground/90 font-body leading-relaxed">
                Documenting local opportunities in Marine Ecology, Animal Sciences, and Conservation Management.
                <br />
                <span className="font-mono text-sm opacity-75 mt-2 block">Region: Bakersfield, CA (Local Only)</span>
              </p>
            </div>
            
            <div className="hidden md:block p-4 bg-white/10 backdrop-blur-sm rounded border border-white/20 rotate-1 shadow-xl max-w-xs">
              <div className="flex items-center gap-2 mb-2 border-b border-white/20 pb-2">
                <Compass className="w-5 h-5 text-accent" />
                <span className="font-heading font-bold">Mission Objectives</span>
              </div>
              <ul className="text-sm space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Marine Ecology
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Animal Sciences
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Conservation Mgmt
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Map Visualization */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-6 h-6 text-primary" />
            <h2 className="font-heading text-2xl font-bold">Expedition Map</h2>
          </div>
          <OpportunityMap opportunities={filteredOpportunities} />
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-card border-2 border-primary/20 rounded-sm p-6 mb-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5 pointer-events-none">
            <img src="/assets/icon-research.png" alt="Research Icon" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/2 space-y-2">
              <label className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Logs
              </label>
              <Input
                placeholder="Search by title, organization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-body text-lg border-2 border-input focus-visible:ring-primary bg-background/50"
              />
            </div>
            
            <div className="w-full md:w-1/4 space-y-2">
              <label className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Specimen
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-2 border-input bg-background/50">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/4 space-y-2 opacity-50 pointer-events-none">
              <label className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                Sort Order
              </label>
              <Select value="default" disabled>
                <SelectTrigger className="border-2 border-input bg-background/50">
                  <SelectValue placeholder="Local Only" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Local Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/4 pb-1">
              <div className="text-right font-mono text-xs text-muted-foreground">
                {filteredOpportunities.length} Records Found
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: List */}
          <div className="lg:col-span-12 space-y-6">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-muted-foreground/20 rounded-sm">
                <p className="font-heading text-xl text-muted-foreground">No specimens found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => {setSearchTerm(""); setCategoryFilter("all");}}
                  className="mt-2 text-primary"
                >
                  Clear filters to reset search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOpportunities.map((job) => (
                  <Card key={job.id} className="group border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col">
                    <CardHeader className="pb-3 bg-secondary/30 border-b border-border/50 relative">
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        {job.category.includes("Marine") ? (
                          <img src="/assets/icon-marine.png" className="w-12 h-12" alt="Marine" />
                        ) : (
                          <img src="/assets/icon-wildlife.png" className="w-12 h-12" alt="Wildlife" />
                        )}
                      </div>
                      <div className="flex justify-between items-start gap-4">
                        <Badge variant="outline" className="bg-background font-mono text-xs border-primary/30 text-primary rounded-sm px-2 py-0.5">
                          ID: {job.id.toString().padStart(3, '0')}
                        </Badge>
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-xs text-muted-foreground">{job.distance_from_bakersfield}</span>
                          <span className="font-mono text-[10px] text-primary flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getTravelTime(job.distance_from_bakersfield)}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="font-heading text-xl mt-2 leading-tight group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wide mt-1">
                        {job.organization}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-4 flex-grow flex flex-col gap-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="font-mono font-medium">{job.salary}</span>
                        </div>
                      </div>
                      
                      <Separator className="bg-border/50" />
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-mono text-xs font-bold uppercase text-muted-foreground mb-1">Requirements</h4>
                          <p className="text-sm line-clamp-3 text-foreground/80">{job.requirements}</p>
                        </div>

                        {/* Skills & Courses Section */}
                        {(job.recommended_skills || job.recommended_courses) && (
                          <div className="mt-3 p-3 bg-secondary/30 rounded border border-secondary/50">
                            {job.recommended_skills && (
                              <div className="mb-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <Award className="w-3 h-3 text-accent" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recommended Skills</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {job.recommended_skills.map((skill, idx) => (
                                    <Badge key={idx} variant="outline" className="text-[10px] h-5 px-1.5 bg-background/50 border-primary/20 text-foreground/80">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {job.recommended_courses && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <GraduationCap className="w-3 h-3 text-accent" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Training Resources</span>
                                </div>
                                <ul className="space-y-1.5">
                                  {job.recommended_courses.map((course, idx) => (
                                    <li key={idx} className="text-xs truncate">
                                      <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 hover:underline flex items-center gap-1.5 transition-colors">
                                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                                        <span className="font-medium">{course.title}</span>
                                        <span className="opacity-50 text-[10px]">({course.provider})</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-2">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide rounded-sm shadow-sm group-hover:translate-y-[-2px] transition-transform">
                          <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            View Field Report <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-sidebar-primary text-sidebar-primary-foreground py-12 mt-12 border-t-8 border-accent">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold">Sean's Expedition Log</h2>
              <p className="text-sm opacity-70 mt-2 max-w-md">
                A curated collection of career opportunities in the natural sciences.
                Data compiled for research purposes.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-mono text-xs opacity-50 uppercase tracking-widest">Last Updated</div>
                <div className="font-mono text-lg font-bold">Nov 29, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
