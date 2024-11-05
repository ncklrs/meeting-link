"use client";
import { useState } from "react";
import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddAttendeeFormProps {
  isDark?: boolean;
}

export function AddAttendeeForm({ isDark = true }: AddAttendeeFormProps) {
  const { addAttendee } = useMeetingCost();
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState<"hourly" | "annual">("annual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && salary) {
      addAttendee({
        name,
        salary: parseFloat(salary),
        salaryType,
      });
      setName("");
      setSalary("");
    }
  };

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor} `}>
      <CardHeader>
        <CardTitle className={textColor}>Add Attendee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className={textColor}>
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="salary" className={textColor}>
              Salary
            </Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="salaryType" className={textColor}>
              Salary Type
            </Label>
            <select
              id="salaryType"
              value={salaryType}
              onChange={(e) =>
                setSalaryType(e.target.value as "hourly" | "annual")
              }
              className={`mt-1 w-full rounded-md border ${isDark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-white"} ${textColor}`}
            >
              <option value="annual">Annual</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            Add Attendee
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
