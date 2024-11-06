import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EstimatedCostProps {
  isDark?: boolean;
}

export function EstimatedCost({ isDark = true }: EstimatedCostProps) {
  const { attendees, estimatedTime, setEstimatedTime } = useMeetingCost();

  const estimatedCost = attendees.reduce((acc, attendee) => {
    const hourlyRate =
      attendee.salaryType === "annual"
        ? attendee.salary / 2080
        : attendee.salary;
    return acc + (hourlyRate / 60) * estimatedTime;
  }, 0);

  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const accentColor = isDark ? "bg-gray-700" : "text-primaryAccent"; // Item background color

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor} `}>
      <CardHeader>
        <CardTitle className={textColor}>Estimated Cost</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${accentColor}`}>
          ${estimatedCost.toFixed(2)}
        </p>
        <div className="mt-4">
          <Label htmlFor="estimatedTime" className={textColor}>
            Estimated Time (minutes)
          </Label>
          <Input
            id="estimatedTime"
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(parseInt(e.target.value))}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}
