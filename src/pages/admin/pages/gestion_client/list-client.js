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
import TablePagination from "@material-ui/core/TablePagination";
import BlockIcon from '@material-ui/icons/Block';
import UndoIcon from '@material-ui/icons/Undo';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';




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

export default function ListClient() {
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
                const response = await fetch(`http://localhost:5000/api/user/`);

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setlist(responseData.existinguser);
            } catch (err) {
                seterror(err.message);
            }
        };

        sendRequest();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    const handelSearch = (e) => {
        setSearchTerm(e.target.value);
    };



    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={12}>




                    <ErrorModel error={error} />
                    <SuccessModel success={success} />
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Chercher
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        onChange={handelSearch}
                    />
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell align="right">Nom</StyledTableCell>
                                    <StyledTableCell align="right">Email</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list && list.filter((val) => {
                                    if (searchTerm == "") {
                                        return val
                                    } else if (val.name.includes(searchTerm)) {
                                        return val
                                    }
                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <StyledTableRow key={row.name}>


                                        <StyledTableCell align="right">{row.name}</StyledTableCell>
                                        <StyledTableCell align="right">{row.email}</StyledTableCell>

                                        <StyledTableCell align="right">
                                            {row.bloque === "false" ? <BlockIcon style={{ color: "#ff5722" }} onClick={async (event) => {
                                                try {
                                                    let response = await fetch(
                                                        `http://localhost:5000/api/user/block/${row._id}`,
                                                        {
                                                            method: "PATCH",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                        }
                                                    );
                                                    let responsedata = await response.json();
                                                    if (!response.ok) {
                                                        throw new Error(responsedata.message);
                                                    }

                                                    setsuccess("Client bien bloqu??");
                                                } catch (err) {
                                                    console.log(err);
                                                    seterror(
                                                        err.message || "il y a un probleme"
                                                    );
                                                }
                                            }} /> : <UndoIcon style={{ color: "#66bb6a" }} onClick={async (event) => {
                                                try {
                                                    let response = await fetch(
                                                        `http://localhost:5000/api/user/unblock/${row._id}`,
                                                        {
                                                            method: "PATCH",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                        }
                                                    );
                                                    let responsedata = await response.json();
                                                    if (!response.ok) {
                                                        throw new Error(responsedata.message);
                                                    }

                                                    setsuccess("Client bien d??bloqu??");
                                                } catch (err) {
                                                    console.log(err);
                                                    seterror(
                                                        err.message || "il y a un probleme"
                                                    );
                                                }
                                            }} />}





                                            <DeleteForeverIcon style={{ color: "red" }} onClick={async (event) => {
                                                try {
                                                    let response = await fetch(
                                                        `http://localhost:5000/api/user/${row._id}`,
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
                                                    setsuccess("Client bien suprimer");
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
