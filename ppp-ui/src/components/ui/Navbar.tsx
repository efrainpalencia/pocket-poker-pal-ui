import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ppp-logo2.png";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navId = useId(); // unique id for aria-controls
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((s) => !s);

  // Lock background scroll + manage focus on open/close
  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus first focusable element inside menu
    const focusFirst = () => {
      const root = menuRef.current;
      if (!root) return;
      const focusables = getFocusable(root);
      (focusables[0] ?? root).focus();
    };

    // delay ensures elements exist
    const t = window.setTimeout(focusFirst, 0);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;

      // restore focus to the hamburger (or previously focused element)
      buttonRef.current?.focus();
      // Alternatively:
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
        <div className="brand-container">
          <img src={logo} alt="Pocket Poker Pal" className="logo" />
          <div className="brand">Pocket Poker Pal</div>
        </div>

        {/* Desktop nav (always available) */}
        <nav className="nav-links desktop" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="nav-actions desktop">
          <Link to="/chat">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Hamburger */}
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

      {/* Mobile menu as a dialog */}
      {open && (
        <div
          className="mobile-overlay"
          role="presentation"
          onMouseDown={(e) => {
            // close only if clicking the backdrop (not the panel)
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
            <div className="mobile-header">
              <div className="mobile-title">Menu</div>
              <button
                type="button"
                className="mobile-close"
                onClick={close}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="mobile-nav" aria-label="Primary">
              <Link to="/" onClick={close}>
                Home
              </Link>
              <Link to="/chat" onClick={close}>
                Chat
              </Link>
              <Link to="/about" onClick={close}>
                About
              </Link>
            </nav>

            <div className="mobile-actions">
              <Link to="/chat" onClick={close}>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
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
