import React from 'react';
import RecentlyPlayed from '../components/played-r/recently_played';
import LibraryGrid from '../components/library-grid/library-grid';

function Home() {
  return (
    <main className="App-main-content">
      <RecentlyPlayed />      
      <LibraryGrid limit={4} /> {/* 4 juegos en grid */}
    </main>
  );
}

export default Home;
