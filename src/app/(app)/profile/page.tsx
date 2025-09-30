
import { Suspense } from 'react';
import { ProfileContent, ProfilePageSkeleton } from './profile-content';


export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageSkeleton />} >
      <ProfileContent />
    </Suspense>
  )
}
