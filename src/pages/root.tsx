import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavMenu from "../components/Layout/NavMenu";
import PageFooter from "../components/Layout/Footer";
import SideBar from "../components/Layout/SideBar";

const { Header, Footer, Sider, Content } = Layout;

const Root = () => {
  return (
    <Layout id='layout'>
      <Header id='header'>
        <NavMenu />
      </Header>
      <Layout hasSider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer>
        <PageFooter />
      </Footer>
    </Layout>
  );
};

export default Root;
