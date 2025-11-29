import React, { createContext, useContext, useState, useEffect } from 'react';
import { Opportunity } from '../../../shared/schema';

export type JobStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';

export interface TrackedJob extends Opportunity {
  status: JobStatus;
  dateSaved: string;
  dateApplied?: string;
  dateInterview?: string;
  notes?: string;
  nextFollowUp?: string;
}

interface JobTrackerContextType {
  trackedJobs: TrackedJob[];
  addJob: (job: Opportunity) => void;
  updateJobStatus: (id: number, status: JobStatus) => void;
  updateJobNotes: (id: number, notes: string) => void;
  updateJobDates: (id: number, dates: { dateApplied?: string; dateInterview?: string; nextFollowUp?: string }) => void;
  removeJob: (id: number) => void;
}

const JobTrackerContext = createContext<JobTrackerContextType | undefined>(undefined);

export function JobTrackerProvider({ children }: { children: React.ReactNode }) {
  const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>(() => {
    const saved = localStorage.getItem('sean-job-tracker');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sean-job-tracker', JSON.stringify(trackedJobs));
  }, [trackedJobs]);

  const addJob = (job: Opportunity) => {
    setTrackedJobs(prev => {
      if (prev.some(j => j.id === job.id)) return prev;
      return [...prev, { 
        ...job, 
        status: 'Saved', 
        dateSaved: new Date().toISOString() 
      }];
    });
  };

  const updateJobStatus = (id: number, status: JobStatus) => {
    setTrackedJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status } : job
    ));
  };

  const updateJobNotes = (id: number, notes: string) => {
    setTrackedJobs(prev => prev.map(job => 
      job.id === id ? { ...job, notes } : job
    ));
  };

  const updateJobDates = (id: number, dates: { dateApplied?: string; dateInterview?: string; nextFollowUp?: string }) => {
    setTrackedJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...dates } : job
    ));
  };

  const removeJob = (id: number) => {
    setTrackedJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <JobTrackerContext.Provider value={{ trackedJobs, addJob, updateJobStatus, updateJobNotes, updateJobDates, removeJob }}>
      {children}
    </JobTrackerContext.Provider>
  );
}

export function useJobTracker() {
  const context = useContext(JobTrackerContext);
  if (context === undefined) {
    throw new Error('useJobTracker must be used within a JobTrackerProvider');
  }
  return context;
}
