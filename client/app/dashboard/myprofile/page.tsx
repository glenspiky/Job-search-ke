"use client";

import { ProfileDetails } from "@/components/ProfileDetails";
import ProfileUpdateCard from "@/components/ProfileUpdateCard";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (userId === "null") return;

    const getUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/get/${userId}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) {
          // Handle error
        }
        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        // Handle error
      }
    };

    getUser();
  }, [userId]);
  return (
    <div className="relative w-full">
      <div className="h-30 md:w-full rounded-2xl bg-green-700 p-3 md:p-6  text-white md:h-48">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <span>{user?.first_name}</span>
      </div>

      {profile && (
        <div className="absolute left-1/2 top-18 md:top-40 md:w-full w-screen  -translate-x-1/2 px-4 flex flex-col md:flex-row gap-6">
          <div className="w-full">
            {" "}
            <ProfileUpdateCard profile={profile} userId={userId} />
          </div>
          <div className="w-full">
            {" "}
            <ProfileDetails profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
