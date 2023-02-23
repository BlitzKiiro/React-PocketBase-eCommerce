import "./styles/globals.css";
import "antd/dist/reset.css";
import useTheme from "./hooks/useTheme";
import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";

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
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
