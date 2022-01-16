import React, { useContext } from "react";
import UserContext from '../UserContext';
import { 
  Card,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import moment from "moment";

const BooksLended = () => {
  const { authUser } = useContext(UserContext);

  if (!authUser) return null;

  return (
    <>      
      <Typography variant="h4" gutterBottom component="div">
        Books Lended
      </Typography>
      <Card elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authUser.lending.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>No books in your cart</TableCell>
              </TableRow>
            )}
            {authUser.lending.map(row => (
              <TableRow key={row._id}>
                <TableCell>{row.book.isbn}</TableCell>
                <TableCell>{row.book.title}</TableCell>
                <TableCell>{row.book.author.name}</TableCell>
                <TableCell>
                  {/* show due date in local time */}
                  {moment(new Date(row.dueDate)).format("MMM D, YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>    
  );
}

export default BooksLended;