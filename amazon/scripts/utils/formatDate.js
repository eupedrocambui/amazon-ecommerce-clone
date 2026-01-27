// "2025-10-28T12:00:00Z" -> "MMMM D"
export function formatDate(originalDate) {
    return dayjs(originalDate).format("MMMM D");
}

// "2024-02-27T20:57:02.235Z" -> "YYYY-MM-DD"
export function formatDate2(originalDate) {
  return dayjs(originalDate).format("YYYY-MM-DD");
}

// "YYYY-MM-DD" -> "MMMM, D"
export function formatDate3(originalDate) {
  return dayjs(originalDate).format('MMMM, D');
}

// "YYYY-MM-DD" -> "Monday, November 3"
export function formatDate4(originalDate) {
  const localDate = dayjs(originalDate + "T00:00:00");
  return dayjs(localDate).format('dddd, MMMM D');
}