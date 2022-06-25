import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './elements/Header'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SingleNote from './pages/SingleNote'
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <div className="container dark">
      <div className="App">
        <Router>
          <AuthProvider>
            <Header />
            <Routes>
              <Route 
                path="/"
                element = {
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/note/:noteID/"
                element = {
                  <PrivateRoute>
                    <SingleNote />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App
