"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WithAuthProps {
  allowedRoles?: string[]; // Define allowed roles for a route
}

function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRoles = [] }: WithAuthProps = {}
) {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [currentUser, setCurrentUser] = useState<{ role: string } | null>(
      null
    );

    useEffect(() => {
      setIsClient(true);

      // Get user data from localStorage
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
          } catch (error) {
            console.error("Error parsing user data from localStorage", error);
            setCurrentUser(null);
          }
        }
      }
    }, []);

    useEffect(() => {
      // Skip if not on client
      if (!isClient) return;

      // Redirect to login if no user
      if (!currentUser) {
        router.push("/login");
        return;
      }

      // Check role-based access
      const userRole = currentUser.role;
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        if (userRole === "trainer") {
          router.push("/trainer");
        } else if (userRole === "client") {
          router.push("/client");
        } else {
          router.push("/login");
        }
      }
    }, [isClient, currentUser, allowedRoles, router]);

    if (
      !isClient ||
      !currentUser ||
      (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role))
    ) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  AuthComponent.displayName = `withAuth(${componentName})`;

  return AuthComponent;
}

export default withAuth;
