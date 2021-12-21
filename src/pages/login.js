
import { useState } from "react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import LoginRL from "../components/loginRL";
import LoginRP from "../components/loginRP";
import image from "../images/image.jpg"

const Login = () => {
  const [element, setElement] = useState(<LoginRP />);


  return (
    <div style={{marginTop:"5%",height: "100vh", }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Card className="text-center">
              <Card.Header>
                Connextion responsable
              </Card.Header>
            </Card>
            <Card>
              <Card.Body>{element}</Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
