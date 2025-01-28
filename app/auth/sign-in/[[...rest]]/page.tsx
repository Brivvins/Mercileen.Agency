'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className='m-5 flex justify-center items-center'><SignIn/></div>
  );
}
