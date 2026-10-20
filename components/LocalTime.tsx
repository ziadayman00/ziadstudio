"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    function update() {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setTimeString(formatted);
      } catch {
        setTimeString("UTC+3");
      }
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-xs tracking-wider text-[var(--color-muted)] tabular-nums">
      {timeString ? `CAIRO ${timeString}` : "CAIRO, EGYPT (UTC+3)"}
    </span>
  );
}
