import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProductivityLossIndexProps {
  isDark?: boolean;
}

export function ProductivityLossIndex({
  isDark = true,
}: ProductivityLossIndexProps) {
  const { attendees, elapsedTime } = useMeetingCost();

  // Assuming 15 minutes of recovery time per hour of meeting
  const recoveryTime = (elapsedTime / 3600) * 15 * 60;
  const totalLostTime = elapsedTime + recoveryTime;

  // Assuming a 40-hour work week
  const weeklyProductivityLoss = (totalLostTime / (40 * 3600)) * 100;

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>Productivity Loss Index</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${accentColor}`}>
          {weeklyProductivityLoss.toFixed(2)}%
        </p>
        <p className={`mt-2 text-sm ${textColor}`}>
          of weekly productivity lost
        </p>
        <Progress value={weeklyProductivityLoss} className="mt-4" />
        <p className={`mt-2 text-sm ${textColor}`}>
          Total lost time: {Math.floor(totalLostTime / 3600)}h{" "}
          {Math.floor((totalLostTime % 3600) / 60)}m
        </p>
      </CardContent>
    </Card>
  );
}
