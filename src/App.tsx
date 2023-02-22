import "./styles/globals.css";
import "antd/dist/reset.css";
import useTheme from "./hooks/useTheme";
import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const { themeMode } = useTheme();
  const antDTheme = {
    algorithm:
      themeMode == "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antDTheme}>
      <div id='app' data-theme={themeMode}>
        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  );
}

export default App;
