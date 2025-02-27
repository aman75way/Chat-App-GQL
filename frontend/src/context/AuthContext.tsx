import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../api"; // Import GraphQL Query

type AuthUserType = {
	id: string;
	fullName: string;
	email: string;
	profilePic: string;
	gender: string;
};

const AuthContext = createContext<{
	authUser: AuthUserType | null;
	setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
	isLoading: boolean;
}>({
	authUser: null,
	setAuthUser: () => {},
	isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
	const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage

	const { data, loading, error } = useQuery(GET_ME, {
		fetchPolicy: "network-only", // Always fetch fresh data from server
		skip: !accessToken, // Skip query if no token
		context: {
			headers: {
				Authorization: `Bearer ${accessToken}`, // Ensure token is sent
			},
		},
	});

	// Debugging logs
	// console.log("Fetching user with accessToken:", accessToken);
	// console.log("GraphQL Response:", data, "Loading:", loading, "Error:", error);

	useEffect(() => {
		if (error) {
			console.error("Auth Fetch Error:", error);
			toast.error("Session expired, please log in again.");
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			setAuthUser(null);
		}

		if (data && data.me) {
			setAuthUser(data.me);
		}
	}, [data, error]);

	return (
		<AuthContext.Provider value={{ authUser, isLoading: loading, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
