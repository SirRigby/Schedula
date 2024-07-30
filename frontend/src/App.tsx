import TopAppBar from "./components/TopAppBar";
import "./App.css";
import MainBox from "./components/MainBox";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryclient = new QueryClient();
  return (
    <>
      <Auth0Provider
        domain="dev-s1yjbb04qblun5or.us.auth0.com"
        clientId="4ubIx4nStmt8faEeeMnTC8eJh2uBY8fh"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <QueryClientProvider client={queryclient}>
          <TopAppBar />
          <MainBox />
        </QueryClientProvider>
      </Auth0Provider>
    </>
  );
}

export default App;
