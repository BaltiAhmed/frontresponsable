import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col } from "react-bootstrap";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TablePagination from "@material-ui/core/TablePagination";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/auth-context";
import { Image, Button } from "react-bootstrap";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ListDemandeRetourArticle() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const auth = useContext(Authcontext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/demandeRetourArticle/`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingDemande);
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
        <Col xs={10}>
          <ErrorModel error={error} />
          <SuccessModel success={success} />

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Image</StyledTableCell>
                  <StyledTableCell align="right">
                    Prix de commande
                  </StyledTableCell>
                  <StyledTableCell align="right">Prix article</StyledTableCell>
                  <StyledTableCell align="right">Nom</StyledTableCell>
                  <StyledTableCell align="right">Sujet</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="right">
                          <Image
                            src={`http://localhost:5000/${row.imageArticle}`}
                            roundedCircle
                            style={{ width: "100px", height: "100px" }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.prixCommande} DT
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.prixAticle} DT
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.nomArticle}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.sujet}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {!row.valider && (
                            <Button
                              variant="info"
                              onClick={async (event) => {
                                try {
                                  let response = await fetch(
                                    `http://localhost:5000/api/demandeRetourArticle/suprimerArticleCommande`,
                                    {
                                      method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        idDemande: row._id,
                                        idCommande: row.idCommande,
                                        idArticle: row.idArticle,
                                      }),
                                    }
                                  );
                                  let responsedata = await response.json();
                                  if (!response.ok) {
                                    throw new Error(responsedata.message);
                                  }

                                  setsuccess("Demande bien Valider");
                                } catch (err) {
                                  console.log(err);
                                  seterror(err.message || "il y a un probleme");
                                }
                              }}
                            >
                              Valider
                            </Button>
                          )}
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
