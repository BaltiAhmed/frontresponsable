
import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Form } from 'react-bootstrap'
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

const ModifierRL = (props) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [error, seterror] = useState(null);
    const [success, setsuccess] = useState(null);

    const onchange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "name") {
            setName(e.target.value);
        }
    };



    const submit = async (e) => {
        e.preventDefault();

        try {
            let response = await fetch(`http://localhost:5000/api/RLivraison/${props.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,


                }),
            });
            let responsedata = await response.json();
            if (!response.ok) {
                seterror(responsedata.message)
                throw new Error(responsedata.message);
            }
            setsuccess('Modification valider')
            window.location.href = "http://localhost:3000/liste-RL"
        } catch (err) {
            console.log(err);
            seterror(err.message || "probleme!!");
        }
    };

    return (
        <>



            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modifier responsable produit {props.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ErrorModel error={error} />
                    <SuccessModel success={success} />
                    <Form onSubmit={submit}   >
                        <Form.Group controlId="formGridPassword">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom"
                                required
                                name="name"
                                onChange={onchange}
                            />
                        </Form.Group>
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


                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Valider
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModifierRL