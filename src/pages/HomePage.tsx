import React, { useEffect, useState } from "react";
import "../main.css";
import Component1 from "../components/Component1";
import Component2 from "../components/Component2";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

import { Button, Typography } from "@mui/material";

// Define types and interfaces
export type User = {
  username: string;
  password: string;
  email: string;
  phone?: string;
} | null;

type HomePageProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomePage: React.FunctionComponent<HomePageProps> = ({
  user,
  setUser,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  return isAuthenticated ? (
    <div className="text-2xl text-red ">
      <NavBar
        user={user}
        setUser={setUser}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-4">
          <Component1 />
          <Component2 />
        </div>
      </div>
    </div>
  ) : (
    <NotLoggedIn />
  );
};

const NotLoggedIn = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 1) {
        navigate("/login");
        clearInterval(interval);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval); // Cleanup the interval when unmounting
    };
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h5" gutterBottom className="mb-4">
        Login required to access the page
      </Typography>
      <Typography variant="body1" paragraph className="mb-4">
        Redirecting to login page in {countdown} seconds
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </div>
  );
};
export default HomePage;
