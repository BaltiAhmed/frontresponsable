import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import { Authcontext } from '../context/auth-context'

const LoginRP = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const auth = useContext(Authcontext)

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/RLivraison/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password

        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      console.log(responsedata.Rlivraison)

      if (responsedata.Rlivraison.type === "RP") {
        auth.RPLogin(responsedata.Rlivraison._id, responsedata.token)
      }else if(responsedata.Rlivraison.type === "RL"){
        auth.RLLogin(responsedata.Rlivraison._id, responsedata.token)
      }

      window.location.href = "http://localhost:3000/";
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <ErrorModel error={error} />
      <SuccessModel success={success} />
      <Form onSubmit={submit}   >
        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrer email"
            required
            name="email"
            onChange={onchange}
          />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            required
            name="password"
            onChange={onchange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginRP;
