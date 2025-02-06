import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Pagination, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";

export default function Rate() {
  const [rates, setRates] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [fetchedRate, setFetchedRate] = useState(false);
  const [showAddFormRate, setShowAddFormRate] = useState(false);
  const [formData, setFormData] = useState({
    price: 0.0,
    minimum: '',
    maximum: ''
  });
  const [errorsRate, setErrorsRate] = useState({});
  const [setFormErrorRateRate, setFormError] = useState(null);
  const [currentPageRate, setCurrentPageRate] = useState(1);
  const [itemsPerPageRate] = useState(10);

  const fetchRates = async () => {
    setIsLoadingFetch(true);
    try {
      const response = await axios.get('http://localhost:5048/API/WEBAPI/ListController/Rate');
      setRates(response.data);
    } catch (e) {
      console.error('Error fetching rates:', e);
      setFormError('Failed to fetch rates. Please try again later.');
    } finally {
      setIsLoadingFetch(false);
      setFetchedRate(true);
    }
  };

  useEffect(() => {
    if (!fetchedRate) {
      fetchRates();
    }
  }, [fetchedRate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.minimum) {
      newErrors.minimum = 'Start time is required';
    }
    if (!formData.maximum) {
      newErrors.maximum = 'End time is required';
    }
    if (formData.minimum && formData.maximum && formData.minimum >= formData.maximum) {
      newErrors.maximum = 'End time must be after start time';
    }
    setErrorsRate(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5048/API/WEBAPI/ListController/Rate', formData);
      setShowAddFormRate(false);
      setFormData({ price: 0.0, minimum: '', maximum: '' });
      setFetchedRate(false);
    } catch (error) {
      setFormError('Failed to add rate. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rate?')) {
      try {
        await axios.delete(`http://localhost:5048/API/WEBAPI/ListController/Rate/${id}`);
        setFetchedRate(false);
      } catch (error) {
        setFormError('Failed to delete rate. Please try again.');
      }
    }
  };

  const indexOfLastItem = currentPageRate * itemsPerPageRate;
  const indexOfFirstItem = indexOfLastItem - itemsPerPageRate;
  const currentItems = rates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(rates.length / itemsPerPageRate);

  const AddRateModal = () => (
    <Modal show={showAddFormRate} onHide={() => setShowAddFormRate(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Rate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              isInvalid={!!errorsRate.price}
            />
            <Form.Control.Feedback type="invalid">{errorsRate.price}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={formData.minimum}
              onChange={(e) => setFormData({ ...formData, minimum: e.target.value })}
              isInvalid={!!errorsRate.minimum}
            />
            <Form.Control.Feedback type="invalid">{errorsRate.minimum}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={formData.maximum}
              onChange={(e) => setFormData({ ...formData, maximum: e.target.value })}
              isInvalid={!!errorsRate.maximum}
            />
            <Form.Control.Feedback type="invalid">{errorsRate.maximum}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Add Rate</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  return (
    <Row>
      <SideBar />
      <Col md={10}>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Rate Management</h2>
            <Button onClick={() => setShowAddFormRate(true)}>Add New Rate</Button>
          </div>

          {setFormErrorRateRate && (
            <Alert variant="danger" onClose={() => setFormError(null)} dismissible>
              {setFormErrorRateRate}
            </Alert>
          )}

          {isLoadingFetch ? (
            <div>Loading...</div>
          ) : (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Price</th>
                    <th>Minimum</th>
                    <th>Maximum</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">No Rates available</td>
                      </tr>
                    ) :(currentItems.map((rate) => (
                    <tr key={rate.id}>
                      <td>{rate.id}</td>
                      <td>${rate.price.toFixed(2)}</td>
                      <td>{formatTime(rate.minimum)}</td>
                      <td>{formatTime(rate.maximum)}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(rate.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </Table>

              <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPageRate}
                    onClick={() => setCurrentPageRate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          )}
          <AddRateModal />
        </div>
      </Col>
    </Row>
  );
}