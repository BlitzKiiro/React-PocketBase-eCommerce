import "./styles/globals.css";
import "antd/dist/reset.css";
import useTheme from "./hooks/useTheme";
import { ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router";

const antTheme = {
  dark: theme.darkAlgorithm,
  light: theme.defaultAlgorithm,
};

function App() {
  const { themeMode } = useTheme();
  const queryClient = new QueryClient();
  const algorithm = antTheme[themeMode];

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ algorithm }}>
        <AppRouter />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
