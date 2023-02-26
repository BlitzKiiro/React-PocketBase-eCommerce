import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import { ProductRecord } from "../../../pocketbase/interfaces/products";
import { Card, Row, Col, Typography, Space, Divider, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface propTypes {
  cartItems: CartItemRecord[];
}

const getTotalInvoice = (cartItems: CartItemRecord[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += (item.expand?.item as ProductRecord).price * item.quantity;
  });
  return total;
};

const Invoice = ({ cartItems }: propTypes) => {
  return (
    <Card>
      <Row align={"middle"} gutter={[0, 100]}>
        <Col span={24}>
          <Row justify={"space-between"}>
            <Space>
              <Title level={2}>Total </Title>
              <Text type='secondary' strong={false}>
                (Inclusive of VAT)
              </Text>
            </Space>

            <Title level={2}>{getTotalInvoice(cartItems)} EGP</Title>
          </Row>
          <Divider />
          <Row justify={"space-between"}>
            <Text type='secondary'>Subtotal ({cartItems.length} items)</Text>

            <Text>{getTotalInvoice(cartItems)} EGP</Text>
          </Row>
          <Row justify={"space-between"}>
            <Text type='secondary'>Shipping</Text>

            <Text strong type='success'>
              Free
            </Text>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify={"center"}>
            <Button type='primary' size='large' icon={<ShoppingOutlined />}>
              Check Out
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Invoice;
