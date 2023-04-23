import Grid from "@mui/material/Grid";

import LoginForm from "../../components/login/login-form";

const LoginPage = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;