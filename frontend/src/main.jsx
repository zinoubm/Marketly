import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      {/* <QueryClientProvider client={queryClient}> */}
        
          <App />
        
      {/* </QueryClientProvider> */}
    </BrowserRouter>
  </GoogleOAuthProvider>
);
