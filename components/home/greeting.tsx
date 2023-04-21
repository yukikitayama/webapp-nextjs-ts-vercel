import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Greeting = () => {
  return (
    <Box my={{ xs: 17, md: 20 }}>
      <Typography
        align="center"
        variant="h5"
        color="secondary"
        sx={{ fontFamily: "Roboto Serif, serif", fontWeight: 300 }}
      >
        Welcome to
      </Typography>
      <Typography
        align="center"
        variant="h3"
        color="primary"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          letterSpacing: ".5rem",
        }}
      >
        Yuki&apos;s App
      </Typography>
    </Box>
  );
};

export default Greeting;
