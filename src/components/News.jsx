import React from "react";
import { Select, Typography, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/cryptoNewsApi"; // adjust path if needed

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({simplified}) => {
  const count = simplified ? 10 : 100;
const { data, error, isLoading } = useGetNewsQuery({ topic: "cryptocurrency", count });


  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Failed to load news: {error?.error || "Unknown error"}</div>;

  return (
    <Row gutter={[24, 24]}>
      {data?.articles?.map((article, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title level={4}>{article.title}</Title>
                {article.urlToImage && (
                  <Avatar src={article.urlToImage} shape="square" size={80} />
                )}
              </div>
              <p>
                {article.description?.length > 100
                  ? `${article.description.slice(0, 100)}...`
                  : article.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <Text>{article.source?.name}</Text>
                <Text>{moment(article.publishedAt).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
