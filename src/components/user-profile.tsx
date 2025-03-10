"use client";

import { useEffect } from "react";
import { useUserState, useUserActions } from "../providers/userlogin/index";

const UserProfile = () => {
  const { user, isPending, isError } = useUserState();
  const { getUser } = useUserActions();

  useEffect(() => {
    getUser(); // No argument needed
  }, []); // Add getUser as a dependency to avoid lint warnings

  useEffect(() => {
    console.log("User data:", user);
  }, [user]); // Log user data whenever it changes

  if (isPending) return <p style={{ color: "red" }}>Loading user details...</p>;
  if (isError)
    return <p style={{ color: "red" }}>Error fetching user details.</p>;
  if (!user) return <p style={{ color: "red" }}>No user data available.</p>;

  return (
    <div style={{ color: "red" }}>
      {" "}
      {/* Apply red color to everything */}
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserProfile;
