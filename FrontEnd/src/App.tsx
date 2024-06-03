import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; 
import Function from './Function';
import Home from './Home';
import {Button, Box} from '@mui/material';
function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
        <Box display="flex" gap={2}>
      <Button variant="contained" sx = {{backgroundColor: '00FFFF',borderRadius: '8px'}}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>讀者</Link>
      </Button>
      <Button variant="contained" sx = {{backgroundColor: '00FFFF',borderRadius: '8px'}}>
        <Link to="/Function" style={{ textDecoration: 'none', color: 'inherit' }}>管理人員</Link>
      </Button>
    </Box>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/function" element={<Function />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
