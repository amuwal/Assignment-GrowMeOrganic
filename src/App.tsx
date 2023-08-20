import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";

// Define types and interfaces

type User = {
  username: string;
  password: string;
  email: string;
  phone?: string;
} | null;

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState<User>(storedUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("user"))
  );
  return (
    <Routes>
      <Route
        path="login"
        element={
          <LoginPage
            user={user}
            setUser={setUser}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      />
      <Route
        path="/"
        element={
          <HomePage
            user={user}
            setUser={setUser}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      />
    </Routes>
  );
};

export default App;
