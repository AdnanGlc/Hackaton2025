import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import Products from './pages/Products';
import Profile from "./pages/Profile";
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without Navbar */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/RecipeDetail/:id" element={<RecipeDetail />} />

        {/* Protected routes with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
