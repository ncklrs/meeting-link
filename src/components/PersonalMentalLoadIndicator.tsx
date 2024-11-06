import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalMentalLoadIndicatorProps {
  totalWeeklyMeetingHours: number;
  isDark?: boolean;
}

export function PersonalMentalLoadIndicator({
  totalWeeklyMeetingHours,
  isDark = true,
}: PersonalMentalLoadIndicatorProps) {
  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const accentColor = isDark ? "bg-gray-700" : "bg-secondaryBackground"; // Item background color

  const calculateMentalLoad = () => {
    // This is a simplified calculation and should be adjusted based on research or specific requirements
    const baseLoad = 40; // Assuming 40 hours work week
    const loadPerMeetingHour = 1.5; // Meetings are more mentally taxing than regular work
    return Math.min(
      100,
      ((totalWeeklyMeetingHours * loadPerMeetingHour) / baseLoad) * 100
    );
  };

  const mentalLoad = calculateMentalLoad();

  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <CardHeader>
        <CardTitle className={textColor}>Mental Load Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <span className={`text-4xl font-bold ${accentColor}`}>
            {mentalLoad.toFixed(1)}%
          </span>
          <p className={`mt-2 ${textColor}`}>
            Estimated mental load from meetings
          </p>
        </div>
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-warning"
            style={{ width: `${mentalLoad}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
