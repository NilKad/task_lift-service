import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './shared/ShareLayout';
import { LiftService } from './pages/LiftService';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5001/api';
axios.defaults.baseURL = 'https://lift-service.onrender.com/api';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<LiftService />} />
      </Route>
    </Routes>
  );
}

export default App;
