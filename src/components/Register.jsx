import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import Card from 'react-bootstrap/Card';

const Register = () => {
  return (
    <div container = "container1">
      <Card style={{ width: '18rem' }} >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
           </Form.Group>
           <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Acepto los terminos y condiciones" />
           </Form.Group>
           <Button variant="primary" type="submit">
             Submit
           </Button>
          </Form>
        </Card.Body>
      </Card>
     </div>
  );
}

export default Register;