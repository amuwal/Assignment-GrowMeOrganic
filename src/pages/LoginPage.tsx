import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

// Define types and interfaces
type User = {
  username: string;
  password: string;
  email: string;
  phone?: string;
} | null;

type LoginProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

// Define your component
const LoginPage: React.FunctionComponent<LoginProps> = ({
  user,
  setUser,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  return isAuthenticated ? (
    <AlreadyLoggedIn user={user?.username} />
  ) : (
    <NewUserLogin setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
  );
};

const AlreadyLoggedIn = ({ user }: { user: string | undefined }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 1) {
        clearInterval(interval);
        navigate("/");
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval); // Cleanup the interval when unmounting
    };
  }, [countdown, navigate]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Typography variant="h5" gutterBottom className="mb-4">
          Already logged in as {user}
        </Typography>
        <Typography variant="body1" paragraph className="mb-4">
          Redirecting to home page in {countdown} seconds
        </Typography>
      </div>
    </div>
  );
};

const NewUserLogin = ({
  setUser,
  setIsAuthenticated,
}: {
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else {
      newErrors.username = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else {
      newErrors.phone = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    if (isValid) {
      localStorage.setItem("user", JSON.stringify(formData));
      setIsAuthenticated(true);
      setUser(formData);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-4 space-y-4 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.username
                ? "border border-red-500"
                : "border border-gray-300"
            }`}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border border-red-500" : "border border-gray-300"
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.phone ? "border border-red-500" : "border border-gray-300"
            }`}
            placeholder="Phone"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password
                ? "border border-red-500"
                : "border border-gray-300"
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
