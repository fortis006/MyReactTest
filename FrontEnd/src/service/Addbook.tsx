import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Book } from '../types'; // 确保路径正确

interface AddBookProps {
    open: boolean;
    onClose: () => void;
    onAddBook: (newBook: Omit<Book, 'image'>) => void;
}

const AddBook: React.FC<AddBookProps> = ({ open, onClose, onAddBook }) => {
    const [newBook, setNewBook] = useState<Omit<Book, 'image'>>({ id: 0, name: '', author: '', borrower: '', daysremainingtoreturn: 0 });

    const handleAddBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddBookSubmit = () => {
        onAddBook(newBook);
        onClose();
        setNewBook({ id: 0, name: '', author: '', borrower: '', daysremainingtoreturn: 0 });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>新增館藏</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="書名"
                    fullWidth
                    variant="standard"
                    value={newBook.name}
                    onChange={handleAddBookChange}
                />
                <TextField
                    margin="dense"
                    name="author"
                    label="作者"
                    fullWidth
                    variant="standard"
                    value={newBook.author}
                    onChange={handleAddBookChange}
                />
                <TextField
                    margin="dense"
                    name="borrower"
                    label="借書人"
                    fullWidth
                    variant="standard"
                    value={newBook.borrower}
                    onChange={handleAddBookChange}
                />
                <TextField
                    margin="dense"
                    name="daysremainingtoreturn"
                    label="剩餘還書天數"
                    fullWidth
                    variant="standard"
                    value={newBook.daysremainingtoreturn}
                    onChange={handleAddBookChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    取消
                </Button>
                <Button onClick={handleAddBookSubmit} color="primary">
                    新增
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBook;