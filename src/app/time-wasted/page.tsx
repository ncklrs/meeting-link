"use client";
import { MeetingCostCalculator } from "@/components/MeetingCosts";

export default function PersonalCostPage() {
  const isDark = false;

  return (
    <MeetingCostCalculator isDark={isDark} />
  );
}
