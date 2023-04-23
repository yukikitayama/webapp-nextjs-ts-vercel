import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import { login, logout } from "../../store/auth-slice";
import { calculateRemainingTime } from "../../utils/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cognitoUser, setCognitoUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const formSubmissionHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    const poolData = {
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    };
    const userPool = new CognitoUserPool(poolData);
    const authenticationData = {
      Username: email!,
      Password: password!,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email!,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    setCognitoUser(cognitoUser);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();

        // Type: number, unit: second, meaning: Datetime when the ID expires
        // By default, expires in 1 hour
        // https://github.com/aws-amplify/amplify-js/blob/master/packages/amazon-cognito-identity-js/src/CognitoJwtToken.js
        const exp = result.getAccessToken().getExpiration();
        const expirationTime = new Date(exp * 1000);

        // Update state
        localStorage.setItem("token", accessToken);
        localStorage.setItem("expirationTime", expirationTime.toISOString());

        dispatch(login(accessToken));

        const remainingTime = calculateRemainingTime(
        expirationTime.toISOString()
        );

        // Set auto logout timer
        setTimeout(logoutHandler, remainingTime);

        setIsLoading(false);
        router.push("/expense");
      },
      onFailure: function (err) {
        setIsLoading(false);
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  // Used to set auto-logout timer
  const logoutHandler = useCallback(async () => {
    try {
      cognitoUser.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      dispatch(logout());
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }, [dispatch]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <Card>
        <CardHeader title="Login" />
        <CardContent>
          <Stack spacing={1}>
            <TextField
              label="Email"
              variant="outlined"
              required
              helperText="Required"
              onChange={emailChangeHandler}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              helperText="Required"
              onChange={passwordChangeHandler}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ m: 1 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: { xs: "100%", md: "30%" } }}
          >
            Login
          </Button>
        </CardActions>
        {isLoading && <LinearProgress />}
      </Card>
    </form>
  );
};

export default LoginForm;
