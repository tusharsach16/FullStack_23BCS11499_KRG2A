import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Counter from './pages/Counter';
import Form from './pages/Form';
import Home from './pages/Home'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
