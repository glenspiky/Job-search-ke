"use client";

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
      console.log("Invalid userId");
      return;
    }
    if (userId === "null") return console.log("Invalid user Id");

    const getUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/get/${userId}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) {
          console.log("Erro fetchng userProfile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    getUser();
  }, [userId]);
  return (
    <div className="relative w-full">
      <div className="h-52 w-full rounded-2xl bg-green-700 p-6 text-white">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <span>{user?.first_name}</span>
      </div>

      {profile && (
        <div className="absolute left-1/2 top-40 w-full max-w-4xl -translate-x-1/2 px-4">
          <ProfileUpdateCard profile={profile} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
