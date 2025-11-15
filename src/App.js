import './App.css';
import Header from './components/Header/Header';
import Naw from './components/Naw/Naw';
import RecentlyPlayed from './components/played-r/recently_played';
import LibraryGrid from './components/library-grid/library-grid';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <Naw />
        <main className="App-main-content">
          <RecentlyPlayed />      
          <LibraryGrid />
        </main>
      </div>
    </div>
  );
}

export default App;
