import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submit = () => {
    console.log("Email", email);
    console.log("Password", password);
  };

  return (
    <Card>
      <CardHeader title="Login" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            required
            label="Email"
            value={email}
            onChange={changeEmail}
          />
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={changePassword}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={submit}>Submit</Button>
      </CardActions>
    </Card>
  );
};

export default Login;
