import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Pagination, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { DatePickerField } from './DatePicker';
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";

export function ClientEdit ({
  formError,
  handleEditSubmit,
  handleEditChange,
  editFormData,
  editErrors,
  setEditFormData,
  setShowEditForm,
  isLoadingEditClients
}) {
  return (
      
    <div>
    <div className="p-3">
      {formError && (
        <Alert variant="danger" className="mb-3">
          {formError}
        </Alert>
      )}
    </div>
  <Form onSubmit={handleEditSubmit}>
    <Form.Group className="mb-3">
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        type="text"
        name="fullname"
        value={editFormData.fullname}
        onChange={handleEditChange}
        isInvalid={!!editErrors.fullname}
      />
      <Form.Control.Feedback type="invalid">
        {editErrors.fullname}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Address</Form.Label>
      <Form.Control
        type="text"
        name="address"
        value={editFormData.address}
        onChange={handleEditChange}
        isInvalid={!!editErrors.address}
      />
      <Form.Control.Feedback type="invalid">
        {editErrors.address}
      </Form.Control.Feedback>
    </Form.Group>

    <DatePickerField
      label="Date of Birth"
      value={editFormData.dateofbirth}
      onChange={(date) => setEditFormData(prev => ({
        ...prev,
        dateofbirth: date
      }))}
      error={editErrors.dateofbirth}
    />

    <div className="d-flex justify-content-end mt-4">
      <Button
        variant="secondary"
        onClick={() => setShowEditForm(false)}
        className="me-2"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        disabled={isLoadingEditClients}
      >
        {isLoadingEditClients ? 'Updating...' : 'Save Changes'}
      </Button>
    </div>
  </Form>
  </div>
  )
}