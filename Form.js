import React, { useState } from 'react';
import FieldTypeModal from './components/FieldTypeModal'; // Ensure the path is correct
import './App.css';

const Form = () => {
  const [fields, setFields] = useState([
    { id: 1, label: 'Enter your name', type: 'text', value: '' },
    { id: 2, label: 'Enter your email', type: 'email', value: '' },
  ]);

  const [welcomeInputs, setWelcomeInputs] = useState({
    title: '',
    description: '',
    image: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showEmailInputs, setShowEmailInputs] = useState(false); // State for showing email inputs
  const [showNameInputs, setShowNameInputs] = useState(false); // State for showing name inputs
  
  // New state for first name, last name, email, and description
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [description, setDescription] = useState(''); // State for description
  const [emailError, setEmailError] = useState(''); // State for email error message

  const handleWelcomeInputChange = (e) => {
    const { name, value } = e.target;
    setWelcomeInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setWelcomeInputs((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleRemoveImage = () => {
    setWelcomeInputs((prev) => ({ ...prev, image: null }));
  };

  const handleAddField = (fieldType) => {
    const newField = {
      id: fields.length + 1,
      label: `Enter ${fieldType}`,
      type: fieldType,
      value: '',
    };
    setFields([...fields, newField]);
    setIsModalOpen(false);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const validateEmail = (email) => {
    // Simple regex for validating an email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSaveEmailInputs = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return; // Prevent saving if the email is invalid
    }
    
    console.log('Email:', email);
    console.log('Description:', description);
    
    // Clear inputs after saving
    setEmail('');
    setDescription('');
    setShowEmailInputs(false); // Hide email inputs after saving
    setEmailError(''); // Clear any previous error messages
  };

  const handleDiscardEmailInputs = () => {
    // Clear email and description inputs
    setEmail('');
    setDescription('');
    setShowEmailInputs(false); // Hide email inputs
    setEmailError(''); // Clear any previous error messages
  };

  const handleSaveNameInputs = () => {
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    
    // Clear inputs after saving
    setFirstName('');
    setLastName('');
    setShowNameInputs(false); // Hide name inputs after saving
  };

  const handleDiscardNameInputs = () => {
    // Clear first and last name inputs
    setFirstName('');
    setLastName('');
    setShowNameInputs(false); // Hide name inputs
  };

  const handleEmailClick = () => {
    setShowEmailInputs(true); // Show email input section
  };

  const handleNameClick = () => {
    setShowNameInputs(true); // Show name input section
  };

  const handleEndProcess = () => {
    // Reset all states to close all sections and clear inputs
    setWelcomeInputs({ title: '', description: '', image: null });
    
    // Clear all names and emails
    setFirstName('');
    setLastName('');
    setEmail('');
    setDescription('');

    // Hide all input sections
    setShowWelcomeScreen(false);
    setShowEmailInputs(false);
    setShowNameInputs(false);
    
   // Optionally reset fields if needed
   setFields([
     { id: 1, label: 'Enter your name', type: 'text', value: '' },
     { id: 2, label: 'Enter your email', type: 'email', value: '' },
   ]);
   
   console.log("Process ended and all fields cleared.");
};

return (
<div className="container">
      {/* Vertical Sidebar */}
      <div className="sidebar">
        {/* Horizontal Navigation Bar */}
        <div className="nav-bar">
          <a href="#dashboard">Dashboard</a>
          <a href="#demo-form">Demo Form</a>
        </div>

        <div className="nav-bar1">
          <a href="#">Content</a>
          <a href="#">Design</a>
          <a href="#">Share</a>
          <a href="#">Replies</a>
        </div>

        {/* Steps Section */}
        <div className="steps">
          <h3>Steps</h3>
          <p>Steps users will take to complete the form:</p>

          {showWelcomeScreen ? (
            <div className="welcome-screen-inputs">
              <h4>Settings</h4>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  placeholder="Insert Title"
                  value={welcomeInputs.title}
                  onChange={handleWelcomeInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  placeholder="Insert Description"
                  value={welcomeInputs.description}
                  onChange={handleWelcomeInputChange}
                />
              </label>
              <label>
                Upload Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {welcomeInputs.image && (
                <div className="image-preview">
                  <p>Uploaded Image:</p>
                  <img
                    src={URL.createObjectURL(welcomeInputs.image)}
                    alt="Uploaded"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                  <button onClick={handleRemoveImage}>Remove Image</button>
                </div>
              )}
              <div className="button-container">
                <button className="save-button" onClick={() => setShowWelcomeScreen(false)}>Save</button>
                <button className="discard-button" onClick={() => {
                    setWelcomeInputs({ title: '', description: '', image: null }); 
                    setShowWelcomeScreen(false);
                }}>Discard</button> {/* Discard functionality */}
              </div>
            </div>
          ) : (
            <>
              <button className="step-button" onClick={() => setShowWelcomeScreen(true)}>
                Welcome Screen
              </button>

              {fields.map((field) => (
                <div key={field.id} className="field-container">
                  {/* Update to handle email click */}
                  <button 
                    className="step-button" 
                    onClick={field.label === 'Enter your email' ? handleEmailClick : (field.label === 'Enter your name' ? handleNameClick : undefined)}
                  >
                    {field.label}
                  </button>
                  <button className="remove-button" onClick={() => handleRemoveField(field.id)}>✖</button>
                </div>
              ))}
              <button type="button" onClick={() => setIsModalOpen(true)} className="add-field">
                + Add Field
              </button>
              {/* End Process Button */}
              <button className="step-button" onClick={handleEndProcess}>End Process</button>

              {/* Email Input Fields when Enter Your Email is clicked */}
              {showEmailInputs && (
                <div className="welcome-screen-inputs">
                  <h4>Email Input</h4>

                  {/* Email Input Field */}
                  <label>
                    Email:
                    <input 
                      type="email" 
                      placeholder="Insert Email" 
                      value={email} 
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) {
                          setEmailError(''); // Clear error if user starts typing again
                        }
                      }} 
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>} {/* Display error message */}
                  </label>

                  {/* Description Input Field */}
                  <label>
                    Description:
                    <textarea 
                      placeholder="Insert Description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                    />
                  </label>

                  {/* Save and Discard Buttons for Email Inputs */}
                  <div className="button-container">
                    <button className="save-button" onClick={handleSaveEmailInputs}>Save</button>
                    <button className="discard-button" onClick={handleDiscardEmailInputs}>Discard</button>
                  </div>
                </div>
              )}

              {/* Name Input Fields when Enter Your Name is clicked */}
              {showNameInputs && (
                <div className="welcome-screen-inputs">
                  <h4>Name Inputs</h4>

                  {/* First Name Input Field */}
                  <label>
                    First Name:
                    <input 
                      type="text" 
                      placeholder="Insert First Name" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                    />
                  </label>

                  {/* Last Name Input Field */}
                  <label>
                    Last Name:
                    <input 
                      type="text" 
                      placeholder="Insert Last Name" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                    />
                  </label>

                  {/* Save and Discard Buttons for Name Inputs */}
                  <div className="button-container">
                    <button className="save-button" onClick={handleSaveNameInputs}>Save</button>
                    <button className="discard-button" onClick={handleDiscardNameInputs}>Discard</button> {/* Discard functionality */}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main Form Area */}
      <div className="main-area">
        <div className="main-content">
          {/* Display title and description in real-time */}
          {welcomeInputs.title && (
            <>
              <h2>{welcomeInputs.title}</h2> {/* Display title */}
            </>
          )}
          {welcomeInputs.description && (
            <>
              <p>{welcomeInputs.description}</p> {/* Display description */}
            </>
          )}

          {/* Display only the first name in real-time */}
          {firstName && (
            <>
              <h2>{firstName}</h2> {/* Display only the first name */}
            </>
          )}

          {/* Display only the last name in real-time */}
          {lastName && (
            <>
              <h2>{lastName}</h2> {/* Display only the last name */}
            </>
          )}

          {/* Display email and description in real-time if provided */}
          {email && (
            <>
              <h2>Email: {email}</h2> {/* Display email */}
            </>
          )}
          
          {description && (
            <>
              <p>Description: {description}</p> {/* Display description */}
            </>
          )}

          {/* Display uploaded image if exists */}
          {welcomeInputs.image && (
            <>
              <img
                src={URL.createObjectURL(welcomeInputs.image)}
                alt="Uploaded"
                className="uploaded-image"
              />
            </>
          )}

          {/* Start button */}
          <button className="start-button" onClick={() => console.log("Start clicked")}>Start</button>
        </div>

      </div>

      {/* Field Type Modal */}
      <FieldTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAddField}
      />
    </div>
  );
};

export default Form;