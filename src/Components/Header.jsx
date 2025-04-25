import React from "react";
import logoImg from "../assets/logo512.png";
export default function Header() {
  return (
    <header className="app-header">
      <img src={logoImg} alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}
