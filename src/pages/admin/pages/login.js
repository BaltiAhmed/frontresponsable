
import { useState } from "react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import LoginC from "../components/login";

const Login = () => {


  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Card className="text-center">
              <Card.Header>
                Connexion admin
              </Card.Header>
            </Card>
            <Card>
              <Card.Body><LoginC /></Card.Body>
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
