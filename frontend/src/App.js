// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './shared/ShareLayout';
import { LiftService } from './pages/LiftService';

function App() {
  // return <SharedLayout>APP Shared Layout</SharedLayout>;
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<LiftService />} />
      </Route>
    </Routes>
  );
}

export default App;
// <Routes>
//   <Route path="/" element={<SharedLayout />}>
//   <Route index element={<LiftService />} />
//   </Route>
//  </Routes>
