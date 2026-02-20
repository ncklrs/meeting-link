import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CostCounterProps {
  isDark?: boolean;
}

export function CostCounter({ isDark = true }: CostCounterProps) {
  const { currentCost, elapsedTime, costThreshold, setCostThreshold } =
    useMeetingCost();

  const overThreshold = costThreshold > 0 && currentCost >= costThreshold;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const bgColor = isDark ? "bg-gray-800" : "bg-background";
  const textColor = isDark ? "text-gray-50" : "text-primaryText";
  const accentColor = overThreshold
    ? "text-red-500"
    : isDark
      ? "bg-gray-700"
      : "text-primaryAccent";

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor}`}>
      <CardHeader>
        <CardTitle className={textColor}>Real-time Cost</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col items-center justify-stretch">
        <p className={`text-center text-8xl font-bold ${accentColor}`}>
          ${currentCost.toFixed(2)}
        </p>
        {overThreshold && (
          <p className="mt-2 text-center text-sm font-medium text-red-500 animate-pulse">
            Exceeded ${costThreshold.toFixed(0)} threshold!
          </p>
        )}
        <p className={`mt-4 text-2xl ${textColor} text-center`}>
          {formatTime(elapsedTime)}
        </p>
        <div className="mt-4 w-full max-w-xs">
          <Label htmlFor="costThreshold" className={`text-sm ${textColor}`}>
            Cost Alert Threshold ($)
          </Label>
          <Input
            id="costThreshold"
            type="number"
            min="0"
            step="50"
            value={costThreshold}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val >= 0) setCostThreshold(val);
            }}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}
