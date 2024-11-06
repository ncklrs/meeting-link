import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DailyMeetingHoursCardProps {
  bgColor: string;
  textColor: string;
  tempDailyHours: { [key: string]: number };
  setTempDailyHours: (hours: { [key: string]: number }) => void;
}

const DailyMeetingHoursCard: React.FC<DailyMeetingHoursCardProps> = ({
  bgColor,
  textColor,
  tempDailyHours,
  setTempDailyHours,
}) => {
  return (
    <Card className={bgColor}>
      <CardHeader>
        <CardTitle className={textColor}>Daily Meeting Hours</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(tempDailyHours).map(([day, hours]) => (
          <div key={day} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`${day}-hours`} className={textColor}>
                {day}
              </Label>
              <Input
                id={`${day}-hours-input`}
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={hours}
                onChange={(e) =>
                  setTempDailyHours({
                    ...tempDailyHours,
                    [day]: Number(e.target.value),
                  })
                }
                className="w-20 text-right"
              />
            </div>
            <Slider
              id={`${day}-hours`}
              min={0}
              max={8}
              step={0.5}
              value={[hours]}
              onValueChange={(value) =>
                setTempDailyHours({
                  ...tempDailyHours,
                  [day]: value[0],
                })
              }
            />
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className={`${textColor} font-semibold`}>
            Total Weekly Meeting Hours:{" "}
            {Object.values(tempDailyHours)
              .reduce((sum, hours) => sum + hours, 0)
              .toFixed(1)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyMeetingHoursCard;
