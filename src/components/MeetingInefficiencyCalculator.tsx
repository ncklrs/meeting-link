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
      <InefficiencyCard
        title="Recap & Catch-up"
        time={inefficiencyMetrics.recapTime}
        cost={calculateCost(inefficiencyMetrics.recapTime)}
        settingName="Recap Time"
        settingValue={inefficiencyMetrics.recapTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("recapTime", value)
        }
        settingMin={0}
        settingMax={15}
        settingStep={1}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Clarification & Confusion"
        time={inefficiencyMetrics.clarificationTime}
        cost={calculateCost(inefficiencyMetrics.clarificationTime)}
        settingName="Clarification Time"
        settingValue={inefficiencyMetrics.clarificationTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("clarificationTime", value)
        }
        settingMin={0}
        settingMax={15}
        settingStep={1}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Buffer & Transition"
        time={inefficiencyMetrics.bufferTime}
        cost={calculateCost(inefficiencyMetrics.bufferTime)}
        settingName="Buffer Time"
        settingValue={inefficiencyMetrics.bufferTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("bufferTime", value)
        }
        settingMin={0}
        settingMax={30}
        settingStep={1}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Follow-up Work"
        time={inefficiencyMetrics.followUpTime}
        cost={calculateCost(inefficiencyMetrics.followUpTime)}
        settingName="Follow-up Time"
        settingValue={inefficiencyMetrics.followUpTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("followUpTime", value)
        }
        settingMin={0}
        settingMax={30}
        settingStep={1}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Decision Delays"
        time={inefficiencyMetrics.decisionDelayTime}
        cost={calculateCost(inefficiencyMetrics.decisionDelayTime)}
        settingName="Decision Delay Time"
        settingValue={inefficiencyMetrics.decisionDelayTime}
        onSettingChange={(value) =>
          updateInefficiencyMetric("decisionDelayTime", value)
        }
        settingMin={0}
        settingMax={30}
        settingStep={1}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Passive Listening"
        time={(inefficiencyMetrics.passiveListeningPercentage / 100) * estimatedTime}
        cost={calculateCost((inefficiencyMetrics.passiveListeningPercentage / 100) * estimatedTime)}
        settingName="Passive Listening %"
        settingValue={inefficiencyMetrics.passiveListeningPercentage}
        onSettingChange={(value) =>
          updateInefficiencyMetric("passiveListeningPercentage", value)
        }
        settingMin={0}
        settingMax={100}
        settingStep={5}
        isDark={isDark}
      />
      <InefficiencyCard
        title="Low Role Relevance"
        time={((100 - inefficiencyMetrics.roleRelevance) / 100) * estimatedTime}
        cost={calculateCost(((100 - inefficiencyMetrics.roleRelevance) / 100) * estimatedTime)}
        settingName="Role Relevance %"
        settingValue={inefficiencyMetrics.roleRelevance}
        onSettingChange={(value) =>
          updateInefficiencyMetric("roleRelevance", value)
        }
        settingMin={0}
        settingMax={100}
        settingStep={5}
        isDark={isDark}
      />
    </div>
  );
}
