import { UserProfile } from "@/lib/types";
import {
  BadgeCheck,
  Briefcase,
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  Link,
  Globe,
} from "lucide-react";

export const ProfileDetails = ({ profile }: { profile: UserProfile }) => {
  return (
    <div>
      <div className="flex rounded-sm flex-col justify-center p-3 gap-4 bg-card">
        <h1 className="text-2xl font-bold">Professional Details</h1>
        
        <div className="space-y-4">
          {profile.currentTitle && (
            <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
              <div className="flex items-center justify-center rounded-2xl">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Title</p>
                <p className="font-semibold">{profile.currentTitle}</p>
              </div>
            </div>
          )}

          {profile.yearsExperience !== null && profile.yearsExperience !== undefined && (
            <div className="flex overflow-hidden rounded-2xl border shadow-sm">
              <div className="flex flex-1 flex-col justify-center p-3">
                <h3 className="text-xl font-bold">{profile.yearsExperience} Years</h3>
                <p className="text-muted-foreground">of total experience</p>
              </div>
              <div className="flex w-20 items-center justify-center bg-primary/5">
                <BadgeCheck className="h-8 w-8 fill-white text-white" />
              </div>
            </div>
          )}

          {(profile.city || profile.country) && (
            <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
              <div className="flex items-center justify-center rounded-2xl">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">
                  {profile.city && profile.country
                    ? `${profile.city}, ${profile.country}`
                    : profile.city || profile.country}
                </p>
              </div>
            </div>
          )}

          {profile.expectedSalary !== null && profile.expectedSalary !== undefined && (
            <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
              <div className="flex items-center justify-center rounded-2xl">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expected Salary</p>
                <p className="font-semibold">${profile.expectedSalary.toLocaleString()}</p>
              </div>
            </div>
          )}

          {profile.remoteOnly !== null && profile.remoteOnly !== undefined && (
            <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
              <div className="flex items-center justify-center rounded-2xl">
                <BriefcaseBusiness className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Work Preference</p>
                <p className="font-semibold">{profile.remoteOnly ? "Remote Only" : "Open to Office"}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Social Links</h2>
            
            {profile.linkedinUrl && (
              <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
                <div className="flex items-center justify-center rounded-2xl">
                  <Link className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            )}

            {profile.githubUrl && (
              <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
                <div className="flex items-center justify-center rounded-2xl">
                  <Link className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            )}

            {profile.portfolioUrl && (
              <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl">
                <div className="flex items-center justify-center rounded-2xl">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Portfolio</p>
                  <a
                    href={profile.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-500 hover:underline"
                  >
                    View Portfolio
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
