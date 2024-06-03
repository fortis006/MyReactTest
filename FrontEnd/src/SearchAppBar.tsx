//引入了 React 库及其 useState 钩子，Material-UI 库中的样式工具 styled 和 alpha，以及所需的 Material-UI 组件。
import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

// 使用 styled 函数创建自定义样式的组件：
// Search 是搜索栏的容器。
// SearchIconWrapper 是用于包含搜索图标的容器。
// StyledInputBase 是用于输入框的自定义样式。

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

type SearchAppBarProps = {
  onSearch: (query: string) => void;
};

export function SearchAppBar({ onSearch }: SearchAppBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"  // 修改标题大小
          noWrap
          component="div"
          sx={{ flexGrow: 1, backgroundColor: '#1e88e5', borderRadius: 1 }}
        >
          Search Book
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}