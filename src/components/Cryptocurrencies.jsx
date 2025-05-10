import React, { useState, useEffect } from "react";
import millify from "millify";
import { Card, Input, Typography, Row, Col, Statistic, Spin, Alert } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching, isError, error } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (cryptoList?.data?.coins) {
      setCryptos(cryptoList.data.coins);

      const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
      setCryptos(filteredData);
    }
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <Alert message="Error" description={error.message} type="error" />;
  }

  return (
    <div>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Coin" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <Typography.Title level={2}>Coins</Typography.Title>
      {cryptos.length === 0 && (
        <Typography.Text type="secondary">No cryptocurrencies match your search.</Typography.Text>
      )}

      <Row gutter={[32, 32]}>
        {cryptos.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} style={{ width: 30 }} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
