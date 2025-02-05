import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export function DatePickerField({ 
  label, 
  value, 
  onChange, 
  error,
  maxDate = new Date(),
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 120))
}) {
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : null;
    onChange(selectedDate);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="date"
        value={formatDate(value)}
        onChange={handleChange}
        max={formatDate(maxDate)}
        min={formatDate(minDate)}
        isInvalid={!!error}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}