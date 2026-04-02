import React from "react";
import { NavLink } from "react-router";
export default function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>MySite</h2>

      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Home</NavLink>
        <NavLink to="/login" style={styles.link}>Login</NavLink>
        <NavLink to="/register" style={styles.link}>Register</NavLink>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#222",
  },
  logo: {
    color: "white",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
};