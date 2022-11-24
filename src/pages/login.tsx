import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const navigateToMain = () => {
    if (pass === '123') {
      navigate('/main');
    }
  }

  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Entering</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoFocus
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => navigateToMain()}>
          Enter
        </Button>
      </Modal.Footer>
    </Modal>
  )
}