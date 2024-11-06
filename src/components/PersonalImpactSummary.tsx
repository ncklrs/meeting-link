import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalImpactSummaryProps {
  totalWeeklyMeetingHours: number;
  weeklyCost: number;
  hourlyRate: number;
  isDark?: boolean;
}

export function PersonalImpactSummary({
  totalWeeklyMeetingHours,
  weeklyCost,
  hourlyRate,
  isDark = true,
}: PersonalImpactSummaryProps) {
  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const itemBgColor = isDark ? "bg-gray-700" : "bg-secondaryBackground"; // Item background color

  const annualMeetingHours = totalWeeklyMeetingHours * 52;
  const annualCost = weeklyCost * 52;

  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <CardHeader>
        <CardTitle className={textColor}>Impact Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className={`text-lg font-semibold ${textColor}`}>
              Weekly Impact
            </h3>
            <p className={`${textColor}`}>
              Hours in meetings: {totalWeeklyMeetingHours}
            </p>
            <p className={`${textColor}`}>
              Cost of meetings: ${weeklyCost.toFixed(2)}
            </p>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${textColor}`}>
              Annual Impact
            </h3>
            <p className={`${textColor}`}>
              Hours in meetings: {annualMeetingHours}
            </p>
            <p className={`${textColor}`}>
              Cost of meetings: ${annualCost.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className={`text-lg font-semibold ${textColor}`}>
            Potential Improvements
          </h3>
          <p className={`${textColor}`}>
            Reducing meeting time by 1 hour per week could save you $
            {(hourlyRate * 52).toFixed(2)} annually.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
