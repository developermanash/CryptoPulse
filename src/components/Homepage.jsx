import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Spin, Alert,Input } from "antd";
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News"

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching, isError, error } = useGetCryptosQuery(10);
  


  if (isFetching) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <Alert message="Error" description={error.message} type="error" />;
  }

  const stats = data?.data?.stats || {};


  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>

      {/* Display the data if it's available */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={stats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={stats.totalExchanges} />
        </Col>
        {Number(stats.totalMarketCap) > 10000 && (
          <Col span={12}>
            <Statistic title="Total Market Cap" value={millify(Number(stats.totalMarketCap))} />
          </Col>
        )}

        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(Number(stats.total24hVolume))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={stats.totalMarkets} />
        </Col>
      </Row>
      <div className="home-heading-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} className="home-title">Top 10 Cryptocurrencies In The World</Title>
        <Title level={4} className="show-more"><Link to = "/cryptocurrencies">Show-More</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className="home-heading-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={4} className="show-more"><Link to = "/news">Show-More</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;


