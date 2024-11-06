import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImpactSummaryProps {
  isDark?: boolean;
}

export function ImpactSummary({ isDark = true }: ImpactSummaryProps) {
  const { currentCost, elapsedTime, attendees } = useMeetingCost();

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  const weeklyMeetingHours = (elapsedTime / 3600) * 5; // Assuming 5 similar meetings per week
  const annualMeetingHours = weeklyMeetingHours * 52;

  const weeklyCost = currentCost * 5;
  const annualCost = weeklyCost * 52;

  const weeklyProductivityLoss = (weeklyMeetingHours / 40) * 100; // Assuming 40-hour work week
  const annualProductivityLoss = (annualMeetingHours / (40 * 52)) * 100;

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>Impact Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <div className="space-y-2">
              <p className={textColor}>
                Total Cost:{" "}
                <span className={`font-bold ${accentColor}`}>
                  ${weeklyCost.toFixed(2)}
                </span>
              </p>
              <p className={textColor}>
                Meeting Hours:{" "}
                <span className={`font-bold ${accentColor}`}>
                  {weeklyMeetingHours.toFixed(1)}
                </span>
              </p>
              <p className={textColor}>
                Productivity Loss:{" "}
                <span className={`font-bold ${accentColor}`}>
                  {weeklyProductivityLoss.toFixed(2)}%
                </span>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="annual">
            <div className="space-y-2">
              <p className={textColor}>
                Total Cost:{" "}
                <span className={`font-bold ${accentColor}`}>
                  ${annualCost.toFixed(2)}
                </span>
              </p>
              <p className={textColor}>
                Meeting Hours:{" "}
                <span className={`font-bold ${accentColor}`}>
                  {annualMeetingHours.toFixed(1)}
                </span>
              </p>
              <p className={textColor}>
                Productivity Loss:{" "}
                <span className={`font-bold ${accentColor}`}>
                  {annualProductivityLoss.toFixed(2)}%
                </span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
