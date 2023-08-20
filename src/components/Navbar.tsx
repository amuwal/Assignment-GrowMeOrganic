import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type User = {
  username: string;
  password: string;
  email: string;
  phone?: string;
} | null;

type NavBarProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar: React.FC<NavBarProps> = ({
  user,
  setUser,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className="bg-blue-500 flex">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          The Logo
        </Typography>

        {isAuthenticated ? (
          // Display profile picture, username, and logout button if authenticated
          <div className="flex items-center space-x-2">
            <Avatar
              alt="Profile Picture"
              src="https://img.freepik.com/free-icon/girl_318-201472.jpg?size=626&ext=jpg&ga=GA1.2.731636906.1686562964&semt=ais"
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="subtitle1" className="text-white">
              {user?.username}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <ExpandMoreIcon className="text-white" />{" "}
              {/* Use ExpandMoreIcon */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          // Display nothing if not authenticated
          <div></div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
