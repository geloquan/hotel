import React, { useState, useEffect } from "react";
import { TableTemplate } from "../FldrClass/TableTemplate";
import { AddClientModal } from "./NewClient";
import { Table, Button, Alert, Pagination, Container, Row, Col } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";

export default function Client ()  {
  const [clients, setClients] = useState([]);
  const [isLoadingFetchClients, setIsLoadingFetchClients] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddClient = () => {
    setShowModal(true);
  };
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "20%" },
    { name: "Name", selector: (row) => row.name, sortable: true, width: "20%" },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "Date of Birth", selector: (row) => row.dateofbirth, sortable: true },
  ];
  const fetchClients = async () => {
    console.log('fetchClients');
    setIsLoadingFetchClients(true);
    try {
      const response = await axios.get('http://localhost:5048/API/WEBAPI/ListController/Client', {
        method: 'GET', 
      });
      console.log("response.data ", response.data);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching income statements:', error);
    } finally {
      setIsLoadingFetchClients(false);
    }
    setFetched(true);  
  };

  useEffect(() => {
    if (!fetched) { 
      fetchClients();
    }
  }, [fetched]); 

  return (
    <Row className="">
      <SideBar />
      <Col>
        <Row className="mt-3 d-flex justify-content-between align-items-center">
          <Col xs={4}>
          
      <Button variant="primary" onClick={handleAddClient}>
        Add Client
      </Button>

      <AddClientModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
      />
          </Col>
        </Row>
        <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {
            clients.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No clients available</td>
              </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.address}</td>
                    <td>{client.dateofbirth}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </Table>
        </Row>
        <Row className="justify-content-center">
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Row>
      </Col>
    </Row>
  );
};
