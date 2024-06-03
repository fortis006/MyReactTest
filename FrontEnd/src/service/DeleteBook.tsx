import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface DeleteBookProps {
    open: boolean;
    onClose: () => void;
    onDeleteBook: (bookName: string) => void;
}

const DeleteBook: React.FC<DeleteBookProps> = ({ open, onClose, onDeleteBook }) => {
    const [bookNameToDelete, setBookNameToDelete] = useState('');

    const handleDeleteBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookNameToDelete(e.target.value);
    };

    const handleDeleteBookSubmit = () => {
        onDeleteBook(bookNameToDelete);
        onClose();
        setBookNameToDelete('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>刪除書籍</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="bookNameToDelete"
                    label="書名"
                    fullWidth
                    variant="standard"
                    value={bookNameToDelete}
                    onChange={handleDeleteBookChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    取消
                </Button>
                <Button onClick={handleDeleteBookSubmit} color="primary">
                    刪除
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBook;
