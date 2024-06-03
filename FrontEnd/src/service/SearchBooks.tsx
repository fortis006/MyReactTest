import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { searchBooks } from '../api/searchbook.ts';
import { Book } from '../types.ts';
type SearchBooksProps = {
  query: string;
};

const CustomButton = styled(Button)({
    backgroundColor: '#1e88e5',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
    padding: '6px 12px',
    borderRadius: '8px',
  });

  const SearchBooks: React.FC<SearchBooksProps> = ({ query }) => {
    const [results, setResults] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [newBorrower, setNewBorrower] = useState('');
  
    useEffect(() => {
      const fetchBooks = async () => {
        if (query) {
          setLoading(true);
          const books = await searchBooks(query);
          setResults(books as Book[]);
          setLoading(false);
        }
      };
  
      fetchBooks();
    }, [query]);
  
    const handleClickOpen = (book: Book) => {
      setSelectedBook(book);
      setNewBorrower(book.borrower);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedBook(null);
    };
  
    const handleBorrowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewBorrower(event.target.value);
    };
  
    const handleBorrow = () => {
      if (selectedBook) {
        const updatedBooks = results.map(book => 
          book.id === selectedBook.id ? { ...book, borrower: newBorrower } : book
        );
        setResults(updatedBooks);
        handleClose();
      }
    };

    const columns: GridColDef[] = [
      { field: 'id', headerName: '書本編號', width: 150 },
      { field: 'name', headerName: '書名', width: 250 },
      { field: 'author', headerName: '作者', width: 200 },
      { field: 'borrower', headerName: '借書人', width: 200 },
      { field: 'daysremainingtoreturn', headerName: '剩餘還書天數', width: 200 },
      {
        field: 'image', headerName: '書本圖片', width: 200, renderCell: (params) => (
          <img src={params.value} alt={params.row.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        )
      },
      {
        field: 'action', headerName: '操作', width: 150, renderCell: (params) => (
          <CustomButton variant="contained" onClick={() => handleClickOpen(params.row as Book)}>
            借書
          </CustomButton>
        )
      }
    ];
  
    return (
      <Box sx={{ width: '100%', marginTop: 4 }}>
        {loading && <CircularProgress />}
        {results.length > 0 && (
          <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
            <DataGrid
              rows={results}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 }
                }
              }}
              pageSizeOptions={[5]}
            />
          </Box>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>借書</DialogTitle>
          <DialogContent>
            <DialogContentText>
              請為 {selectedBook?.name} 輸入新的借書人信息。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="借書人"
              type="text"
              fullWidth
              value={newBorrower}
              onChange={handleBorrowerChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              取消
            </Button>
            <Button onClick={handleBorrow} color="primary">
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default SearchBooks;