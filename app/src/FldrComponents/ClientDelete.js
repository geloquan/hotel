import React, { useState } from 'react';
import { Table, Button, Alert, Pagination, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { DatePickerField } from './DatePicker';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5";

export function ClientDelete ({
  handleDeleteConfirm,
  selectedClient,
  setShowDeleteForm,
  isLoadingDeleteClients
}) {
  return (
    <Form onSubmit={handleDeleteConfirm}>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={selectedClient?.name}
          readOnly
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={selectedClient?.address}
          readOnly
          disabled
        />
      </Form.Group>

      <DatePickerField
        label="Date of Birth"
        value={selectedClient?.dateofbirth}
        onChange={() => {}}
        disabled={true}
        error={null}
      />

      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="secondary"
          onClick={() => setShowDeleteForm(false)}
          className="me-2"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoadingDeleteClients}
        >
          {isLoadingDeleteClients ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Form>
  )
}