import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavMenu from "../components/Layout/NavMenu";
import PageFooter from "../components/Layout/Footer";

const { Header, Footer, Sider, Content } = Layout;

const Root = () => {
  return (
    <Layout id='layout'>
      <Header id='header'>
        <NavMenu />
      </Header>
      <Layout>
        <Sider>Sider</Sider>
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
