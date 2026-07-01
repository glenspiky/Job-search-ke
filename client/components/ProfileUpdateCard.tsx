import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { UserProfile, UserProfileData, UserProfileSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "nextjs-toast-notify";
import { useForm } from "react-hook-form";
import { EditableField } from "./EditableField";
type Props = {
  profile: UserProfile;
  userId?: string;
};

export default function ProfileUpdateCard({ profile, userId }: Props) {
  const { user } = useAuth();

  const form = useForm<UserProfileData>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      currentTitle: profile.currentTitle ?? "",
      yearsExperience: profile.yearsExperience ?? undefined,
      city: profile.city ?? "",
      country: profile.country ?? "",
      linkedinUrl: profile.linkedinUrl ?? "",
      githubUrl: profile.githubUrl ?? "",
      portfolioUrl: profile.portfolioUrl ?? "",
      expectedSalary: profile.expectedSalary ?? undefined,
      remoteOnly: profile.remoteOnly ?? false,
    },
  });
  const onSubmit = async (data: UserProfileData) => {
    try {
      console.log(userId);
      const response = await fetch(
        `http://localhost:5000/api/users/update/${userId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const updatedProfile = await response.json();
      if (!response.ok) {
        throw new Error(updatedProfile.message || "Failed to update profile");
      }
      showToast.success("Success! Updated Succesfuly.", {
        duration: 4000,
        position: "top-center",
        transition: "topBounce",
        sound: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const saveField = form.handleSubmit(onSubmit);
  return (
    <>
      <div className="flex flex-col bg-card px-4 rounded-sm">
        <div className="flex flex-col items-center rounded-sm bg-card px-4 py-4">
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="mt-2 flex gap-2 text-primary font-medium">
            <span>{user?.first_name}</span>
            <span>{user?.last_name}</span>
          </div>

          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </div>
        <EditableField
          name="currentTitle"
          label="Profession"
          value={form.watch("currentTitle") || profile.currentTitle}
          placeholder="Software Engineer"
          control={form.control}
          onSave={saveField}
        />
        <EditableField
          name="city"
          label="City"
          value={form.watch("city") || profile.city}
          placeholder="Nairobi"
          control={form.control}
          onSave={saveField}
        />
        <EditableField
          name="country"
          label="Country"
          value={form.watch("country") || profile.country}
          placeholder="Kenya"
          control={form.control}
          onSave={saveField}
        />
        <EditableField
          name="linkedinUrl"
          label="LinkedIn"
          value={form.watch("linkedinUrl") || profile.linkedinUrl}
          placeholder="https://linkedin.com/in/..."
          control={form.control}
          onSave={saveField}
        />
        <EditableField
          name="githubUrl"
          label="GitHub"
          value={form.watch("githubUrl") || profile.githubUrl}
          placeholder="https://github.com/..."
          control={form.control}
          onSave={saveField}
        />
        <EditableField
          name="portfolioUrl"
          label="Portfolio"
          value={form.watch("portfolioUrl") || profile.portfolioUrl}
          placeholder="https://myportfolio.com"
          control={form.control}
          onSave={saveField}
        />
      </div>
    </>
  );
}
