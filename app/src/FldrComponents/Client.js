import React, { useState, useEffect } from "react";
import { TableTemplate } from "../FldrClass/TableTemplate";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Card,
  Container,
} from "react-bootstrap";
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";

export default function Client ()  {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "20%" },
    { name: "Name", selector: (row) => row.name, sortable: true, width: "20%" },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "Date of Birth", selector: (row) => row.dateofbirth, sortable: true },
  ];
  const fetchIncomeStatements = async () => {
    console.log('fetchIncomeStatements');
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5048/API/WEBAPI/ListController/Client', {
        method: 'GET',  // This is redundant because it's a GET request by default
      });
      console.log("response.data ", response.data);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching income statements:', error);
    } finally {
      setIsLoading(false);
    }
    setFetched(true);  // Set fetched to true once data is fetched
  };

  useEffect(() => {
    if (!fetched) {  // Avoid infinite loop by only calling fetch if not already fetched
      fetchIncomeStatements();
    }
  }, [fetched]);  // Dependency array ensures fetchIncomeStatements is called only when fetched changes

  return (
    <Container fluid>
      <Row className="h-100">
        <Col md={3} lg={2} className="bg-light p-0 min-vh-100">
          <SideBar />
        </Col>
      </Row>
    </Container>
  );
};
