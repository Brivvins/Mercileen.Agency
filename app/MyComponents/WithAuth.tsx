import React, { useEffect, useState } from "react";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export function withAuth<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const { isSignedIn} = useAuth();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    // Render nothing until client-side and auth status is loaded
    if (!isClient ) {
      return null;
    }

    // If user is not signed in, redirect to Clerk's sign-in page
    if (!isSignedIn) {
      return <RedirectToSignIn redirectUrl={'/admin/management'}/>;
    }

    // Render the wrapped component for authenticated users
    return <Component {...props} />;
  };
}
