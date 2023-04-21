import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Link from "@mui/material/Link";

import { lightPink, tiffanyBlue } from "../../utils/style";

const Footer = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation>
        <BottomNavigationAction
          icon={<LinkedInIcon sx={{ color: tiffanyBlue }} />}
          component={Link}
          href="https://www.linkedin.com/in/yukikitayama/"
          target="_blank"
          rel="noopener"
        />
        <BottomNavigationAction
          icon={<GitHubIcon sx={{ color: tiffanyBlue }} />}
          component={Link}
          href="https://github.com/yukikitayama"
          target="_blank"
          rel="noopener"
        />
        <BottomNavigationAction
          icon={<InstagramIcon sx={{ color: tiffanyBlue }} />}
          component={Link}
          href="https://www.instagram.com/mystyle_kitayama/"
          target="_blank"
          rel="noopener"
        />
        {/* <BottomNavigationAction
          icon={<FacebookIcon color="primary" />}
          component={Link}
          href="https://www.facebook.com/yuki.kitayama"
          target="_blank"
          rel="noopener"
        /> */}
        <BottomNavigationAction
          icon={<SportsTennisIcon sx={{ color: tiffanyBlue }} />}
          component={Link}
          href="https://www.usta.com/en/home/play/player-search/profile.html#?uaid=2018939333&results-eventType=ALL&results-year=all#tab=rankings"
          target="_blank"
          rel="noopener"
        />
        <BottomNavigationAction
          icon={<YouTubeIcon sx={{ color: tiffanyBlue }} />}
          component={Link}
          href="https://www.youtube.com/channel/UCF5zMl6jTJaHpyxLj66FAXw"
          target="_blank"
          rel="noopener"
        />
        {/* <BottomNavigationAction
          icon={<MusicNoteIcon color="primary" />}
          component={Link}
          href="https://open.spotify.com/user/31jfarmxyhg7qequfpzoait3aa6m"
          target="_blank"
          rel="noopener"
        /> */}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;