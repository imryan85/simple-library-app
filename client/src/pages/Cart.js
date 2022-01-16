import React, { useContext, useState } from "react";
import axios from 'axios';
import UserContext from '../UserContext';
import { 
  Card,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Cart = () => {
  const { authUser, setAuthUser } = useContext(UserContext);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const removeFromCart = async (bookId) => {
    try {
      const res = await axios.delete(`/cart/remove/${authUser._id}/${bookId}`);
      setAuthUser(res.data);
      alert('Removed');
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const checkout = async () => {
    setIsCheckingOut(true);

    try {
      const res = await axios.post(`/checkout/queue`, { userId: authUser._id });
      setAuthUser(res.data);
      alert("Order placed");
    } catch (e) {
      alert(e.response.data.message);
    } finally {
      setIsCheckingOut(false);
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
            {authUser.cart.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>No books in your cart</TableCell>
              </TableRow>
            )}
            {authUser.cart.map(row => (
              <TableRow key={row._id}>
                <TableCell>{row.isbn}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.author.name}</TableCell>
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
      {authUser.cart.length > 0 && (
        <>        
          <Divider sx={{ mt: 4, mb: 4 }} />
          <Button variant="contained" 
            disabled={isCheckingOut}
            onClick={checkout}
          >
            {isCheckingOut ? "Placing Order ..." : "Checkout"}
          </Button>
        </>
      )}
    </>    
  );
}

export default Cart;