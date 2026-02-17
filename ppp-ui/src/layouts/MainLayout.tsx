import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

export default function MainLayout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="layout-main">
        <div className="effect-1" />
        <div className="effect-2" />
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>© {new Date().getFullYear()} Pocket Poker Pal</div>
        <div className="footer-links">Privacy · Terms</div>
      </footer>
    </div>
  );
}
