"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, DollarSign, Building2, Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "nextjs-toast-notify";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  remote: boolean;
  application_url: string;
  company_name: string;
  company_website: string | null;
  company_logo_url: string | null;
  posted_at: string;
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const jobId = params.id as string;

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/${jobId}`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          setJob(data.data);
        }
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleApply = async () => {
    if (!user) {
      showToast.error("Please login to apply for jobs", {
        duration: 3000,
        position: "top-center",
      });
      router.push("/login");
      return;
    }

    setApplying(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user._id,
            job_id: jobId,
            status: "applied",
          }),
        }
      );

      if (response.ok) {
        showToast.success("Application submitted successfully!", {
          duration: 4000,
          position: "top-center",
        });
      } else {
        const data = await response.json();
        showToast.error(data.error || "Failed to submit application", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (error) {
      showToast.error("Failed to submit application", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-full mt-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background pt-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/jobs">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Job not found</h3>
              <p className="text-muted-foreground">The job you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5" />
                  {job.company_name}
                </CardDescription>
              </div>
              {job.remote && (
                <Badge variant="secondary" className="text-sm">
                  Remote
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{job.location || "Location not specified"}</span>
              </div>
              {job.salary_min || job.salary_max ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <DollarSign className="h-5 w-5" />
                  <span>
                    {job.salary_min && job.salary_max
                      ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
                      : job.salary_min
                      ? `$${job.salary_min.toLocaleString()}+`
                      : `Up to $${job.salary_max?.toLocaleString()}`}
                  </span>
                </div>
              ) : null}
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Posted {new Date(job.posted_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Job Description</h3>
              <div className="prose prose-slate max-w-none text-muted-foreground whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                onClick={handleApply}
                disabled={applying}
                className="flex-1"
                size="lg"
              >
                {applying ? "Applying..." : "Apply Now"}
              </Button>
              {job.application_url && (
                <Button
                  variant="outline"
                  asChild
                  className="flex-1"
                  size="lg"
                >
                  <a
                    href={job.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply on Company Site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
