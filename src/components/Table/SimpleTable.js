import React from "react";
import { AUTHOR, TITLE } from "../../util/constants";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

function createData(title, author) {
  return { title, author };
}

export default function SimpleTable(props) {
  const { books } = props;
  const classes = useStyles();

  const rows = Object.values(books).map((book) =>
    createData(book.title, book.author)
  );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{TITLE}</TableCell>
            <TableCell align="right">{AUTHOR}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
