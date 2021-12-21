import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Image } from 'react-bootstrap'
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import TablePagination from "@material-ui/core/TablePagination";



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);





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

export default function ListeProduit() {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [list, setlist] = useState();
    const [error, seterror] = useState(null);
    const [success, setsuccess] = useState(null);

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/article/`);

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setlist(responseData.existingArticle);
            } catch (err) {
                seterror(err.message);
            }
        };

        sendRequest();
    }, []);


    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={12}>
                    <Link to='/ajout-produit'>
                        <Tooltip title="Ajouter un produit" aria-label="add">
                            <Fab color="primary" className={classes.fab}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Link>
                    <ErrorModel error={error} />
                    <SuccessModel success={success} />
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Image</StyledTableCell>
                                    <StyledTableCell align="right">Nom</StyledTableCell>
                                    <StyledTableCell align="right">Stocke</StyledTableCell>
                                    <StyledTableCell align="right">Categorie</StyledTableCell>
                                    <StyledTableCell align="right">Ref</StyledTableCell>
                                    <StyledTableCell align="right">Description</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list && list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            <Image
                                                src={`http://localhost:5000/${row.image}`}
                                                roundedCircle
                                                style={{ width: "100px", height: "100px" }}
                                            />
                                        </StyledTableCell>

                                        <StyledTableCell align="right">{row.nom}</StyledTableCell>
                                        <StyledTableCell align="right">{row.stocke}</StyledTableCell>
                                        <StyledTableCell align="right">{row.categorie}</StyledTableCell>
                                        <StyledTableCell align="right">{row.ref}</StyledTableCell>
                                        <StyledTableCell align="right">{row.description}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Link to={`/update-produit/${row._id}`} >
                                                <UpdateIcon style={{ color: "green" }} />
                                            </Link>

                                            <DeleteForeverIcon style={{ color: "red" }} onClick={async (event) => {
                                                try {
                                                    let response = await fetch(
                                                        `http://localhost:5000/api/article/${row._id}`,
                                                        {
                                                            method: "DELETE",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                        }
                                                    );
                                                    let responsedata = await response.json();
                                                    if (!response.ok) {
                                                        throw new Error(responsedata.message);
                                                    }
                                                    setlist(
                                                        list.filter(
                                                            (el) => el._id !== row._id
                                                        )
                                                    );
                                                    setsuccess("article bien suprimer");
                                                } catch (err) {
                                                    console.log(err);
                                                    seterror(
                                                        err.message || "il y a un probleme"
                                                    );
                                                }
                                            }} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={list && list.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Col>

                <Col></Col>
            </Row>
        </Container>
    );
}
