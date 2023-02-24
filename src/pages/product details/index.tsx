import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Image, Typography, Button } from "antd";
import { getProdcutByID } from "../../pocketbase/db/products";
import { ShoppingCartOutlined } from "@ant-design/icons";
import LoadingProducts from "../../components/Products/Loading";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const productQuery = useQuery(["product", id!], getProdcutByID);

  return (
    <Row className={styles.main} justify={"end"} gutter={[50, 0]}>
      <LoadingProducts loading={productQuery.isLoading} />
      {productQuery.data && (
        <>
          <Col>
            <div className={styles.details}>
              <Text strong>{productQuery.data?.name}</Text>
              <Text className={styles.price} strong>
                EGP {productQuery.data?.price}
              </Text>
              <Text italic type='secondary'>
                {productQuery.data?.amount} pieces left{" "}
              </Text>
              <Button
                icon={<ShoppingCartOutlined />}
                className={styles.cart}
                size='large'
                type='primary'
              >
                Add to cart
              </Button>
            </div>
          </Col>
          <Col>
            <Image src={productQuery.data?.img}></Image>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProductDetails;
