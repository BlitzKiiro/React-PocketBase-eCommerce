import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavMenu from "../components/Layout/NavMenu";
import PageFooter from "../components/Layout/Footer";
import SideBar from "../components/Layout/SideBar";

const { Header, Footer, Sider, Content } = Layout;

const Root = () => {
  return (
    <Layout>
      <Header id='header'>
        <NavMenu />
      </Header>
      <Layout hasSider>
        <Sider width={300} breakpoint='lg' collapsedWidth={0}>
          <SideBar />
        </Sider>
        <Content id='content'>
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
