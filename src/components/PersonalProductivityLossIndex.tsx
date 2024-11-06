import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalProductivityLossIndexProps {
  totalWeeklyMeetingHours: number;
  isDark?: boolean;
}

export function PersonalProductivityLossIndex({
  totalWeeklyMeetingHours,
  isDark = true,
}: PersonalProductivityLossIndexProps) {
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  const calculateProductivityLoss = () => {
    // This is a simplified calculation and should be adjusted based on research or specific requirements
    const baseProductivity = 40; // Assuming 40 hours of productive time in a week
    const lossPerMeetingHour = 1.2; // Assuming each meeting hour affects more than just that hour
    const totalLoss = Math.min(
      baseProductivity,
      totalWeeklyMeetingHours * lossPerMeetingHour
    );
    return (totalLoss / baseProductivity) * 100;
  };

  const productivityLoss = calculateProductivityLoss();

  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <CardHeader>
        <CardTitle className={textColor}>Productivity Loss Index</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <span className={`text-4xl font-bold ${accentColor}`}>
            {productivityLoss.toFixed(1)}%
          </span>
          <p className={`mt-2 ${textColor}`}>
            Estimated weekly productivity loss
          </p>
        </div>
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600"
            style={{ width: `${productivityLoss}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
