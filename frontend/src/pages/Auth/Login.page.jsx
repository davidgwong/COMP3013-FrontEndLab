import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

import classes from "./Login.page.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <Container size={420} my={40}>
      <form onSubmit={onLogin}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            type="email"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
            type="password"
            required
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>

        {authLoading ? <h2>Loading...</h2> : null}
      </form>
    </Container>
  );
};

export default LoginPage;
