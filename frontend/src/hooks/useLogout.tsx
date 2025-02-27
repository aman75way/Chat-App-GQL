import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LOGOUT_MUTATION } from "../api"; // Import from centralized API

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await logoutMutation();

      if (!data || !data.logout) {
        throw new Error("Logout failed");
      }

      // Remove tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Clear Auth User
      setAuthUser(null);

      toast.success("Logged out successfully!");
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
