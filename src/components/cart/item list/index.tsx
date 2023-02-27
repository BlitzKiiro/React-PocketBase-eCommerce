import styles from "./styles.module.css";
import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import {
  Row,
  Col,
  Space,
  Typography,
  Image,
  InputNumber,
  Button,
  message,
} from "antd";
import { ProductRecord } from "../../../pocketbase/interfaces/products";
import { DeleteOutlined } from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemFromCart } from "../../../pocketbase/db/cart";

const { Title, Text } = Typography;

interface propTypes {
  cartItems: CartItemRecord[];
  totalItems: number;
}

const CartItemsList = ({ cartItems, totalItems }: propTypes) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const removeMutation = useMutation(removeItemFromCart);

  const handleItemRemove = (id: string, productID: string) => {
    removeMutation.mutate(
      { itemID: id, isonline: user?.isValid, productID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            "cartItems",
            user?.isValid,
            user?.model?.id,
          ]);
          message.success({ content: "Item removed from cart" });
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    );
  };

  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Space>
          <Title level={1}>Cart</Title>
          <Text type='secondary'>({totalItems} items)</Text>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 20]}>
          {cartItems.map((item, index) => {
            const product = item.expand?.item as ProductRecord;
            return (
              <Col span={24} key={index}>
                <Row key={index}>
                  <Col span={5}>
                    <Image
                      preview={false}
                      height={200}
                      src={(item.expand?.item as ProductRecord).img}
                    ></Image>
                  </Col>
                  <Col span={18}>
                    <Row justify={"space-between"}>
                      <Col span={16}>
                        <Space direction='vertical' size={50}>
                          <Space direction='vertical'>
                            <Text>{product.name}</Text>
                            <Text type='secondary'>
                              {product.amount} item(s) left
                            </Text>
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
                      </Col>
                      <Col span={4}>
                        <Space direction='vertical' align='center' size={60}>
                          <Title level={4}>
                            {product.price} <Text>EGP</Text>
                          </Title>
                          <Button
                            type='ghost'
                            onClick={() => {
                              handleItemRemove(item.id as string, item.item);
                            }}
                            loading={
                              removeMutation.isLoading &&
                              removeMutation.variables?.itemID == item.id
                            }
                            icon={<DeleteOutlined />}
                          >
                            Remove
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default CartItemsList;
