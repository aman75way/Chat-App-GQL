import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { LoadingBarContainer } from "react-top-loading-bar";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api"; // Ensure Apollo Client is properly imported

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ApolloProvider client={client}>  {/* Wrap ApolloProvider */}
		<BrowserRouter>
			<AuthContextProvider>
				<LoadingBarContainer>
					<App />
				</LoadingBarContainer>
			</AuthContextProvider>
		</BrowserRouter>
	</ApolloProvider>
);
