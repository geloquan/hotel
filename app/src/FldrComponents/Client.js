import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Pagination, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { DatePickerField } from './DatePicker';
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";
import { ClientEdit } from "./ClientEdit";
import { ClientList } from "./ClientList";
import { ClientDelete } from "./ClientDelete";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [isLoadingFetchClients, setIsLoadingFetchClients] = useState(false);
  const [isLoadingEditClients, setIsLoadingEditClients] = useState(false);
  const [isLoadingDeleteClients, setIsLoadingDeleteClients] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    fullname: '',
    address: '',
    dateofbirth: null
  });
  const [editFormData, setEditFormData] = useState({
    id: '',
    fullname: '',
    address: '',
    dateofbirth: null
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [editFormError, setEditFormError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = clients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setEditFormData({
      id: client.id,
      fullname: client.name,
      address: client.address,
      dateofbirth: client.dateofbirth
    });
    setEditErrors({});
    setEditFormError(null);
    setShowEditForm(true);
  };

  const handleDelete = (client) => {
    setSelectedClient(client);
    setShowDeleteForm(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.put("http://localhost:5048/API/WEBAPI/UpdateController/UpdateClient", {
        id: editFormData.id,
        name: editFormData.fullname,
        address: editFormData.address,
        dateofbirth: editFormData.dateofbirth
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`response ${response}`, response);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:5048/API/WEBAPI/DeleteController/DeleteClient", {id: selectedClient.id,
        name: selectedClient.name,
        address: selectedClient.address,
        dateofbirth: selectedClient.dateofbirth
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`response ${response}`, response);
      setShowDeleteForm(false);
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const fetchClients = async () => {
    setIsLoadingFetchClients(true);
    try {
      const response = await axios.get('http://localhost:5048/API/WEBAPI/ListController/Client');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoadingFetchClients(false);
    }
    setFetched(true);
  };

  useEffect(() => {
    if (showAddForm || showEditForm) {
      return; // Stop the effect if either is true
    }
    const interval = setInterval(fetchClients, 200);
  
    return () => clearInterval(interval);
  }, [showAddForm, showEditForm, fetchClients]);

  const putNewClient = async () => {
    setIsLoadingFetchClients(true);
    try {
      const response = await axios.put('http://localhost:5048/API/WEBAPI/InsertController/InsertClient', {
        name: formData.fullname,
        address: formData.address,
        dateofbirth: formData.dateofbirth
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setClients([...clients, response.data]);
      handleBackToList();
    } catch (error) {
      console.error('Error adding client:', error);
      setFormError('Failed to add client. Please try again.');
    } finally {
      setIsLoadingFetchClients(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address required';
    }
    
    if (!formData.dateofbirth) {
      newErrors.dateofbirth = 'Birth date required';
    } else {
      const dobDate = new Date(formData.dateofbirth);
      const today = new Date();
      const minAge = 18;
      const maxAge = 120;
      const age = today.getFullYear() - dobDate.getFullYear();
    
      if (isNaN(dobDate.getTime())) {
        newErrors.dateofbirth = 'Invalid date';
      } else if (age < minAge) {
        newErrors.dateofbirth = `Min ${minAge} years old`;
      } else if (age > maxAge) {
        newErrors.dateofbirth = `Max ${maxAge} years`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      putNewClient();
    }
  };

  const handleBackToList = () => {
    setShowAddForm(false);
    setFormData({
      fullname: '',
      address: '',
      dateofbirth: null
    });
    setErrors({});
    setFormError(null);
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
        <Row className="mt-3 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
            {
              showAddForm ? ("Add New Client") :
              showEditForm ? ("Edit Client") :
              showDeleteForm ? ("Delete Client") :
              "Clients"
            }
            </h2>
          </div>
        </Row>
        {
          showAddForm ? (
            <div className="p-3 border rounded">
              {formError && (
                <Alert variant="danger" className="mb-3">
                  {formError}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    isInvalid={!!errors.fullname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullname}
                  </Form.Control.Feedback>
                </Form.Group>
  
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
  
                <DatePickerField
                  label="Date of Birth"
                  value={formData.dateofbirth}
                  onChange={(date) => setFormData(prev => ({
                    ...prev,
                    dateofbirth: date ? date.toISOString().split("T")[0] : null
                  }))}
                  error={errors.dateofbirth}
                />
  
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    variant="secondary"
                    onClick={handleBackToList}
                    className="me-2"
                  >
                    Back to List
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoadingFetchClients}
                  >
                    {isLoadingFetchClients ? 'Adding...' : 'Submit'}
                  </Button>
                </div>
              </Form>
            </div>
          ) : showEditForm ? (
            <ClientEdit 
              formError={formError}
              handleEditSubmit={handleEditSubmit}
              handleEditChange={handleEditChange}
              editFormData={editFormData}
              editErrors={editErrors}
              setEditFormData={setEditFormData}
              setShowEditForm={setShowEditForm}
              isLoadingEditClients={isLoadingEditClients}
            />
          ) : showDeleteForm ? (
            <ClientDelete 
              handleDeleteConfirm={handleDeleteConfirm}
              selectedClient={selectedClient}
              setShowDeleteForm={setShowDeleteForm}
              isLoadingDeleteClients={isLoadingDeleteClients}
            />
          ) : (
            <ClientList 
              clients={clients}
              currentClients={currentClients}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              setShowAddForm={setShowAddForm}
              showDeleteForm={showDeleteForm}
              setShowDeleteForm={setShowDeleteForm}
              selectedClient={selectedClient}
              handleDeleteConfirm={handleDeleteConfirm}
              isLoadingDeleteClients={isLoadingDeleteClients}
            />
          )
        }
      </Col>
    </Row>
  );
}