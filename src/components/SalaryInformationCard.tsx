import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SalaryInformationCardProps {
  bgColor: string;
  textColor: string;
  tempSalary: number;
  setTempSalary: (value: number) => void;
  tempSalaryType: "annual" | "hourly";
  setTempSalaryType: React.Dispatch<React.SetStateAction<"annual" | "hourly">>;
}

const SalaryInformationCard: React.FC<SalaryInformationCardProps> = ({
  bgColor,
  textColor,
  tempSalary,
  setTempSalary,
  tempSalaryType,
  setTempSalaryType,
}) => {
  return (
    <Card className={bgColor}>
      <CardHeader>
        <CardTitle className={textColor}>Salary Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="salary" className={textColor}>
            Salary
          </Label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <Input
              id="salary"
              type="number"
              value={tempSalary}
              onChange={(e) => setTempSalary(Number(e.target.value))}
              required
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="salaryType" className="sr-only">
                Salary Type
              </label>
              <select
                id="salaryType"
                name="salaryType"
                value={tempSalaryType}
                onChange={(e) =>
                  setTempSalaryType(e.target.value as "annual" | "hourly")
                }
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option value="hourly">Hourly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryInformationCard;
