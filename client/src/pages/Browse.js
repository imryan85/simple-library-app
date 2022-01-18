import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import UserContext from '../UserContext';
import { 
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Browse = () => {
  const { authUser, setAuthUser } = useContext(UserContext);

  const [tab, setTab] = React.useState(0);
  const [categories, setCategories] = useState(undefined);
  const [authors, setAuthors] = useState(undefined);
  const [books, setBooks] = useState(undefined);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(`/category`);
      setCategories(res.data);
    }
    const getAuthors = async () => {
      const res = await axios.get(`/author`);
      setAuthors(res.data);
    }
    getCategories();
    getAuthors();
  }, [])

  const loadBooks = async (browseBy, id) => {
    try {
      const res = await axios.get(`/${browseBy}/${id}/books`);
      setBooks(res.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const addToCart = async (bookId) => {
    try {
      const res = await axios.post('/cart/add', { 
        userId: authUser._id,
        bookId,
      });
      setAuthUser(res.data);
      alert('Added');
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  if (!authUser) return null;

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Browse
      </Typography>      
      <Grid
        container
        direction="row"
        justifycontent="center"
        alignitems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={4}>
          <Card elevation={0}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  centered
                  value={tab} 
                  onChange={(e, val) => setTab(val)}
                >
                  <Tab label="Categories" />
                  <Tab label="Authors" />
                </Tabs>
              </Box>
              <TabPanel value={tab} index={0}>
                <List dense={true}>
                  {categories ? (
                    <>
                    {
                      categories.map(item => (
                        <ListItemButton onClick={() => loadBooks('category', item._id)}>
                          <ListItemText primary={item.category} />
                        </ListItemButton>
                      ))
                    }
                    </>
                  ) : (
                    <ListItem>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  )}
                </List>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <List dense={true}>
                  {authors ? (
                    <>
                    {
                      authors.map(author => (
                        <ListItemButton onClick={() => loadBooks('author', author._id)}>
                          <ListItemText primary={author.name}/>
                        </ListItemButton>
                      ))
                    }
                    </>
                  ) : (
                    <ListItem>
                      <ListItemText primary="Loading..." />
                    </ListItem>
                  )}
                </List>
              </TabPanel>
            </CardContent>
          </Card>          
        </Grid>
        <Grid  item xs={12} sm={8}>
          {
            books && (
              <Card elevation={0}> 
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
                    {books.map(row => (
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
            )
          }

        </Grid>
      </Grid>
    </>
    
  );
}

export default Browse;