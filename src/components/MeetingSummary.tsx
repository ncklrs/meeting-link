"use client";
import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MeetingSummaryProps {
  isDark?: boolean;
}

export function MeetingSummary({ isDark = true }: MeetingSummaryProps) {
  const {
    currentCost,
    elapsedTime,
    attendees,
    isRunning,
    totalHourlyRate,
    inefficiencyMetrics,
    estimatedTime,
  } = useMeetingCost();

  const bgColor = isDark ? "bg-gray-800" : "bg-background";
  const textColor = isDark ? "text-gray-50" : "text-primaryText";
  const mutedColor = isDark ? "text-gray-400" : "text-gray-500";
  const accentColor = isDark ? "text-orange-400" : "text-orange-600";
  const greenColor = isDark ? "text-green-400" : "text-green-600";

  // Don't show until the timer has been used
  if (elapsedTime === 0) return null;

  const durationMinutes = elapsedTime / 60;
  const costPerMinute = durationMinutes > 0 ? currentCost / durationMinutes : 0;
  const costPerAttendee =
    attendees.length > 0 ? currentCost / attendees.length : 0;

  // Calculate total inefficiency time
  const inefficiencyMinutes =
    inefficiencyMetrics.smallTalkTime +
    inefficiencyMetrics.waitingTime +
    inefficiencyMetrics.recapTime +
    inefficiencyMetrics.clarificationTime +
    inefficiencyMetrics.bufferTime +
    inefficiencyMetrics.followUpTime +
    inefficiencyMetrics.decisionDelayTime +
    (inefficiencyMetrics.passiveListeningPercentage / 100) * estimatedTime +
    ((100 - inefficiencyMetrics.roleRelevance) / 100) * estimatedTime;

  const inefficiencyCost = (inefficiencyMinutes / 60) * totalHourlyRate;
  const wastePercent =
    currentCost > 0
      ? Math.min(100, (inefficiencyCost / currentCost) * 100)
      : 0;

  // Fun comparisons
  const getComparison = (cost: number): string => {
    if (cost < 10) return `${(cost / 5).toFixed(1)} fancy coffees`;
    if (cost < 100)
      return `${(cost / 15).toFixed(1)} lunches`;
    if (cost < 500)
      return `${(cost / 60).toFixed(1)} monthly streaming subscriptions`;
    return `${(cost / 200).toFixed(1)} round-trip flights (budget)`;
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join(" ");
  };

  return (
    <Card className={`w-full overflow-hidden ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}>
      <CardHeader>
        <CardTitle className={textColor}>
          Meeting Summary {isRunning && "(live)"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className={`text-sm ${mutedColor}`}>Duration</p>
            <p className={`text-xl font-bold ${textColor}`}>
              {formatDuration(elapsedTime)}
            </p>
          </div>
          <div>
            <p className={`text-sm ${mutedColor}`}>Total Cost</p>
            <p className={`text-xl font-bold ${accentColor}`}>
              ${currentCost.toFixed(2)}
            </p>
          </div>
          <div>
            <p className={`text-sm ${mutedColor}`}>Cost / Minute</p>
            <p className={`text-xl font-bold ${textColor}`}>
              ${costPerMinute.toFixed(2)}
            </p>
          </div>
          <div>
            <p className={`text-sm ${mutedColor}`}>Cost / Attendee</p>
            <p className={`text-xl font-bold ${textColor}`}>
              ${costPerAttendee.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${mutedColor}`}>Estimated Waste</p>
              <p className={`text-lg font-semibold ${accentColor}`}>
                {wastePercent.toFixed(0)}% (${inefficiencyCost.toFixed(2)})
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm ${mutedColor}`}>That&apos;s equivalent to</p>
              <p className={`text-lg font-semibold ${greenColor}`}>
                {getComparison(currentCost)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
