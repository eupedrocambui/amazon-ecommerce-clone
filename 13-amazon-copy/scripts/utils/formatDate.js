// "2025-10-28T12:00:00Z" -> "MMMM D"
export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

// "2024-02-27T20:57:02.235Z" -> "YYYY-MM-DD"
export function formatDate2(originalDate) {
  return dayjs(originalDate).format("YYYY-MM-DD");
}

// "YYYY-MM-DD" -> "MMMM, D"
export function formatDate3(originalDate) {
  return dayjs(originalDate).format('MMMM, D');
}