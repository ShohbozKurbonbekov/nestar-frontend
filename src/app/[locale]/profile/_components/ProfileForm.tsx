import ProfileFormContent from "./ProfileFormContent";
import { ProfileFormProvider } from "./ProfileFormProvider";

interface ProfileFormType {
  onUpdateProfile: (value: any) => Promise<void>;
}
export default function ProfileForm({ onUpdateProfile }: ProfileFormType) {
  return (
    <ProfileFormProvider>
      <ProfileFormContent onUpdateProfile={onUpdateProfile} />
    </ProfileFormProvider>
  );
}
