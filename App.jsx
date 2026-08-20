import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import PersonalPage from './components/PersonalPage';
import PianoPage from './components/PianoPage';
import BicyclePage from './components/BicyclePage';
import VisitorCounter from './components/VisitorCounter';

function App() {
  return (
    <Router>
      <>
        <VisitorCounter />
        <Routes>
          <Route path="/" element={<PersonalPage />} />
          <Route path="/piano" element={<PianoPage />} />
          <Route path="/bicycle" element={<BicyclePage />} />
        </Routes>
        <Analytics />
      </>
    </Router>
  );
}

export default App;
