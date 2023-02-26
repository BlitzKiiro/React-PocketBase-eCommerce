import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../pocketbase/db/cart";
import { Typography, Row, Col } from "antd";

import LoadingProducts from "../../components/Products/Loading";
import Invoice from "../../components/cart/invoice";
import CartItemsList from "../../components/cart/item list";

const { Title, Text } = Typography;

const CartPage = () => {
  const { user } = useAuth();
  const { data: cartItems, isLoading } = useQuery(
    ["cartItems", user?.isValid, user?.model?.id],
    getCartItems
  );

  return (
    <Row className={styles.main} justify={"center"}>
      <LoadingProducts loading={isLoading} />
      {cartItems && (
        <>
          <Col span={24} md={12} className={styles.list}>
            <CartItemsList cartItems={cartItems} />
          </Col>
          <Col span={24} md={8}>
            <Invoice cartItems={cartItems} />
          </Col>
        </>
      )}
    </Row>
  );
};

export default CartPage;
