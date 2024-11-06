import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface InefficiencyCardProps {
  title: string;
  time: number;
  cost: number;
  settingName: string;
  settingValue: number;
  onSettingChange: (value: number) => void;
  settingMin: number;
  settingMax: number;
  settingStep: number;
  isDark?: boolean;
}

export function InefficiencyCard({
  title,
  time,
  cost,
  settingName,
  settingValue,
  onSettingChange,
  settingMin,
  settingMax,
  settingStep,
  isDark = true,
}: InefficiencyCardProps) {
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className={`text-2xl font-bold ${accentColor}`}>
              {time.toFixed(2)} minutes
            </p>
            <p className={`text-xl ${textColor}`}>${cost.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor={settingName} className={textColor}>
              {settingName}: {settingValue}
            </Label>
            <Slider
              id={settingName}
              min={settingMin}
              max={settingMax}
              step={settingStep}
              value={[settingValue]}
              onValueChange={(value) => onSettingChange(value[0])}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
