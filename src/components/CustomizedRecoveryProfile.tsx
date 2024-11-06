import { useState } from "react";
import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CustomizedRecoveryProfileProps {
  isDark?: boolean;
}

export function CustomizedRecoveryProfile({
  isDark = true,
}: CustomizedRecoveryProfileProps) {
  const [recoveryTime, setRecoveryTime] = useState(15);

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>Customized Recovery Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="recovery-time" className={textColor}>
          Recovery Time (minutes per hour of meeting)
        </Label>
        <Slider
          id="recovery-time"
          min={5}
          max={30}
          step={1}
          value={[recoveryTime]}
          onValueChange={(value) => setRecoveryTime(value[0])}
          className="mt-2"
        />
        <p className={`mt-4 text-2xl font-bold ${accentColor}`}>
          {recoveryTime} minutes
        </p>
        <p className={`mt-2 text-sm ${textColor}`}>
          Adjust based on your role or work style
        </p>
      </CardContent>
    </Card>
  );
}
