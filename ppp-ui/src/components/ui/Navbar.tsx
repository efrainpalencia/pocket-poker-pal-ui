import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../../assets/ppp-logo-dark.svg";
import logoLight from "../../assets/ppp-logo-light.svg";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const reactId = useId();
  const navId = `mobile-menu-${reactId.replace(/:/g, "")}`;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const location = useLocation();

  const close = () => setOpen(false);
  const toggle = () => setOpen((s) => !s);

  // Close menu on route change (mobile UX win)
  useEffect(() => {
    if (open) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock background scroll + manage focus on open/close
  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const root = menuRef.current;
      if (!root) return;
      const focusables = getFocusable(root);
      (focusables[0] ?? root).focus();
    };

    const t = window.setTimeout(focusFirst, 0);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;

      // Restore focus to the hamburger
      buttonRef.current?.focus();
      // Or restore previous:
      // previouslyFocusedRef.current?.focus();
    };
  }, [open]);

  // Global key handler: Escape closes, Tab traps focus
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const root = menuRef.current;
        if (!root) return;
        trapTabKey(e, root);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link
          to="/"
          className="brand-container"
          aria-label="Pocket Poker Pal home"
        >
          <picture>
            <source srcSet={logoDark} media="(prefers-color-scheme: dark)" />
            <img src={logoLight} alt="Pocket Poker Pal" className="logo" />
          </picture>
          <div className="brand">Pocket Poker Pal</div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links desktop" aria-label="Primary">
          <Link
            to="/"
            className={isActive(location.pathname, "/") ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/chat"
            className={isActive(location.pathname, "/chat") ? "active" : ""}
          >
            Chat
          </Link>
          <Link
            to="/about"
            className={isActive(location.pathname, "/about") ? "active" : ""}
          >
            About
          </Link>
        </nav>

        <div className="nav-actions desktop">
          <Link to="/chat">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Hamburger (also serves as Close button when open) */}
        <button
          ref={buttonRef}
          type="button"
          className={`hamburger ${open ? "open" : ""}`}
          aria-controls={navId}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggle}
        >
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="mobile-overlay"
        hidden={!open}
        aria-hidden={!open}
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div
          id={navId}
          ref={menuRef}
          className="mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Primary menu"
          tabIndex={-1}
        >
          {/* inside the mobile-panel */}
          <div className="mobile-title-row">
            <div>
              <div className="mobile-title">Menu</div>
              <div className="mobile-sub">Navigate Pocket Poker Pal</div>
            </div>

            <button
              type="button"
              className="mobile-x"
              aria-label="Close menu"
              onClick={close}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Primary">
            <Link to="/" className="mobile-item">
              Home
            </Link>
            <Link to="/chat" className="mobile-item">
              Chat
            </Link>
            <Link to="/about" className="mobile-item">
              About
            </Link>
          </nav>

          <div className="mobile-actions">
            <Link to="/chat">
              <Button>Get Started</Button>
            </Link>
          </div>
          {/* Screen-reader hint */}
          <p className="sr-only" aria-live="polite">
            Press Escape to close the menu.
          </p>
        </div>
      </div>
    </header>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname.startsWith(to);
}

/** Focus helpers */
function getFocusable(root: HTMLElement): HTMLElement[] {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");
  return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
  );
}

function trapTabKey(e: KeyboardEvent, root: HTMLElement) {
  const focusables = getFocusable(root);
  if (focusables.length === 0) {
    e.preventDefault();
    root.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (e.shiftKey) {
    if (active === first || !root.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
