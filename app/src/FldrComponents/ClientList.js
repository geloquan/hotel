import React, { useState } from 'react';
import { Table, Button, Alert, Pagination, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { DatePickerField } from './DatePicker';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5";
/**
 * ClientList component displays a list of clients with pagination and actions for editing and deleting.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {Array<Object>} props.clients - The full list of clients.
 * @param {Array<Object>} props.currentClients - The currently displayed clients based on pagination.
 * @param {Function} props.handleEdit - Function to handle editing a client.
 * @param {Function} props.handleDelete - Function to initiate deleting a client.
 * @param {number} props.totalPages - Total number of pages available.
 * @param {number} props.currentPage - The current active page number.
 * @param {Function} props.handlePageChange - Function to handle pagination changes.
 * @param {Function} props.setShowAddForm - Function to toggle the add form visibility.
 * @param {Object} props.showDeleteForm - Object representing the state of the delete confirmation form.
 * @param {Function} props.setShowDeleteForm - Function to update the delete confirmation form visibility.
 * @param {Object} props.selectedClient - The currently selected client for deletion or editing.
 * @param {Function} props.handleDeleteConfirm - Function to confirm deletion of a client.
 * @param {boolean} props.isLoadingDeleteClients - Boolean indicating if clients are being deleted.
 * @returns {JSX.Element} The rendered ClientList component.
 */
export function ClientList({
  clients,
  currentClients,
  handleEdit,
  handleDelete,
  totalPages,
  currentPage,
  handlePageChange,
  setShowAddForm,
  showDeleteForm,
  setShowDeleteForm,
  selectedClient,
  handleDeleteConfirm,
  isLoadingDeleteClients
}) {

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No clients available</td>
            </tr>
          ) : (
            currentClients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.address}</td>
                <td>{client.dateofbirth}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(client)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(client)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Row className="d-flex justify-space-between align-items-center w-100">
        <Pagination className="d-flex align-items-center">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Button className="align-items-end" variant="primary" onClick={() => setShowAddForm(true)}>
            Add Client
          </Button>
        </Pagination>
      </Row>
    </>
  );
}