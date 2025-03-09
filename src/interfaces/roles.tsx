export interface LoginForm {
  email: string;
  username: string;
  password: string;
  role: "trainer" | "client";
}
