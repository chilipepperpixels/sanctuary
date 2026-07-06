"use client";

import { useState } from "react";

export default function DiscordWidget() {
  const [loadWidget, setLoadWidget] = useState(false);
  const showWidget = () => setLoadWidget(true);

  return (
    <span
      className="discord-widget-trigger"
      onMouseEnter={showWidget}
      onFocus={showWidget}
    >
      <a
        href="https://discord.gg/2t8u4UHanz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/Discord-Symbol-Blurple.png" alt="Support Discord Server" />
      </a>
      <span className="discord-widget-popover">
        {loadWidget && (
          <iframe
            src="https://discord.com/widget?id=1511547007918018721&theme=dark"
            width="350"
            height="500"
            allowTransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            title="Discord server widget"
          ></iframe>
        )}
      </span>
    </span>
  );
}
