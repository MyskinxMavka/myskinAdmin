import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Route,
  Routes,
} from 'react-router-dom';

import { LoadingProvider } from "./context/LoadingContext";
import { Login } from './pages/login';
import { Main } from './pages/main';

function App() {
  
  return (
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </LoadingProvider>
  );
}

export default App;
