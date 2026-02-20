"use client";
import { useState } from "react";
import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Button } from "@/components/ui/button";
import { Copy, Download, Check } from "lucide-react";

interface ExportButtonProps {
  isDark?: boolean;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || parts.length === 0) parts.push(`${m}m`);
  return parts.join(" ");
}

export function ExportButton({ isDark = true }: ExportButtonProps) {
  const { currentCost, elapsedTime, attendees, totalHourlyRate } =
    useMeetingCost();
  const [copied, setCopied] = useState(false);

  if (elapsedTime === 0) return null;

  const getTextSummary = (): string => {
    const duration = formatDuration(elapsedTime);
    const lines = [
      `Meeting Cost Summary`,
      `--------------------`,
      `Duration: ${duration}`,
      `Attendees: ${attendees.length}`,
      `Total Cost: $${currentCost.toFixed(2)}`,
      `Combined Rate: $${totalHourlyRate.toFixed(2)}/hr`,
      `Cost/Min: $${(elapsedTime > 0 ? currentCost / (elapsedTime / 60) : 0).toFixed(2)}`,
      ``,
      `Attendees:`,
      ...attendees.map((a) => {
        const hourly =
          a.salaryType === "annual" ? a.salary / 2080 : a.salary;
        return `  - ${a.name}: $${hourly.toFixed(2)}/hr`;
      }),
    ];
    return lines.join("\n");
  };

  const getCsvContent = (): string => {
    const header = "Name,Salary,Salary Type,Hourly Rate";
    const rows = attendees.map((a) => {
      const hourly =
        a.salaryType === "annual" ? a.salary / 2080 : a.salary;
      return `${a.name},${a.salary},${a.salaryType},${hourly.toFixed(2)}`;
    });
    const summary = [
      "",
      "Meeting Summary",
      `Duration,${formatDuration(elapsedTime)}`,
      `Total Cost,$${currentCost.toFixed(2)}`,
      `Attendees,${attendees.length}`,
      `Combined Hourly Rate,$${totalHourlyRate.toFixed(2)}`,
    ];
    return [header, ...rows, ...summary].join("\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getTextSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([getCsvContent()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting-cost-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const buttonVariant = isDark ? "default" : "outline";

  return (
    <div className="flex gap-2">
      <Button variant={buttonVariant} size="sm" onClick={handleCopy}>
        {copied ? (
          <Check className="mr-1 h-4 w-4" />
        ) : (
          <Copy className="mr-1 h-4 w-4" />
        )}
        {copied ? "Copied!" : "Copy Summary"}
      </Button>
      <Button variant={buttonVariant} size="sm" onClick={handleDownload}>
        <Download className="mr-1 h-4 w-4" />
        Download CSV
      </Button>
    </div>
  );
}
