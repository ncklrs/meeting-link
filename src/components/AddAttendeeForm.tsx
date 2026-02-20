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

const PRESETS = [
  { label: "Engineer ($150k)", name: "Engineer", salary: 150000, salaryType: "annual" as const },
  { label: "Designer ($120k)", name: "Designer", salary: 120000, salaryType: "annual" as const },
  { label: "Manager ($130k)", name: "Manager", salary: 130000, salaryType: "annual" as const },
  { label: "Executive ($200k)", name: "Executive", salary: 200000, salaryType: "annual" as const },
];

export function AddAttendeeForm({ isDark = true }: AddAttendeeFormProps) {
  const { addAttendee } = useMeetingCost();
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState<"hourly" | "annual">("annual");
  const [errors, setErrors] = useState<{ name?: string; salary?: string }>({});

  const validate = (): boolean => {
    const newErrors: { name?: string; salary?: string } = {};
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required";
    }
    const parsedSalary = parseFloat(salary);
    if (!salary || isNaN(parsedSalary)) {
      newErrors.salary = "Valid salary is required";
    } else if (parsedSalary <= 0) {
      newErrors.salary = "Salary must be positive";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addAttendee({
      name: name.trim(),
      salary: parseFloat(salary),
      salaryType,
    });
    setName("");
    setSalary("");
    setErrors({});
  };

  const handlePreset = (preset: typeof PRESETS[number]) => {
    addAttendee({
      name: preset.name,
      salary: preset.salary,
      salaryType: preset.salaryType,
    });
  };

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const errorColor = "text-red-500 text-sm mt-1";

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor} `}>
      <CardHeader>
        <CardTitle className={textColor}>Add Attendee</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handlePreset(preset)}
              className="text-xs"
            >
              + {preset.label}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className={textColor}>
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
              placeholder="e.g. Jane Smith"
              className="mt-1"
            />
            {errors.name && <p className={errorColor}>{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="salary" className={textColor}>
              Salary
            </Label>
            <Input
              id="salary"
              type="number"
              min="0"
              step="any"
              value={salary}
              onChange={(e) => { setSalary(e.target.value); setErrors((prev) => ({ ...prev, salary: undefined })); }}
              placeholder={salaryType === "annual" ? "e.g. 120000" : "e.g. 75"}
              className="mt-1"
            />
            {errors.salary && <p className={errorColor}>{errors.salary}</p>}
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
