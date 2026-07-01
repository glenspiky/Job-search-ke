import { UserProfile } from "@/lib/types";
import {
  BadgeCheck,
  Briefcase,
  BriefcaseBusiness,
  ChartCandlestick,
  House,
  Wallet,
} from "lucide-react";

export const ProfileDetails = (profile: { profile: UserProfile }) => {
  return (
    <div>
      <div className="flex rounded-sm flex-col justify-center p-3 gap-4 bg-card">
        <h1 className="text-2xl font-bold">Profesional Details</h1>
        <div className="flex gap-4 border-2 border-zinc-800 p-4 rounded-xl ">
          <p className="">
            This are the professional details shown to users in the app.
          </p>
          <div className=" items-center justify-center rounded-2xl">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>{" "}
        </div>
        <div className="">
          <h1 className="flex mb-2">Expertise In</h1>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex border-2 justify-center gap-4 px-4 py-2 rounded-full ">
              <BriefcaseBusiness className="text-primary" />
              <p className="">Career</p>
            </div>{" "}
            <div className="flex border-2 justify-center gap-4 px-4 py-2 rounded-full ">
              <Wallet className="text-primary" />
              <p className="">Money</p>
            </div>{" "}
            <div className="flex border-2 justify-center gap-4 px-4 py-2 rounded-full ">
              <ChartCandlestick className="text-primary" />
              <p className="">Stock</p>
            </div>{" "}
            <div className="flex border-2 justify-center gap-4 px-4 py-2 rounded-full ">
              <House className="text-primary" />
              <p className="">Home</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Total Experience</h2>

          <div className="flex overflow-hidden rounded-2xl border shadow-sm">
            <div className="flex flex-1 flex-col justify-center p-3">
              <h3 className="text-xl font-bold">7 Years</h3>
              <p className="text-muted-foreground">of total experience</p>
            </div>

            <div className="flex w-20 items-center justify-center bg-primary/5">
              <BadgeCheck className="h-8 w-8 fill-white text-white" />
            </div>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <h2 className="text-lg font-semibold">Job Jobs Applied</h2>

          <div className="flex overflow-hidden rounded-2xl border shadow-sm">
            <div className="flex flex-1 flex-col justify-center p-3">
              <h3 className="text-xl font-bold">8 Jobs</h3>
              <p className="text-muted-foreground">of total jobs</p>
            </div>

            <div className="flex w-20 items-center justify-center bg-primary/5">
              <BriefcaseBusiness className="h-8 w-8 fill-white text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
