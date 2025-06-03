import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/cryptoNewsApi"; 
import { useGetCryptosQuery } from "../services/cryptoApi"; 

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({simplified}) => {
  const count = simplified ? 6 : 100;
   const { data:cryptoList } = useGetCryptosQuery(100);
  const [newsCategory,setNewsCategory] = useState('Cryptocurrency');
const { data, error, isLoading } = useGetNewsQuery({ newsCategory, count });


  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Failed to load news: {error?.error || "Unknown error"}</div>;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
         <Col span={24}>
          <Select
          showSearch
          className="select-news"
          placeholder = "Select a Crypto"
          optionFilterProp="children"
          onChange={(value)=> setNewsCategory(value)}
          filterOption= {(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value ="Cryptocurrency">Cryptocurrencies</Option>
            {cryptoList?.data?.coins.map((coin)=> <Option value={coin.name}>{coin.name}</Option>
            )}
         </Select>
         </Col>
      )}
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