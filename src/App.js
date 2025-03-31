import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { AuthProvider } from "./components/AuthContext"; // Import AuthContext
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure ProtectedRoute is implemented
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51O0gq3F71lqZQv1BeofSsRihCVfY63EdQT29fNod5ssZ2A3i3WKqmDjFSgCwJgfFNUuamw9nwez2TD1LAtK8mwcq00kR8VfBBc");

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider wraps the app to provide user context */}
        <Elements stripe={stripePromise}> {/* Wrap entire app with Stripe Elements */}
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            {/* Payment Route */}
          
          </Routes>
        </Elements>
      </AuthProvider>
    </Router>
  );
}

export default App;
