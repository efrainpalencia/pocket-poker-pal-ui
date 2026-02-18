import Card, { CardHeader, CardTitle, CardBody } from "@/components/ui/Card";

export default function About() {
  return (
    <>
      <section>
        <div className="about-header">
          <h1>
            Pocket Poker Pal - <span className="about-span-1">fast</span>,{" "}
            <span className="about-span-2">accurate</span>, and{" "}
            <span className="about-span-3">intuitive</span>.
          </h1>
          <p className="hero-sub">
            Get rulebook‑backed answers in the moment—on the floor, in training,
            or at the table.
          </p>
        </div>
        <div className="about-card">
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(540px, 100%)" }}
          >
            <CardHeader>
              <CardTitle className="about-span-1">
                Backed by Official Rulebooks
              </CardTitle>
            </CardHeader>
            <CardBody>
              Embedded sources include TDA Poker Rules and the Seminole Poker
              Rule Book, so every response is grounded in professional
              standards.
            </CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(540px, 100%)" }}
          >
            <CardHeader>
              <CardTitle className="about-span-2">Why it's reliable</CardTitle>
            </CardHeader>
            <CardBody>
              <ul>
                <li>Answers cite rulebook language where applicable</li>
                <li>Built for quick rulings in real‑world situations</li>
              </ul>
            </CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(540px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>For Industry Pros</CardTitle>
            </CardHeader>
            <CardBody>
              <ul>
                <li>
                  Floor Staff & Dealers: Resolve disputes quickly and
                  confidently
                </li>
                <li>
                  Supervisors & Trainers: Use as a teaching aid for new hires
                </li>
                <li>
                  Tournament Directors: Reference rulings without flipping pages
                </li>
              </ul>
            </CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(540px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>For Players</CardTitle>
            </CardHeader>
            <CardBody>
              <ul>
                <li>
                  Learn advanced rulings used in casino and tournament settings
                </li>
                <li>
                  Understand the reasoning behind floor decisions to improve
                  play
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <h2>Features You'll Love</h2>
        <div className="about-card">
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(360px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>Conversational Chat</CardTitle>
            </CardHeader>
            <CardBody>Natural answers with clear context.</CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(360px, 100%)" }}
          >
            <CardHeader>
              <CardTitle className="about-span-3">Rulebook‑Grounded</CardTitle>
            </CardHeader>
            <CardBody>Responses based on trusted sources.</CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(360px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>Fast & Accurate</CardTitle>
            </CardHeader>
            <CardBody>Optimized for on‑the‑floor rulings.</CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(360px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>Mobile‑First</CardTitle>
            </CardHeader>
            <CardBody>Clean UI that shines on phones.</CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(360px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>Searchable</CardTitle>
            </CardHeader>
            <CardBody>Find rulings by topic or keyword.</CardBody>
          </Card>
          <Card
            variant="glass"
            padding="lg"
            style={{ width: "min(360px, 100%)" }}
          >
            <CardHeader>
              <CardTitle>Resolute</CardTitle>
            </CardHeader>
            <CardBody>
              Assistant clarifies your question to confirm context.
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}
