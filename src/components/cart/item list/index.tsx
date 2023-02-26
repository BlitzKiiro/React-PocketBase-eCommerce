import styles from "./styles.module.css";
import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import { Space, Typography, Image, InputNumber } from "antd";
import { ProductRecord } from "../../../pocketbase/interfaces/products";

const { Title, Text } = Typography;

interface propTypes {
  cartItems: CartItemRecord[];
}

const CartItemsList = ({ cartItems }: propTypes) => {
  return (
    <Space direction='vertical'>
      <Space>
        <Title level={1}>Cart</Title>
        <Text type='secondary'>({cartItems.length} items)</Text>
      </Space>
      <Space direction='vertical' size={20}>
        {cartItems.map((item, index) => {
          const product = item.expand?.item as ProductRecord;
          return (
            <Space key={index} align='start' size={20}>
              <Image
                preview={false}
                height={200}
                src={(item.expand?.item as ProductRecord).img}
              ></Image>
              <Space direction='vertical'>
                <Space direction='vertical' size={30}>
                  <Text>{product.name}</Text>
                  <Title level={2}>
                    {product.price} <Text>EGP</Text>
                  </Title>
                </Space>
                <Space>
                  <InputNumber
                    defaultValue={item.quantity}
                    min={1}
                    max={product.amount}
                  />
                  <Text type='secondary' italic>
                    (selected amount)
                  </Text>
                </Space>
              </Space>
            </Space>
          );
        })}
      </Space>
    </Space>
  );
};

export default CartItemsList;
