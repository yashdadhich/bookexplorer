import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookDetail from './pages/BookDetail.jsx';

export default function App(){
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/book/:id" element={<BookDetail/>} />
        </Routes>
      </main>
    </div>
  );
}
