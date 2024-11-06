import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PersonalRecoveryProfileProps {
  dailyMeetingHours: { [key: string]: number };
  recoveryTimePerHour: number;
  isDark?: boolean;
}

export function PersonalRecoveryProfile({
  dailyMeetingHours,
  recoveryTimePerHour,
  isDark = true,
}: PersonalRecoveryProfileProps) {
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  const calculateRecoveryTime = (meetingHours: number) => {
    return (meetingHours * recoveryTimePerHour) / 60; // Convert to hours
  };

  const data = Object.entries(dailyMeetingHours).map(([day, hours]) => ({
    day,
    meetingHours: hours,
    recoveryTime: calculateRecoveryTime(hours),
  }));

  const totalRecoveryTime = data.reduce(
    (sum, day) => sum + day.recoveryTime,
    0
  );

  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <CardHeader>
        <CardTitle className={textColor}>Recovery Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke={isDark ? "#fff" : "#000"} />
            <YAxis stroke={isDark ? "#fff" : "#000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#fff",
                color: isDark ? "#fff" : "#000",
              }}
            />
            <Bar dataKey="meetingHours" fill="#4f46e5" name="Meeting Hours" />
            <Bar dataKey="recoveryTime" fill="#22c55e" name="Recovery Time" />
          </BarChart>
        </ResponsiveContainer>
        <div className={`mt-4 ${textColor}`}>
          <p>Recovery Time per Meeting Hour: {recoveryTimePerHour} minutes</p>
          <p>
            Total Weekly Recovery Time: {totalRecoveryTime.toFixed(2)} hours
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
