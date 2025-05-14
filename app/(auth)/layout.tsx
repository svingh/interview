import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  // ✅ Redirect ONLY if user is already logged in
  if (isUserAuthenticated) redirect('/');

  return (
    <div className='auth-layout'>
      {children}
    </div>
  );
};

export default AuthLayout;
