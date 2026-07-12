
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, DollarSign, ExternalLink, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("title", searchTerm);
      if (locationFilter) params.append("location", locationFilter);
      if (remoteOnly) params.append("remote", "true");

      const response = await fetch(
        `http://localhost:5000/api/jobs?${params.toString()}`,
        { credentials: "include" }
      );

      if (response.ok) {
        const data = await response.json();
        setJobs(data.data || []);
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, locationFilter, remoteOnly]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const timeAgo = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.max(1, Math.round(diffMs / 60000));
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.round(hrs / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* header / status strip */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] tracking-[0.14em] font-bold bg-amber-400 text-zinc-950 px-1.5 py-0.5 rounded-sm">
                JOBS//
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Find Your Dream Job
              </h1>
            </div>
            <p className="text-zinc-400 text-sm max-w-prose">
              Explore opportunities from top companies
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-zinc-100 font-semibold">{jobs.length}</span> OPEN
          </div>
        </div>

        {/* search panel */}
        <Card className="mb-8 bg-zinc-900 border-zinc-800 rounded-sm">
          <div className="px-4 py-2 border-b border-zinc-800 font-mono text-[10px] tracking-[0.14em] text-zinc-500 uppercase">
            Query parameters
          </div>
          <CardContent className="pt-4">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  placeholder="Search jobs by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-sm"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                <Input
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-sm"
                />
              </div>
              <label
                htmlFor="remote"
                className="flex items-center gap-2 cursor-pointer font-mono text-xs text-zinc-400 shrink-0"
              >
                <input
                  type="checkbox"
                  id="remote"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="rounded-sm accent-amber-400"
                />
                REMOTE ONLY
              </label>
              <Button
                type="submit"
                className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-xs tracking-wide font-bold rounded-sm"
              >
                RUN SEARCH →
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-zinc-900 border-zinc-800 rounded-sm">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2 bg-zinc-800" />
                  <Skeleton className="h-4 w-1/2 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2 bg-zinc-800" />
                  <Skeleton className="h-4 w-full mb-2 bg-zinc-800" />
                  <Skeleton className="h-4 w-2/3 bg-zinc-800" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full bg-zinc-800" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <Card className="bg-zinc-900 border-dashed border-zinc-800 rounded-sm">
            <CardContent className="pt-6 text-center py-16">
              <Building2 className="h-10 w-10 mx-auto mb-4 text-zinc-700" />
              <h3 className="text-lg font-bold mb-1">No jobs found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="group relative bg-zinc-900 border-zinc-800 rounded-sm hover:border-amber-500/40 hover:-translate-y-0.5 transition-all overflow-hidden"
              >
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-800 group-hover:bg-amber-400 transition-colors" />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg font-bold tracking-tight leading-snug">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5 text-sm text-zinc-400 mt-1">
                        <span className="h-1.5 w-1.5 bg-teal-400 shrink-0" />
                        {job.company_name}
                      </CardDescription>
                    </div>
                    {job.remote && (
                      <Badge className="rotate-3 bg-transparent border border-teal-400/40 text-teal-400 font-mono text-[9px] tracking-widest font-bold hover:bg-transparent">
                        REMOTE
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {job.location || "Location not specified"}
                  </div>
                  {job.salary_min || job.salary_max ? (
                    <div className="flex items-center gap-2 font-mono text-[15px] font-semibold text-amber-400 tabular-nums">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      {job.salary_min && job.salary_max
                        ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                        : job.salary_min
                          ? `${job.salary_min.toLocaleString()}+`
                          : `Up to ${job.salary_max?.toLocaleString()}`}
                    </div>
                  ) : null}
                  <p className="text-sm text-zinc-500 line-clamp-3 border-t border-dashed border-zinc-800 pt-3">
                    {job.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-2 pt-2">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase">
                    Posted {timeAgo(job.posted_at)}
                  </span>
                  <Link href={`/jobs/${job.id}`}>
                    <Button
                      variant="outline"
                      className="bg-transparent border-zinc-700 text-zinc-100 hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 font-mono text-[11px] tracking-wide rounded-sm"
                    >
                      VIEW
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
