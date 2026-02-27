import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalPage from './components/PersonalPage';
import PianoPage from './components/PianoPage';
import BicyclePage from './components/BicyclePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalPage />} />
        <Route path="/piano" element={<PianoPage />} />
        <Route path="/bicycle" element={<BicyclePage />} />
      </Routes>
    </Router>
  );
}

export default App;
