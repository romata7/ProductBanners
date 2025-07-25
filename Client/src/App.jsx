import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Home } from './Components/Home';
import { Home } from './pages/Home';
import Registers from './components/Registers';
import MainNavbar from './Components/MainNavbar';

function App() {
  return (
    <BrowserRouter>
      <MainNavbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<Home showForm={true} />} />
          <Route path="/registros" element={<Registers />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;