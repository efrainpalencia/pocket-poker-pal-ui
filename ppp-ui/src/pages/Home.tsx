import Button from "../components/ui/Button";
import hero from "../assets/hero-image.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToChatPage = () => {
    navigate("/chat");
  };

  const goToAboutPage = () => {
    navigate("/about");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            Get in‑context answers to poker gameplay rules.
          </h1>
          <p className="hero-sub">
            Have a poker rules question? Ask
            <span className="hero-span"> Pocket Poker Pal</span> — an AI
            assistant trained on official rulebooks and best practices.
          </p>
          <div className="hero-cta">
            <Button variant="primary" onClick={goToChatPage}>
              Chat
            </Button>
            <Button variant="ghost" onClick={goToAboutPage}>
              Learn More
            </Button>
            <div className="no-signup">No sign‑up required</div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden>
          <img
            src={hero}
            alt="Pocket Poker Pal—AI assistant"
            className="hero-image"
          />
        </div>
      </section>

      <section id="features" className="features">
        <div className="feature">
          <h3>Fast, rulebook‑grounded answers</h3>
          <p>Instant rulings and clarifications for gameplay questions.</p>
        </div>
        <div className="feature">
          <h3>Untuitive chat UI</h3>
          <p>Ask by typing — mobile friendly.</p>
        </div>
        <div className="feature">
          <h3>Search by topic</h3>
          <p>
            Find answers across cash-game rules, procedures, and tournament
            play.
          </p>
        </div>
      </section>
    </>
  );
}
