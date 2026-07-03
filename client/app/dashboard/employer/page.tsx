"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Building2, Plus, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  remote: boolean;
  posted_at: string;
}

interface Applicant {
  id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_current_title: string | null;
  user_years_experience: number | null;
  status: string;
  applied_at: string;
}

export default function EmployerDashboardPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;

      setLoading(true);
      try {
        const [jobsRes, applicantsRes] = await Promise.all([
          fetch("http://localhost:5000/api/jobs", { credentials: "include" }),
          fetch("http://localhost:5000/api/applications", { credentials: "include" }),
        ]);

        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData.data || []);
        }

        if (applicantsRes.ok) {
          const applicantsData = await applicantsRes.json();
          setApplicants(applicantsData.data || []);
        }
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = {
    totalJobs: jobs.length,
    totalApplicants: applicants.length,
    activeJobs: jobs.filter((j) => new Date(j.posted_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "applied":
        return "bg-blue-500";
      case "saved":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your job postings and applicants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
              <p className="text-xs text-muted-foreground">Active job listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplicants}</div>
              <p className="text-xs text-muted-foreground">Candidates applied</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeJobs}</div>
              <p className="text-xs text-muted-foreground">Posted in last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your job postings</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link href="/jobs">
                <Button variant="outline">
                  Browse All Jobs
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Postings</CardTitle>
              <CardDescription>Your latest job listings</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <Skeleton className="h-4 w-48 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No jobs posted yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first job posting to start hiring</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Posted {new Date(job.posted_at).toLocaleDateString()}
                          {job.remote && " • Remote"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {jobs.length > 5 && (
                    <div className="text-center pt-4">
                      <Button variant="outline">View All Jobs</Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>Latest candidates who applied</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  ))}
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No applicants yet</h3>
                  <p className="text-muted-foreground">Applicants will appear here once they apply to your jobs</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applicants.slice(0, 5).map((applicant) => (
                    <div
                      key={applicant.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {applicant.user_first_name} {applicant.user_last_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{applicant.user_email}</p>
                        {applicant.user_current_title && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {applicant.user_current_title}
                            {applicant.user_years_experience && ` • ${applicant.user_years_experience} years exp`}
                          </p>
                        )}
                      </div>
                      <Badge className={`${getStatusColor(applicant.status)} text-white capitalize`}>
                        {applicant.status}
                      </Badge>
                    </div>
                  ))}
                  {applicants.length > 5 && (
                    <div className="text-center pt-4">
                      <Button variant="outline">View All Applicants</Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
