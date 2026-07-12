
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, DollarSign, ArrowLeft, ExternalLink, Building2 } from "lucide-react";

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
  posted_at: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setJob(data.data || data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const timeAgo = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.max(1, Math.round(diffMs / 60000));
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.round(hrs / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-20 px-4 md:px-8 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-amber-400 transition-colors font-mono text-xs tracking-wide mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          BACK TO BOARD
        </Link>

        {loading ? (
          <Card className="bg-zinc-900 border-zinc-800 rounded-sm">
            <CardContent className="pt-6 space-y-4">
              <Skeleton className="h-8 w-2/3 bg-zinc-800" />
              <Skeleton className="h-4 w-1/3 bg-zinc-800" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-4 w-24 bg-zinc-800" />
                <Skeleton className="h-4 w-24 bg-zinc-800" />
              </div>
              <Skeleton className="h-32 w-full bg-zinc-800 mt-4" />
            </CardContent>
          </Card>
        ) : notFound || !job ? (
          <Card className="bg-zinc-900 border-dashed border-zinc-800 rounded-sm">
            <CardContent className="pt-6 text-center py-16">
              <div className="font-mono text-3xl text-zinc-700 mb-3">∅</div>
              <h3 className="text-lg font-bold mb-1">Posting not found</h3>
              <p className="text-zinc-500 text-sm mb-6">
                This role may have closed or the link is out of date.
              </p>
              <Link href="/jobs">
                <Button className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-xs tracking-wide font-bold rounded-sm">
                  RETURN TO BOARD
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="relative bg-zinc-900 border-zinc-800 rounded-sm overflow-hidden">
            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />

            <CardContent className="pt-8 pb-8">
              <div className="flex items-start justify-between gap-3 mb-1">
                <span className="font-mono text-[10px] tracking-[0.14em] font-bold bg-amber-400 text-zinc-950 px-1.5 py-0.5 rounded-sm">
                  {job.remote ? "REMOTE ROLE" : "ON-SITE ROLE"}
                </span>
                {job.remote && (
                  <Badge className="rotate-3 bg-transparent border border-teal-400/40 text-teal-400 font-mono text-[9px] tracking-widest font-bold hover:bg-transparent">
                    REMOTE
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 mb-2">
                {job.title}
              </h1>

              <div className="flex items-center gap-1.5 text-zinc-400 text-sm mb-6">
                <Building2 className="h-4 w-4" />
                {job.company_name}
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm border-y border-dashed border-zinc-800 py-4 mb-6">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-4 w-4 text-zinc-500" />
                  {job.location || "Location not specified"}
                </div>
                {(job.salary_min || job.salary_max) && (
                  <div className="flex items-center gap-2 text-amber-400 font-semibold tabular-nums">
                    <DollarSign className="h-4 w-4" />
                    {job.salary_min && job.salary_max
                      ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                      : job.salary_min
                      ? `${job.salary_min.toLocaleString()}+`
                      : `Up to ${job.salary_max?.toLocaleString()}`}
                  </div>
                )}
                <div className="text-zinc-600 uppercase text-[11px] tracking-wide flex items-center">
                  Posted {timeAgo(job.posted_at)}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase mb-3">
                  Role description
                </h2>
                <p className="text-zinc-300 text-[15px] leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <a
                href={job.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-xs tracking-wide font-bold rounded-sm px-8 py-5">
                  APPLY NOW
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
