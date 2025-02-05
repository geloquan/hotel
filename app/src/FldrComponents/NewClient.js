import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { DatePickerField } from './DatePicker';
import axios from "axios";

export function AddClientModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dateofbirth: null
  });

  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [isLoadingFetchClients, setIsLoadingFetchClients] = useState(false);
  const [fetchedClients, setFetchedClients] = useState(false);

  
  const putNewClient = async () => {
    console.log('postNewClient');
    setIsLoadingFetchClients(true);
    try {
      let body = {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        dateofbirth: formData.dateofbirth
      }
      const response = await axios.put('http://localhost:5048/API/WEBAPI/InsertController/InsertClient', {
        name: "laryne Quanico",
        address: "Block 5 Lot 1",
        dateofbirth: "2003-06-02T00:00:00.000Z"
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });      
      console.log("response.data ", response.data);
      setClients(clients.push(response.data));
    } catch (error) {
      console.error('Error fetching income statements:', error);
    } finally {
      setIsLoadingFetchClients(false);
    }
    setFetchedClients(true);  
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name required';
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
    
    if (Object.keys(newErrors).length > 0) {
      setFormError('Please correct the highlighted errors');
      return false;
    }
    
    setFormError(null);
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submission logic
      onHide();
    }
  };

  const onReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      dateofbirth: null
    });
    setErrors({});
    setFormError(null);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formError && (
          <Alert variant="danger" className="mb-3">
            {formError}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
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
              dateofbirth: date
            }))}
            error={errors.dateofbirth}
          />

          <div className="d-flex justify-content-end">
            <Button 
              variant="secondary" 
              onClick={onReset} 
              className="me-2"
            >
              Reset
            </Button>
            <Button 
              variant="secondary" 
              onClick={onHide} 
              className="me-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={
                !formData.firstName || 
                !formData.lastName || 
                !formData.address || 
                !formData.dateofbirth
              }
              onClick={putNewClient}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}