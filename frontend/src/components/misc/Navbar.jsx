import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { ActionIcon, Group, Container, Burger, Drawer } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./NavBar.module.css";
import { useLocalStorage, useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

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
            <h4 className="logout" onClick={onLogout}>
              Logout
            </h4>
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

          <ActionIcon
            onClick={() =>
              setColorScheme(colorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            {colorScheme === "light" ? (
              <IconSun
                className={cx(classes.icon, classes.light)}
                stroke={1.5}
              />
            ) : (
              <IconMoon
                className={cx(classes.icon, classes.dark)}
                stroke={1.5}
              />
            )}
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
};

export default Navbar;
