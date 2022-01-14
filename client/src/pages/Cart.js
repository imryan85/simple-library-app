import React, { useContext, useEffect } from "react";
import axios from 'axios';
import UserContext from '../UserContext';
import useAuth from '../hooks/useAuth'
import { 
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Cart = () => {
  const { authUser, setAuthUser } = useContext(UserContext);

  const removeFromCart = async (bookId) => {
    try {
      const res = await axios.delete(`/cart/remove/${authUser._id}/${bookId}`);
      const { cart } = res.data;
      setAuthUser({
        ...authUser,
        cart,
      })
      alert('Removed');
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  if (!authUser) return null;

  return (
    <>      
      <Typography variant="h4" gutterBottom component="div">
        Cart
      </Typography>
      <Card elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Language</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authUser.cart.map(row => (
              <TableRow key={row._id}>
                <TableCell>{row.isbn}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.language}</TableCell>
                <TableCell align="right">
                  <RemoveShoppingCartIcon 
                    sx={{
                      "&:hover": { cursor: "pointer"},
                    }}
                    onClick={() => removeFromCart(row._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>    
  );
}

export default Cart;