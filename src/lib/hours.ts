import { HOURS } from "@/data/site";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const kochiFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Current weekday (0 = Sunday) and minutes past midnight in Fort Kochi, regardless of the visitor's timezone. */
export function kochiTime(date: Date) {
  const parts = kochiFormatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day: WEEKDAYS.indexOf(get("weekday")), hour, minute, minutes: hour * 60 + minute };
}

const toMinutes = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

/** "07:30" → "7:30 AM", "01:00" → "1 AM" */
export function formatTime(hhmm: string) {
  const h = Number(hhmm.slice(0, 2));
  const m = hhmm.slice(3, 5);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === "00" ? `${h12} ${suffix}` : `${h12}:${m} ${suffix}`;
}

export type OpenStatus = { open: boolean; label: string };

export function getOpenStatus(date: Date): OpenStatus {
  const { day, minutes } = kochiTime(date);

  // Late-night spill-over from the previous day's session (e.g. Tuesday 7:30 AM → Wednesday 1 AM).
  const previous = HOURS[(day + 6) % 7];
  if (!previous.closed && toMinutes(previous.closes) < toMinutes(previous.opens) && minutes < toMinutes(previous.closes)) {
    return { open: true, label: `Open now · until ${formatTime(previous.closes)}` };
  }

  const today = HOURS[day];
  if (!today.closed) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    const overnight = closes < opens;
    if (minutes >= opens && (overnight || minutes < closes)) {
      return { open: true, label: `Open now · until ${formatTime(today.closes)}` };
    }
  }

  for (let offset = 0; offset < 7; offset++) {
    const candidate = HOURS[(day + offset) % 7];
    if (candidate.closed) continue;
    if (offset === 0 && minutes >= toMinutes(candidate.opens)) continue;
    const when = offset === 0 ? "" : offset === 1 ? " tomorrow" : ` ${candidate.short}`;
    const reason = today.closed && offset > 0 ? `Closed ${today.day}s` : "Closed now";
    return { open: false, label: `${reason} · opens${when} ${formatTime(candidate.opens)}` };
  }

  return { open: false, label: "Closed" };
}
