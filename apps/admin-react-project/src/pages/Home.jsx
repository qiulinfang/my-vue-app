import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const Home = () => (
  <div>
    <h1>仪表盘</h1>
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic
            title="活跃用户"
            value={112893}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="人"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="本月销售额"
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div>
);

export default Home;
