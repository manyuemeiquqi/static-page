import { App as AntApp } from "antd";
import router from "./router/index";
import { RouterProvider } from "react-router";
import { ConfigProvider, type ThemeConfig } from "antd";
function App() {
  const config: ThemeConfig = {
    token: {
      colorPrimary: "#2563EB",
      // https://github.com/ant-design/ant-design/issues/39560
      colorLink: "#2563EB",
    },
  };
  return (
    <ConfigProvider theme={config}>
      <AntApp>
        {/* <ChatPage /> */}
        {/* <DiseaseQuery /> */}
        {/* <DiseaseDetail /> */}
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
