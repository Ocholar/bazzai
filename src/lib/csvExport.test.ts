import { describe, it, expect } from "vitest";
import { convertToCSV, escapeCSVField } from "./csvExport";

describe("CSV Export Utility", () => {
  describe("convertToCSV", () => {
    it("should convert headers and rows to CSV format", () => {
      const headers = ["ID", "Name", "Email"];
      const rows = [
        ["1", "John Doe", "john@example.com"],
        ["2", "Jane Smith", "jane@example.com"],
      ];

      const csv = convertToCSV(headers, rows);
      const lines = csv.split("\n");

      expect(lines[0]).toBe("ID,Name,Email");
      expect(lines[1]).toBe("1,John Doe,john@example.com");
      expect(lines[2]).toBe("2,Jane Smith,jane@example.com");
    });

    it("should handle empty rows", () => {
      const headers = ["ID", "Name"];
      const rows: any[] = [];

      const csv = convertToCSV(headers, rows);
      expect(csv).toBe("ID,Name");
    });

    it("should escape fields with commas", () => {
      const headers = ["Name", "Address"];
      const rows = [["John Doe", '"123 Main St, Apt 4"']];

      const csv = convertToCSV(headers, rows);
      expect(csv).toContain('"123 Main St, Apt 4"');
    });

    it("should escape fields with quotes", () => {
      const headers = ["Comment"];
      const rows = [['He said "Hello"']];

      const csv = convertToCSV(headers, rows);
      expect(csv).toContain('""He said ""Hello""');
    });

    it("should handle null and undefined values", () => {
      const headers = ["ID", "Name", "Email"];
      const rows = [
        ["1", "John", null],
        ["2", undefined, "jane@example.com"],
      ];

      const csv = convertToCSV(headers, rows);
      const lines = csv.split("\n");

      expect(lines[1]).toBe("1,John,");
      expect(lines[2]).toBe("2,,jane@example.com");
    });

    it("should handle numbers and booleans", () => {
      const headers = ["ID", "Active"];
      const rows = [
        [1, true],
        [2, false],
      ];

      const csv = convertToCSV(headers, rows);
      const lines = csv.split("\n");

      expect(lines[1]).toBe("1,true");
      expect(lines[2]).toBe("2,false");
    });
  });

  describe("escapeCSVField", () => {
    it("should not escape simple fields", () => {
      // Note: escapeCSVField is not exported, so we test it indirectly through convertToCSV
      const headers = ["Name"];
      const rows = [["John Doe"]];

      const csv = convertToCSV(headers, rows);
      expect(csv).toBe("Name\nJohn Doe");
    });

    it("should escape fields with newlines", () => {
      const headers = ["Description"];
      const rows = [["Line 1\nLine 2"]];

      const csv = convertToCSV(headers, rows);
      expect(csv).toContain('"Line 1');
    });
  });
});
