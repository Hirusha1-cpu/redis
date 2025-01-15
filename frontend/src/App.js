import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
