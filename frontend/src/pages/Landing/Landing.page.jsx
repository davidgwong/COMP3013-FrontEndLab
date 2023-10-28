import { Title, Text, Container } from "@mantine/core";
import classes from "./Landing.page.module.css";
import useBoundStore from "../../store/Store";
import { NavLink } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";

const Landing = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };
  const [colorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Stop tumbling and{" "}
          <Text
            component="span"
            className={
              colorScheme === "light"
                ? classes.highlightLight
                : classes.highlightDark
            }
            inherit
          >
            start thumbling.
          </Text>{" "}
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            It's time to start thumbling. You'll always be amused.
          </Text>
        </Container>

        <div className={classes.controls}>
          {!!user ? (
            <NavLink to="posts" className={classes.control}>
              See posts now
            </NavLink>
          ) : (
            <NavLink to="login" className={classes.control}>
              Sign in now
            </NavLink>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Landing;
