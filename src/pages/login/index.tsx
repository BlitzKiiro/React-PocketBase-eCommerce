import styles from "./styles.module.css";
import coverImg from "../../assets/delivery wallpaper.jpg";
import { Link, useNavigate } from "react-router-dom";
import { loginWithPassword } from "../../pocketbase/auth";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Form,
  Input,
  message,
} from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSumbit = async (values: { email: string; password: string }) => {
    try {
      await loginWithPassword(values.email, values.password);
      console.log("authed");
      navigate("/");
    } catch (error) {
      message.error({
        content: "Wrong email or password",
      });
    }
  };

  return (
    <Layout>
      <Content className={styles.container}>
        <Row className={styles.main} justify='center' align='middle'>
          <Col span={0} md={12}>
            <img className={styles.coverConatiner} src={coverImg}></img>
          </Col>
          <Col span={24} md={12}>
            <Row justify={"center"} align={"middle"} gutter={[0, 30]}>
              <Col span={24}>
                <Row justify={"center"}>
                  <Title level={3}>Sign in to eCommerce</Title>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify={"center"}>
                  <Form
                    name='login'
                    className={styles.loginform}
                    initialValues={{ remember: true }}
                    onFinish={handleSumbit}
                  >
                    <Form.Item
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                          type: "email",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <MailOutlined className='site-form-item-icon' />
                        }
                        placeholder='Email'
                      />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className='site-form-item-icon' />
                        }
                        type='password'
                        placeholder='Password'
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                      >
                        Log in
                      </Button>
                    </Form.Item>
                    Or <Link to={"/register"}>Register Now</Link>
                  </Form>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;
