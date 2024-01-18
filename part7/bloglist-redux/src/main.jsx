import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import App from "./App.jsx";
import GlobalStyles from "./GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);
