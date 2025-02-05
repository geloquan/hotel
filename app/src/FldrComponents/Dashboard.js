import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { SideBar } from "../FldrMain/SideBar";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="bg-light min-vh-100 p-0">
          <SideBar />
        </Col>
        
      </Row>
    </Container>
  );
};

export default Dashboard;
