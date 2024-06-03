import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#673ab7',
  borderRadius: '12px', // 添加圆角
  margin: '20px 0', // 添加上下边距
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.common.white,
}));

function Appbar() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <StyledAppBar position="static">
          <StyledToolbar>
            <TitleTypography variant="h6">
              書籍狀況
            </TitleTypography>
          </StyledToolbar>
        </StyledAppBar>
      </Container>
    </>
  );
}

export default Appbar;