import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./redux/store";
import App from "./App.jsx";
import GlobalStyles from "./GlobalStyles";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={client}>
		<Provider store={store}>
			<Router>
				<GlobalStyles />
				<App />
			</Router>
		</Provider>
	</QueryClientProvider>
);
