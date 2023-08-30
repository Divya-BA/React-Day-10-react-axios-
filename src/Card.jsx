import React from 'react';
import { Card, Button } from 'react-bootstrap';

function CardComponent({ cardData, onDelete, onEdit }) {
  return (
    <>
      {cardData.map((item) => (
        <Card key={item.id} style={{ width: '27rem' }}>
          <Card.Body>
            <Card.Title>
              <h2>{item.name}</h2>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {item.username}
            </Card.Subtitle>
            <Card.Text><h4>E-mail:</h4>{item.email}</Card.Text>
            <Card.Text><h4>Ph-no:</h4>{item.phone}</Card.Text>
            <Card.Text><h4>Wedsite:</h4>{item.website}</Card.Text>
            <div>
              <span>
                <Button
                  variant="outline-warning"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>{' '}
              </span>
              <span>
                <Button variant="outline-danger" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </span>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default CardComponent;
