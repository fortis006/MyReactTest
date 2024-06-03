import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Card, CardActions, CardContent, CardMedia, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { mockBooks } from '../api/mock.ts'; 
import { Book } from '../types'; // Add the missing import statement for the Book type
import AddBook from '../service/Addbook.tsx';
import DeleteBook from '../service/DeleteBook';

const BookList: React.FC = () => {
  const queryClient = new QueryClient();
  const [books, setBooks] = useState<Book[]>([]); // Provide the correct type for the books state variable
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State for the selected book
  const [open, setOpen] = useState(false); // State for detail dialog open
  const [openAddDialog, setOpenAddDialog] = useState(false); // State for add book dialog open
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete book dialog open

  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  const handleClickOpen = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleAddBookOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddBookClose = () => {
    setOpenAddDialog(false);
  };

  const handleDeleteBookOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteBookClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddBook = (newBook: Omit<Book, 'image'>) => {
    const newBookWithImage = {
      ...newBook,
      id: books.length + 1,
      image: 'public/IMG/default.jpg' // Placeholder image path
    };
    setBooks(prevBooks => [...prevBooks, newBookWithImage]);
  };

  const handleDeleteBook = (bookName: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.name !== bookName));
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: 4 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#921AFF',
            marginTop: 4,
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              借還書系統
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{
                  marginRight: 1,
                  backgroundColor: '#921AFF',
                  border: '1px solid #fff',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#7d1abd'
                  }
                }}
                onClick={handleAddBookOpen}
              >
                新增館藏
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#921AFF',
                  border: '1px solid #fff',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#7d1abd'
                  }
                }}
                onClick={handleDeleteBookOpen}
              >
                刪除書籍
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              marginBottom: 2,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '32px',
              color: '#408080'
            }}
          >
            書籍狀況
          </Typography>
          <Grid container spacing={4}>
            {books.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                  <CardMedia component="img" height="300" image={book.image} alt={book.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {book.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" sx={{ boxShadow: 1 }} onClick={() => handleClickOpen(book)}>
                      詳情
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </QueryClientProvider>

        {/* Detail Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>書籍詳情</DialogTitle>
          <DialogContent>
            {selectedBook && (
              <>
                <DialogContentText>書名: {selectedBook.name}</DialogContentText>
                <DialogContentText>作者: {selectedBook.author}</DialogContentText>
                <DialogContentText>借書人: {selectedBook.borrower || '未借出'}</DialogContentText>
                <DialogContentText>剩餘還書天數: {selectedBook.daysremainingtoreturn}</DialogContentText>
                <CardMedia component="img" height="200" image={selectedBook.image} alt={selectedBook.name} sx={{ marginTop: 2 }} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              關閉
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Book Dialog */}
        <AddBook open={openAddDialog} onClose={handleAddBookClose} onAddBook={handleAddBook} />

        {/* Delete Book Dialog */}
        <DeleteBook open={openDeleteDialog} onClose={handleDeleteBookClose} onDeleteBook={handleDeleteBook} />
      </Container>
    </>
  );
};

export default BookList;
