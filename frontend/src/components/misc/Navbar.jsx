import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  ActionIcon,
  Group,
  Container,
  MediaQuery,
  Burger,
  Drawer,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./NavBar.module.css";
import { useLocalStorage, useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";

const Navbar = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header
      className={
        colorScheme === "light" ? classes.headerLight : classes.headerDark
      }
    >
      <Container size="md" className={classes.inner}>
        <NavLink to="/">
          <MantineLogo size={30} />
        </NavLink>

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Group gap={5}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              Home
            </NavLink>

            {!!user && (
              <NavLink
                to="posts"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.link
                }
              >
                {" "}
                Posts
              </NavLink>
            )}

            {!!user ? (
              <NavLink className={classes.link} onClick={onLogout}>
              Logout
            </NavLink>
            ) : (
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.link
                }
              >
                Login
              </NavLink>
            )}
          </Group>
        </MediaQuery>

        <ActionIcon
          onClick={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          {colorScheme === "light" ? (
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          ) : (
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          )}
        </ActionIcon>
        
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Drawer opened={opened} onClose={toggle} position="right" size="150px">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
          >
            Home
          </NavLink>

          {!!user && (
            <NavLink
              to="posts"
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              {" "}
              Posts
            </NavLink>
          )}

          {!!user ? (
            <NavLink className={classes.link} onClick={onLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? classes.active : classes.link
              }
            >
              Login
            </NavLink>
          )}
        </Drawer>
        </MediaQuery>

        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger opened={opened} onClick={toggle} />
        </MediaQuery>

      </Container>
    </header>
  );
};

export default Navbar;
