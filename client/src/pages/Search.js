import React, { useState, useContext } from "react";
import axios from 'axios';
import UserContext from '../UserContext';
import { 
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Search = () => {
  const { authUser, setAuthUser } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [searchResults, setSearchResults] = useState(undefined);

  const search = async () => {
    try {
      const res = await axios.post('/search', { title, author, isbn });
      setSearchResults(res.data);
      setErrMessage('');
    } catch (e) {
      setErrMessage(e.response.data.message);
    }
  }

  const addToCart = async (bookId) => {
    try {
      const res = await axios.post('/cart/add', { 
        userId: authUser._id,
        bookId,
      });
      setAuthUser(res.data)
      alert('Added');
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  
  if (!authUser) return null;

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Search
      </Typography>
      <Card elevation={0}>
        <CardContent>
          <Grid
            container
            direction="row"
            justifycontent="center"
            alignitems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={4}>
              <TextField 
                variant="standard" label="Title" fullWidth
                value={title} 
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                variant="standard" label="Author" fullWidth 
                value={author} 
                onChange={e => setAuthor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                variant="standard" label="ISBN (10 digit number with leading zeros)" fullWidth 
                value={isbn} 
                onChange={e => setIsbn(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                variant="contained"
                onClick={search}
              >
                Search Books
              </Button>
            </Grid>            
            {errMessage && (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                {errMessage}
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      { searchResults && (
        <Card elevation={0} sx={{ mt: 2 }}> 
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ISBN</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Language</TableCell>
                <TableCell align="center">Available</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map(row => (
                <TableRow key={row._id}>
                  <TableCell>{row.isbn}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.authorName}</TableCell>
                  <TableCell>{row.language}</TableCell>
                  <TableCell align="center">{row.quantityAvailable}/{row.quantity}</TableCell>
                  <TableCell align="right">
                    {
                      row.quantityAvailable > 0 && (
                        <ShoppingCartIcon 
                          sx={{
                            "&:hover": { cursor: "pointer"},
                          }}
                          onClick={() => addToCart(row._id)}
                        />
                      )
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </>
    
  );
}

export default Search;