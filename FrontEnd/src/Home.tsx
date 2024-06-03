import { SearchAppBar } from './SearchAppBar.tsx'; // 确保路径正确
import SearchBooks from './service/SearchBooks';
  
import React, { useState } from 'react'; // Add the missing import statement

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <h3>館藏查詢</h3>
      <SearchAppBar onSearch={handleSearch} />
      <SearchBooks query={searchQuery} />
    </>
  );
}

export default Home;