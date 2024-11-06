import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface RecoveryTimeCardProps {
  bgColor: string;
  textColor: string;
  tempRecoveryTime: number;
  setTempRecoveryTime: (time: number) => void;
}

const RecoveryTimeCard: React.FC<RecoveryTimeCardProps> = ({
  bgColor,
  textColor,
  tempRecoveryTime,
  setTempRecoveryTime,
}) => {
  return (
    <Card className={bgColor}>
      <CardHeader>
        <CardTitle className={textColor}>Recovery Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="recovery-time" className={textColor}>
              Recovery Time per Meeting Hour (minutes)
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="recovery-time"
                type="number"
                min="0"
                max="60"
                value={tempRecoveryTime}
                onChange={(e) => setTempRecoveryTime(Number(e.target.value))}
                className="w-20"
              />
              <Slider
                id="recovery-time-slider"
                min={0}
                max={60}
                step={1}
                value={[tempRecoveryTime]}
                onValueChange={(value) => setTempRecoveryTime(value[0])}
                className="flex-grow"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecoveryTimeCard;
