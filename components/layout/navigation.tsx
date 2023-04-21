import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";

const pages = [
  { id: "expense", disabled: false },
  { id: "article", disabled: false },
  { id: "analytics", disabled: false },
  { id: "fitness", disabled: false },
  // { id: "project", disabled: true },
  { id: "login", disabled: false },
];
// const drawerItems = ["Home", "Expense", "Article", "Fitness", "Project", "Login"];
const drawerItems = ["Home", "Expense", "Article", "Analytics", "Fitness", "Login"];

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  // Show side menu in mobile
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  // Function to programmatically navigate a user to a page
  // when an item in drawer side menu is clicked
  const drawerNavigateToPageHandler = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    const page = (event.target as HTMLElement).textContent;
    if (page === "Home") {
      router.push("/");
    } else {
      router.push(`/${page!.toLowerCase()}`);
    }
  };

  // Left side drawer menu content when drawer is open
  const drawerList = (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {drawerItems.map((item) => (
          <ListItem disablePadding key={item}>
            <ListItemButton
              onClick={(event) => drawerNavigateToPageHandler(event)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={8}>
          <Toolbar disableGutters>
            {/* Avatar for desktop */}
            <Avatar
              src="/images/github_profile_photo_yuki_kitayama.jpg"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: 48,
                height: 48,
              }}
            />

            {/* Title for desktop */}
            <Link href="/" passHref>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  // color: "inherit",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Yuki&apos;s App
              </Typography>
            </Link>

            {/* Menu icon for mobile */}
            <Box sx={{ flexGrow: 0.5, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                // color="inherit"
                sx={{ color: "white" }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Drawer side menu for mobile */}
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>

            {/* Avatar for mobile */}
            <Avatar
              src="/images/github_profile_photo_yuki_kitayama.jpg"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                width: 45,
                height: 45,
              }}
            />

            {/* Title for mobile */}
            <Link href="/" passHref>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  // color: "inherit",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Yuki&apos;s App
              </Typography>
            </Link>

            {/* Menus for desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.id}
                  href={page.disabled ? "" : `/${page.id}`}
                  passHref
                >
                  <Button
                    // sx={{ my: 2, color: "inherit", display: "block" }}
                    sx={{ my: 2, color: "white", display: "block" }}
                    disabled={page.disabled}
                  >
                    {page.id}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Navigation;