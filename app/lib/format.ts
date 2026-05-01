// "01 may 2026" — lowercase, dotless, editorial.
const MONTHS = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december",
];

export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00Z"); // noon to dodge tz boundaries
  if (Number.isNaN(d.getTime())) return iso;
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDayMonth(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = MONTHS[d.getUTCMonth()];
  return `${day} ${month}`;
}
