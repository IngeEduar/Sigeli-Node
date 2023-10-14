import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Singin } from '../pages/Singin';
import { Dashboard } from '../pages/Dashboard';
import { Error404 } from '../pages/Error404';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Singin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
