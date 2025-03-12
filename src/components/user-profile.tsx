"use client";

import { useEffect } from "react";
import { useUserState, useUserActions } from "../providers/userlogin/index";

const UserProfile = () => {
  const { user, isPending, isError } = useUserState();
  const { getUser } = useUserActions();

  useEffect(() => {
    getUser();
  }, []);

  if (isPending) return <p style={{ color: "red" }}>Loading user details...</p>;
  if (isError)
    return <p style={{ color: "red" }}>Error fetching user details.</p>;
  if (!user) return <p style={{ color: "red" }}>No user data available.</p>;

  return (
    <div style={{ color: "red" }}>
      <h2>User Profile</h2>
      <strong>Name:</strong> {user.name}
      <strong>Role:</strong> {user.role}
      <strong>Email:</strong> {user.email}
      <strong>id:</strong> {user.id}
    </div>
  );
};

export default UserProfile;
