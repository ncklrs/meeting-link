"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalCostCalculatorProps {
  isDark?: boolean;
}

export function PersonalCostCalculator({
  isDark = true,
}: PersonalCostCalculatorProps) {
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  // const textColor = isDark ? "text-white" : "text-gray-900";
  const [weeklyMeetingHours, setWeeklyMeetingHours] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [meetingCost, setMeetingCost] = useState(0);

  useEffect(() => {
    calculateMeetingCost();
  }, [weeklyMeetingHours, annualSalary]);

  const calculateMeetingCost = () => {
    const hours = parseFloat(weeklyMeetingHours);
    const salary = parseFloat(annualSalary);
    if (hours && salary) {
      const weeklyCost = (salary / 52 / 40) * hours;
      const annualCost = weeklyCost * 52;
      setMeetingCost(annualCost);
    } else {
      setMeetingCost(0);
    }
  };

  return (
    <Card
      className={`${bgColor} w-full max-w-md mx-auto mb-16 shadow rounded-lg`}
    >
      <CardHeader>
        <CardTitle>
          <h4>Personal Meeting Cost Calculator</h4>
        </CardTitle>
        <CardDescription>
          Enter your details to see your annual meeting cost
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="weeklyMeetingHours">
              How many hours a week do you spend in meetings?
            </Label>
            <Input
              id="weeklyMeetingHours"
              type="number"
              placeholder="e.g., 10"
              value={weeklyMeetingHours}
              onChange={(e) => setWeeklyMeetingHours(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="annualSalary">
              What is your annual salary in USD?
            </Label>
            <Input
              id="annualSalary"
              type="number"
              placeholder="e.g., 75000"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <p className="text-lg font-semibold">Your Annual Meeting Cost:</p>
            <p className="text-6xl font-bold font-sans text-cyan-600">
              ${meetingCost.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
