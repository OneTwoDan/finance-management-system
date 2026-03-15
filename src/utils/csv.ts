import { Movement } from "@/types";

/**
 * Converts an array of Movement objects to a CSV string.
 * Columns: concept, amount, date, user (userName or userId)
 */
export function movementsToCsv(movements: Movement[]): string {
  const headers = ["concept", "amount", "date", "user"];
  const rows = movements.map((m) => [
    `"${m.concept.replace(/"/g, '""')}"`,
    m.amount,
    new Date(m.date).toISOString().split("T")[0],
    `"${m.userName || m.userId}"`,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
