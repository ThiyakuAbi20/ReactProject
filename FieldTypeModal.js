import React from 'react';
import '../App.css'; // Ensure your styles are applied

const FieldTypeModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const fieldTypes = [
    'Multiple Choice',
    'Short Text',
    'Your Name',
    'Email',
    'Selection',
    'Phone Number',
    'Contact Information',
    'Legal',
    'Country'
  ];

  return (
    <div className="modal">
      <button className="close-button" onClick={onClose}>✖</button>
      <h2>Add Field</h2>
      <div className="field-types">
        {fieldTypes.map((type) => (
          <div key={type} className="field-type" onClick={() => {
            onSelect(type);
            onClose();
          }}>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldTypeModal;
