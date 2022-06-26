import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import Header from './elements/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SingleNote from './pages/SingleNote'
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <AuthProvider>
            <Header />
            <Routes>
              <Route
                path="/" exact
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/note/:noteID/"
                element={
                  <PrivateRoute>
                    <SingleNote />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
