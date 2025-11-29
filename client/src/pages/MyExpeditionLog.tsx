import { useJobTracker, JobStatus } from "@/contexts/JobTrackerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, ExternalLink, Calendar, CheckCircle2, Clock, XCircle, AlertCircle, Save } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function MyExpeditionLog() {
  const { trackedJobs, updateJobStatus, updateJobNotes, updateJobDates, removeJob } = useJobTracker();
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'All'>('All');

  const filteredJobs = filterStatus === 'All' 
    ? trackedJobs 
    : trackedJobs.filter(job => job.status === filterStatus);

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'Saved': return 'bg-secondary text-secondary-foreground';
      case 'Applied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Interviewing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Offer': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans selection:bg-[#e6d5c3] selection:text-[#2c3e50]">
      {/* Header */}
      <header className="bg-[#2c3e50] text-[#fdfbf7] py-8 px-4 shadow-md border-b-4 border-[#8b4513]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-[#e6d5c3]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#e6d5c3]/80">Field Log: Vol. 1</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-[#fdfbf7]">
                My Expedition Log
              </h1>
              <p className="text-[#e6d5c3]/80 mt-2 max-w-2xl font-serif italic text-lg">
                Tracking the progress of your career exploration and applications.
              </p>
            </div>
            <Button asChild variant="outline" className="border-[#e6d5c3]/30 text-[#e6d5c3] hover:bg-[#e6d5c3]/10 hover:text-white">
              <Link href="/">Return to Field Guide</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl py-12 px-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {(['Saved', 'Applied', 'Interviewing', 'Offer', 'Rejected'] as JobStatus[]).map(status => (
            <Card key={status} className="bg-card/50 border-primary/10">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold font-heading text-primary">
                  {trackedJobs.filter(j => j.status === status).length}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mt-1">{status}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Active Logs
          </h2>
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as JobStatus | 'All')}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Saved">Saved</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interviewing">Interviewing</SelectItem>
              <SelectItem value="Offer">Offer Received</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-primary/20 rounded-lg bg-secondary/10">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-muted-foreground">No logs found</h3>
              <p className="text-muted-foreground/80 mt-2">
                Return to the <Link href="/" className="text-primary underline underline-offset-4">Field Guide</Link> to start tracking opportunities.
              </p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <Card key={job.id} className="overflow-hidden border-primary/10 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Job Info */}
                  <div className="p-6 flex-grow border-b md:border-b-0 md:border-r border-primary/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-primary">{job.title}</h3>
                        <p className="text-muted-foreground font-medium">{job.organization}</p>
                      </div>
                      <Badge className={`${getStatusColor(job.status)} border`}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                          View Listing <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeJob(job.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>

                  {/* Right: Tracker Controls */}
                  <div className="p-6 w-full md:w-[400px] bg-secondary/10 flex flex-col gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Update Status</label>
                      <Select value={job.status} onValueChange={(v) => updateJobStatus(job.id, v as JobStatus)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Saved">Saved</SelectItem>
                          <SelectItem value="Applied">Applied</SelectItem>
                          <SelectItem value="Interviewing">Interviewing</SelectItem>
                          <SelectItem value="Offer">Offer Received</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Date Applied</label>
                        <Input 
                          type="date" 
                          className="h-8 text-xs bg-white"
                          value={job.dateApplied ? new Date(job.dateApplied).toISOString().split('T')[0] : ''}
                          onChange={(e) => updateJobDates(job.id, { dateApplied: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Next Follow-up</label>
                        <Input 
                          type="date" 
                          className="h-8 text-xs bg-white"
                          value={job.nextFollowUp ? new Date(job.nextFollowUp).toISOString().split('T')[0] : ''}
                          onChange={(e) => updateJobDates(job.id, { nextFollowUp: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 flex-grow">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Field Notes</label>
                      <Textarea 
                        placeholder="Add notes about application, interview, or contacts..."
                        className="min-h-[80px] text-xs bg-white resize-none"
                        value={job.notes || ''}
                        onChange={(e) => updateJobNotes(job.id, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

import { BookOpen, MapPin, DollarSign } from "lucide-react";
