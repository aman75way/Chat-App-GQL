import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";
import { LoadingBarContainer } from "react-top-loading-bar";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<AuthContextProvider>
			<SocketContextProvider>
				<LoadingBarContainer >
					<App />
				</LoadingBarContainer>
			</SocketContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
