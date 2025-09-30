
import { Suspense } from 'react';
import { LoginContent, LoginFormSkeleton } from './login-content';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />} >
        <LoginContent />
    </Suspense>
  );
}
