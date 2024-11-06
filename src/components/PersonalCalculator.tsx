import { useState } from "react";
import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PersonalCalculatorProps {
  isDark?: boolean;
}

export function PersonalCalculator({ isDark = true }: PersonalCalculatorProps) {
  const {
    personalHourlyRate,
    setPersonalHourlyRate,
    personalMeetingHours,
    setPersonalMeetingHours,
  } = useMeetingCost();
  const [tempSalary, setTempSalary] = useState("98000");
  const [salaryType, setSalaryType] = useState<"hourly" | "annual">("annual");
  const [timeframe, setTimeframe] = useState<"weekly" | "annual">("weekly");

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  const calculateCost = () => {
    const weeklyMeetingCost = personalHourlyRate * personalMeetingHours;
    return timeframe === "weekly" ? weeklyMeetingCost : weeklyMeetingCost * 52;
  };

  const handleSalarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = Number(tempSalary);
    const hourlyRate = salaryType === "annual" ? salary / 2080 : salary;
    setPersonalHourlyRate(hourlyRate);
  };

  const handleReset = () => {
    setPersonalHourlyRate(0);
    setTempSalary("");
    setPersonalMeetingHours(0);
  };

  const cost = calculateCost();

  return (
    <Card
      className={`w-full h-full overflow-hidden rounded-lg ${bgColor} ring-1 ring-gray-200 dark:ring-white/15`}
    >
      <CardHeader>
        <CardTitle className={textColor}>
          Personal Meeting Cost Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {personalHourlyRate === 0 ? (
            <form onSubmit={handleSalarySubmit} className="space-y-4">
              <div>
                <Label htmlFor="salary" className={textColor}>
                  Salary
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={tempSalary}
                  onChange={(e) => setTempSalary(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <RadioGroup
                defaultValue={salaryType}
                onValueChange={(value) =>
                  setSalaryType(value as "hourly" | "annual")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly" className={textColor}>
                    Hourly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="annual" id="annual" />
                  <Label htmlFor="annual" className={textColor}>
                    Annual
                  </Label>
                </div>
              </RadioGroup>
              <Button type="submit">Set Salary</Button>
            </form>
          ) : (
            <div className="space-y-2">
              <p className={textColor}>
                Hourly Rate: ${personalHourlyRate.toFixed(2)}
              </p>
              <Button onClick={handleReset}>Reset Salary</Button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="meetingHours" className={textColor}>
              Weekly Meeting Hours: {personalMeetingHours}
            </Label>
            <Slider
              id="meetingHours"
              min={0}
              max={40}
              step={0.5}
              value={[personalMeetingHours]}
              onValueChange={(value) => setPersonalMeetingHours(value[0])}
            />
          </div>
          <Tabs
            defaultValue={timeframe}
            onValueChange={(value) =>
              setTimeframe(value as "weekly" | "annual")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly">
              <p className={`text-2xl font-bold ${accentColor}`}>
                Weekly Cost: ${cost.toFixed(2)}
              </p>
            </TabsContent>
            <TabsContent value="annual">
              <p className={`text-2xl font-bold ${accentColor}`}>
                Annual Cost: ${cost.toFixed(2)}
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
