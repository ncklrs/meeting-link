import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MentalLoadIndicatorProps {
  isDark?: boolean;
}

export function MentalLoadIndicator({
  isDark = true,
}: MentalLoadIndicatorProps) {
  const { attendees, elapsedTime } = useMeetingCost();

  // Assuming a mental load score that increases with meeting duration
  // and number of attendees, normalized to a 0-100 scale
  const mentalLoadScore = Math.min(
    (elapsedTime / 3600) * Math.log(attendees.length + 1) * 10,
    100
  );

  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const accentColor = isDark ? "bg-gray-100" : "bg-secondaryAccent"; // Item background color

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>Mental Load Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold text-primaryText`}>
          {mentalLoadScore.toFixed(2)}
        </p>
        <p className={`mt-2 text-sm ${textColor}`}>Mental Load Score (0-100)</p>
        <Progress value={mentalLoadScore} className="mt-4" />
        <p className={`mt-2 text-sm ${textColor}`}>
          Based on meeting duration and number of attendees
        </p>
      </CardContent>
    </Card>
  );
}
