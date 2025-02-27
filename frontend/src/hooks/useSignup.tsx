import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { SIGNUP_MUTATION, mutateFn } from "../api"; // Import utility function

interface SignupInputs {
	fullName: string;
	email: string;
	password: string;
	gender: string;
}

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async (inputs: SignupInputs) => {
		try {
			console.log("Signup Inputs:", inputs);
			setLoading(true);

			const data = await mutateFn(SIGNUP_MUTATION, inputs);
			console.log("Signup Response Data:", data);

			if (!data || !data.signup) throw new Error("Signup failed");

			// Save tokens to localStorage
			localStorage.setItem("accessToken", data.signup.accessToken);
			localStorage.setItem("refreshToken", data.signup.refreshToken);

			// Set user in AuthContext
			setAuthUser(data.signup);

			toast.success("Signup successful!");
		} catch (error: any) {
			console.error("Signup Error:", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;
