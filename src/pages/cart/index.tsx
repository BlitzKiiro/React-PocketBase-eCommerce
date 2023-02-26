import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../pocketbase/db/cart";
import { Typography, Row, Col } from "antd";

import LoadingProducts from "../../components/Products/Loading";
import Invoice from "../../components/cart/invoice";
import CartItemsList from "../../components/cart/item list";
import EmptyCart from "../../components/cart/empty";

const CartPage = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["cartItems", user?.isValid, user?.model?.id],
    getCartItems
  );

  return (
    <Row className={styles.main} justify={"center"}>
      <LoadingProducts loading={isLoading} />
      {data?.cartItems.length == 0 && <EmptyCart />}
      {data && data?.cartItems.length > 0 && (
        <>
          <Col span={24} md={12} className={styles.list}>
            <CartItemsList
              cartItems={data.cartItems}
              totalItems={data.totalItems}
            />
          </Col>
          <Col span={24} md={8}>
            <Invoice
              cartItems={data.cartItems}
              totalInvoice={data.totalInvoice}
              totalItems={data.totalItems}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default CartPage;
