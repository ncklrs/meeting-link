import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FlowDisruptionChartProps {
  isDark?: boolean;
}

export function FlowDisruptionChart({
  isDark = true,
}: FlowDisruptionChartProps) {
  const { attendees, elapsedTime } = useMeetingCost();

  // Simulating flow disruption data for a week
  const flowDisruptionData = [
    { day: "Mon", interruptions: 5 },
    { day: "Tue", interruptions: 8 },
    { day: "Wed", interruptions: 12 },
    { day: "Thu", interruptions: 6 },
    { day: "Fri", interruptions: 9 },
  ];

  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const barColor = isDark ? "bg-gray-700" : "bg-secondaryBackground"; // Item background color

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>Flow Disruption</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={flowDisruptionData}>
            <XAxis dataKey="day" stroke={isDark ? "#ffffff" : "#000000"} />
            <YAxis stroke={isDark ? "#ffffff" : "#000000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: "none",
              }}
              labelStyle={{ color: isDark ? "#ffffff" : "#000000" }}
            />
            <Bar dataKey="interruptions" fill={barColor} />
          </BarChart>
        </ResponsiveContainer>
        <p className={`mt-2 text-sm ${textColor} text-center`}>
          Weekly interruption pattern
        </p>
      </CardContent>
    </Card>
  );
}
