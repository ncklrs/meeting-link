import React from "react";
import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { InefficiencyCard } from "./InefficiencyCard";

interface MeetingInefficiencyCalculatorProps {
  isDark?: boolean;
}

export function MeetingInefficiencyCalculator({
  isDark = true,
}: MeetingInefficiencyCalculatorProps) {
  const {
    attendees,
    estimatedTime,
    inefficiencyMetrics,
    updateInefficiencyMetric,
  } = useMeetingCost();

  const calculateCost = (time: number) => {
    const totalHourlyRate = attendees.reduce((acc, attendee) => {
      return (
        acc +
        (attendee.salaryType === "annual"
          ? attendee.salary / 2080
          : attendee.salary)
      );
    }, 0);
    return (time / 60) * totalHourlyRate;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <InefficiencyCard
        title="Small Talk & Intros"
        time={inefficiencyMetrics.smallTalkTime}
        cost={calculateCost(inefficiencyMetrics.smallTalkTime)}
        settingName="Small Talk Time"
        settingValue={inefficiencyMetrics.smallTalkTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("smallTalkTime", value)
        }
        settingMin={0}
        settingMax={15}
        settingStep={1}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Waiting for Attendees"
        time={inefficiencyMetrics.waitingTime}
        cost={calculateCost(inefficiencyMetrics.waitingTime)}
        settingName="Waiting Time"
        settingValue={inefficiencyMetrics.waitingTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("waitingTime", value)
        }
        settingMin={0}
        settingMax={15}
        settingStep={1}
        isDark={isDark}
      />
      {/* Add the rest of the inefficiency cards here, following the same pattern */}
    </div>
  );
}
