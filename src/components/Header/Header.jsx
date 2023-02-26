import React from "react";
import styles from "./Header.module.css";
import laugh from "../image/laugh.jpeg";

export default function Header() {
  return (
    <header>
      <nav>
        <img src={laugh} alt="logo" width="100px" height="90px" />
        <ul>
          <li>JOKERID</li>
        </ul>
      </nav>
    </header>
  );
}
