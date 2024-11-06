import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PersonalFlowDistributionChartProps {
  dailyMeetingHours: { [key: string]: number };
  isDark?: boolean;
}

export function PersonalFlowDistributionChart({
  dailyMeetingHours,
  isDark = true,
}: PersonalFlowDistributionChartProps) {
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  const calculateFlowScore = (meetingHours: number) => {
    // This is a simplified calculation and should be adjusted based on research or specific requirements
    const baseFlowScore = 10;
    return Math.max(0, baseFlowScore - meetingHours * 1.5);
  };

  const data = Object.entries(dailyMeetingHours).map(([day, hours]) => ({
    day,
    flowScore: calculateFlowScore(hours),
  }));

  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <CardHeader>
        <CardTitle className={textColor}>Flow Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" stroke={isDark ? "#fff" : "#000"} />
            <YAxis stroke={isDark ? "#fff" : "#000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                color: isDark ? "#fff" : "#000",
              }}
            />
            <Line
              type="monotone"
              dataKey="flowScore"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
