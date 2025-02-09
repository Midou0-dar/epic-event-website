import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Scores } from './pages/Scores';
import NotFound from './pages/NotFound'; // Import NotFound component

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
