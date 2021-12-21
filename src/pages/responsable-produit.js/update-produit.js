import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import ErrorModel from '../../models/error-models';
import SuccessModel from '../../models/success-models';
import axios from "axios";
import { useParams } from 'react-router-dom'


const UpdateProduit = (props) => {
    const [File, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!File) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(File);
    }, [File]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        /* props.onInput(props.id, pickedFile, fileIsValid); */
    };

    const pickImageHandler = (event) => {
        filePickerRef.current.click();
    };

    const [nom, setNom] = useState()
    const [stock, setStock] = useState()
    const [categorie, setCategorie] = useState()
    const [ref, setRef] = useState()
    const [description, setDescription] = useState()
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);

    const onchange = (e) => {
        if (e.target.name === "nom") {
            setNom(e.target.value)
        } else if (e.target.name === "stock") {
            setStock(e.target.value)
        } else if (e.target.name === "categorie") {
            setCategorie(e.target.value)
        } else if (e.target.name === "ref") {
            setRef(e.target.value)
        } else if (e.target.name === "description") {
            setDescription(e.target.value)
        }
    }

    const id = useParams().id

    const submit = async (e) => {
        e.preventDefault();

        if (ref.includes("619", 0)) {



            try {
                const formData = new FormData();

                formData.append("image", File);
                formData.append("nom", nom);
                formData.append("description", description);
                formData.append("stocke", stock);
                formData.append("categorie", categorie);
                formData.append("ref", ref);


                await axios.patch(
                    `http://localhost:5000/api/article/${id}`,
                    formData
                );

                setsuccess("produit modifié avec succée");
                seterror(null)
            } catch (err) {
                seterror(err.message || "il y a un probleme");
                setsuccess(null)
            }
        } else {
            seterror("le produit doit ètre tunisien")
            setsuccess(null)

        }

    }

    return (
        <div style={{height: "100vh",}}>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={10}>
                        <ErrorModel error={error} />
                        <SuccessModel success={success} />
                        <Form onSubmit={submit}>
                            <div
                                style={{ width: "50%", marginBottom: "30px", marginTop: "20px" }}
                            >
                                <input
                                    ref={filePickerRef}
                                    style={{ display: "none" }}
                                    type="file"
                                    accept=".jpg,.png,.jpeg"
                                    onChange={pickedHandler}
                                />
                                <div>
                                    {previewUrl && (
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            rounded
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    )}


                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={pickImageHandler}
                                        style={{ marginTop: "20px" }}
                                    >
                                        Choisir une image
              </Button>
                                </div>
                                {!isValid && <p></p>}
                            </div>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control placeholder="Nom" name="nom" onChange={onchange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control placeholder="Stock" type="number" name="stock" onChange={onchange} required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Catéorie</Form.Label>
                                <Form.Control as="select" name="categorie" onChange={onchange} required>
                                    <option></option>
                                    <option>Mode</option>
                                    <option>Beauté</option>
                                    <option>Informatique</option>
                                    <option>Electroniques</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2">
                                <Form.Label>Reférence</Form.Label>
                                <Form.Control placeholder="Reférence" type="number" name="ref" onChange={onchange} required />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={5} name="description" onChange={onchange} />
                            </Form.Group>



                            <Button variant="primary" type="submit">
                                Modifier
  </Button>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}
export default UpdateProduit