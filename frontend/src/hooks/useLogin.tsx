import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LOGIN_MUTATION } from "../api"; // Import from centralized API

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting Login with:", { email, password });

      const { data } = await loginMutation({ variables: { email, password } });

      console.log("Login Response Data:", data);

      if (!data || !data.login) throw new Error("Login failed");

      // Save tokens to localStorage
      localStorage.setItem("accessToken", data.login.accessToken);
      localStorage.setItem("refreshToken", data.login.refreshToken);

      // Set user in AuthContext
      setAuthUser(data.login);

      toast.success("Login successful!");
    } catch (error: any) {
      console.error("Login Error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
