import './App.css';
import { Container, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import CardComponent from './Card';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
   
    email: '',
    phone: '',
    website: ''
  });

  const [apiData, setApiData] = useState([]);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreateCard = (event) => {
    event.preventDefault();
    if (formData.id) {
      const updatedUserCards = userCards.filter((card) => card.id !== formData.id);
      setUserCards(updatedUserCards);
    }

    const newCard = {
      id: Date.now(),
      ...formData
    };

    setUserCards((prevDetails) => [...prevDetails, newCard]);
    setFormData({
      id: '',
      name: '',
      username: '',
      
      email: '',
      phone: '',
      website: ''
    });
  };

  const handleDeleteCard = (cardId) => {
    const updatedUserCards = userCards.filter((card) => card.id !== cardId);
    setUserCards(updatedUserCards);

    const updatedApiData = apiData.filter((card) => card.id !== cardId);
    setApiData(updatedApiData);
  };

  const handleEdit = (editedCard) => {
    setFormData({ ...editedCard });
    handleDeleteCard(editedCard.id); 
  };

  return (
    <Container fluid>
      <div>
        <h1 className="header">Details</h1>
      </div>
      <form onSubmit={handleCreateCard}>
        <div className="userinput">
          <span><strong>Enter the details:</strong></span>
          <span><input type="text"  name="name"  placeholder="Name" value={formData.name} onChange={handleInputChange}  required /></span>
          <span><input type='text' name='username' placeholder='UserName' value={formData.username} onChange={handleInputChange} required /></span>
          <span><input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleInputChange} required /></span>
          <span><input type='tel' name='phone' placeholder='Ph-no' value={formData.phone} onChange={handleInputChange} required /></span>
          <span><input type='text' name='website' placeholder='Website' value={formData.website} onChange={handleInputChange} required /></span>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div className="flex">
        <CardComponent
          cardData={apiData}
          onDelete={handleDeleteCard}
          onEdit={handleEdit}
        />
        <CardComponent
          cardData={userCards}
          onDelete={handleDeleteCard}
          onEdit={handleEdit}
        />
      </div>
    </Container>
  );
}

export default App;

            
           
            
           
           
        