import styles from "./styles.module.css";
import { useState } from "react";
import { ShopOutlined } from "@ant-design/icons";
import { Typography, Row, Col, Pagination } from "antd";
import { getProductsList } from "../../pocketbase/db/products";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/Products/Card";
import LoadingProducts from "../../components/Products/Loading";
import Paginator from "../../components/Products/Paginator";

const { Title, Text } = Typography;

const Home = () => {
  const [page, setPage] = useState(1);
  const productsQuery = useQuery(["products", page], getProductsList);

  return (
    <Row justify={"center"} className={styles.main} gutter={[0, 100]}>
      <Col span={24}>
        <Row justify='center'>
          <Title level={2}>
            Welcome to our Shop <ShopOutlined />
          </Title>
        </Row>
        <Row justify={"center"}>
          <Text type='secondary'>Take a look at our products</Text>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify={"center"} wrap gutter={[20, 40]}>
          <LoadingProducts loading={productsQuery.isLoading} />
          {productsQuery.data?.items.map((product, index) => {
            return (
              <Col key={index}>
                <ProductCard product={product} />
              </Col>
            );
          })}
        </Row>
      </Col>
      <Col>
        <Row justify={"center"}>
          <Paginator
            pageSize={productsQuery.data?.perPage}
            total={productsQuery.data?.totalItems}
            page={page}
            setPage={setPage}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
