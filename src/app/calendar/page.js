export default function Calendar() {
  return (
    <div className="page-shell">
      <main>
        <h1>Drumroll Calendar</h1>
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FBudapest&showPrint=0&src=MTI4NGE0MjM3MzY5NjM0NDg2YTJhNjFlNWE5NDU0MjUyZWFiNDUyZDIwMTY0MjVmMWVhNDdjM2EwZjMyOGU5ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f4511e"
          className="calendar-frame"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </main>
      <section style={{ marginBottom: "60px" }}>
        <p>Other Important Documents</p>
        <p>
          <a
            href="https://forms.gle/BfgANq49tsSfVYsM8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Absence Form
          </a>
        </p>
        <p>
          <a
            href="https://forms.gle/uZoUZGKY6osi3Gpc6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consumable Request Form
          </a>
        </p>
      </section>
    </div>
  );
}
