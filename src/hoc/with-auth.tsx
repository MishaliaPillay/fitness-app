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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsClient(true);
      console.log("withAuth: Initial mount, checking auth");

      // Get user data from localStorage
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("currentUser");
        console.log("withAuth: storedUser from localStorage:", storedUser);

        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            console.log("withAuth: Parsed user:", user);
            setCurrentUser(user);

            // Debug role check
            if (allowedRoles.length > 0) {
              console.log("withAuth: Allowed roles:", allowedRoles);
              console.log("withAuth: User role:", user.role);
              console.log(
                "withAuth: Has access:",
                allowedRoles.includes(user.role)
              );
            }
          } catch (error) {
            console.error("Error parsing user data from localStorage", error);
            setCurrentUser(null);
          }
        }

        setIsLoading(false);
      }
    }, []);

    // Separate useEffect just for role-based redirects
    useEffect(() => {
      if (!isClient || isLoading) return;

      console.log("withAuth: Auth check running", {
        currentUser,
        pathname: window.location.pathname,
      });

      // Handle case where no user is found
      if (!currentUser) {
        console.log("withAuth: No user found, redirecting to login");
        router.push("/login");
        return;
      }

      // Skip role check if no roles are specified
      if (allowedRoles.length === 0) {
        console.log("withAuth: No specific roles required for this page");
        return;
      }

      // Check if current user has access
      const userRole = currentUser.role;
      const hasAccess = allowedRoles.includes(userRole);

      console.log(
        `withAuth: Role check - ${userRole} access to page: ${hasAccess}`
      );

      // Only redirect if user doesn't have access
      if (!hasAccess) {
        // Check if we're already on appropriate page for the role
        const currentPath = window.location.pathname;
        const isAlreadyOnCorrectPage =
          (userRole === "admin" && currentPath === "/trainer") ||
          (userRole === "user" && currentPath === "/client");

        if (isAlreadyOnCorrectPage) {
          console.log(
            "withAuth: Already on correct page for role, not redirecting"
          );
          return;
        }

        console.log(
          `withAuth: Redirecting to appropriate page for role ${userRole}`
        );
        if (userRole === "admin") {
          router.push("/trainer");
        } else if (userRole === "user") {
          router.push("/client");
        } else {
          router.push("/login");
        }
      }
    }, [isClient, isLoading, currentUser, router, allowedRoles]);

    if (isLoading) {
      return <div>Loading authentication...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  AuthComponent.displayName = `withAuth(${componentName})`;

  return AuthComponent;
}

export default withAuth;
