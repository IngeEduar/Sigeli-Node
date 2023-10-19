import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Singin } from '../pages/Singin';
import { Dashboard } from '../pages/Dashboard';
import { Error404 } from '../pages/Error404';
import { Loands } from '../pages/loands/Loands';
import { LoandDetails } from '../pages/loands/LoandDetails';
import { CreateLoand } from '../pages/loands/createLoand';
import { Books } from '../pages/books/books';
import { BookDetails } from '../pages/books/BookDetails';
import { BookCreate } from '../pages/books/BookCreate';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Singin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          
          <Route path='/loands' element={<Loands />} />
          <Route path='/loands/:id' element={<LoandDetails />} />
          <Route path='/loands/new/' element={<CreateLoand />} />

          <Route path='/books' element={<Books />} />
          <Route path='/books/:isbn' element={<BookDetails />} />
          <Route path='/books/new' element={<BookCreate />} />

          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
