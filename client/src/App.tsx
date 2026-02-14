import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormBuilderPage from './pages/FormBuilderPage';
// import FormFillPage from './pages/FormFillPage';
// import FormResponsesPage from './pages/FormResponsesPage';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms/new" element={<FormBuilderPage />} />
          {/* <Route path="/forms/:id/fill" element={<FormFillPage />} />
          <Route path="/forms/:id/responses" element={<FormResponsesPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
