import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CostCounterProps {
  isDark?: boolean;
}

export function CostCounter({ isDark = true }: CostCounterProps) {
  const { currentCost, elapsedTime } = useMeetingCost();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const accentColor = isDark ? "bg-gray-700" : "text-primaryAccent"; // Item background color

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor}`}>
      <CardHeader>
        <CardTitle className={textColor}>Real-time Cost</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col items-center justify-stretch">
        <p className={`text-center text-8xl font-bold ${accentColor}`}>
          ${currentCost.toFixed(2)}
        </p>
        <p className={`mt-4 text-2xl ${textColor} text-center`}>
          {formatTime(elapsedTime)}
        </p>
      </CardContent>
    </Card>
  );
}
