import React, { useState, useEffect } from "react";
import { TableTemplate } from "../FldrClass/TableTemplate";
import { Table, Button, Alert, Pagination, Container, Row, Col } from 'react-bootstrap';
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";

export default function Client ()  {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);


  const handleAddClient = () => {
    // Example of adding a client - you'd typically connect this to a form or modal
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <>
    <Row>
      <SideBar />
      <Col>
        <Row className="mt-3">
          <Col xs={6}>
            <Button variant="primary" onClick={handleAddClient}>
              Add Client
            </Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            <Pagination>
              {[...Array(Math.ceil(clients.length / itemsPerPage)).keys()].map(number => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Col>
    </Row>
    </>
  );
};
