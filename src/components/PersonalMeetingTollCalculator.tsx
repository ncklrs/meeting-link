"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PersonalProductivityLossIndex } from "./PersonalProductivityLossIndex";
import { PersonalRecoveryProfile } from "./PersonalRecoveryProfile";
import { PersonalFlowDistributionChart } from "./PersonalFlowDistributionChart";
import { PersonalMentalLoadIndicator } from "./PersonalMentalLoadIndicator";
import { PersonalImpactSummary } from "./PersonalImpactSummary";
import { useMeetingStore } from "@/store/useMeetingStore";

export function PersonalMeetingTollCalculator({
  isDark = true,
}: {
  isDark?: boolean;
}) {
  const {
    salary,
    salaryType,
    dailyMeetingHours,
    recoveryTimePerHour,
    isDataSubmitted,
    setSalary,
    setSalaryType,
    setDailyMeetingHours,
    setRecoveryTimePerHour,
    setIsDataSubmitted,
    resetAllData,
  } = useMeetingStore();

  const [tempSalary, setTempSalary] = useState(salary?.toString() || "");
  const [tempSalaryType, setTempSalaryType] = useState(salaryType);
  const [tempDailyHours, setTempDailyHours] = useState(dailyMeetingHours);
  const [tempRecoveryTime, setTempRecoveryTime] = useState(recoveryTimePerHour);

  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const accentColor = isDark ? "text-indigo-400" : "text-indigo-600";

  const calculateHourlyRate = () => {
    if (salary === null) return 0;
    return salaryType === "annual" ? salary / 2080 : salary;
  };

  const totalWeeklyMeetingHours = Object.values(dailyMeetingHours).reduce(
    (sum, hours) => sum + hours,
    0
  );
  const hourlyRate = calculateHourlyRate();
  const weeklyCost = totalWeeklyMeetingHours * hourlyRate;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSalary(Number(tempSalary));
    setSalaryType(tempSalaryType);
    setDailyMeetingHours(tempDailyHours);
    setRecoveryTimePerHour(tempRecoveryTime);
    setIsDataSubmitted(true);
  };

  const handleUpdate = () => {
    setIsDataSubmitted(false);
  };

  const handleReset = () => {
    resetAllData();
    setTempSalary("");
    setTempSalaryType("annual");
    setTempDailyHours({
      Monday: 2,
      Tuesday: 3,
      Wednesday: 2,
      Thursday: 4,
      Friday: 1,
    });
    setTempRecoveryTime(30);
  };

  return (
    <div className={`${bgColor} min-h-screen py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${textColor} mb-8`}>
          Personal Meeting Toll Calculator
        </h1>

        {!isDataSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className={bgColor}>
              <CardHeader>
                <CardTitle className={textColor}>Salary Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="salary" className={textColor}>
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    value={tempSalary}
                    onChange={(e) => setTempSalary(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className={textColor}>Salary Type</Label>
                  <div className="mt-1 space-x-4">
                    <label className={textColor}>
                      <input
                        type="radio"
                        name="salaryType"
                        value="hourly"
                        checked={tempSalaryType === "hourly"}
                        onChange={() => setTempSalaryType("hourly")}
                        className="mr-2"
                      />
                      Hourly
                    </label>
                    <label className={textColor}>
                      <input
                        type="radio"
                        name="salaryType"
                        value="annual"
                        checked={tempSalaryType === "annual"}
                        onChange={() => setTempSalaryType("annual")}
                        className="mr-2"
                      />
                      Annual
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

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
              </CardContent>
            </Card>

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
                        onChange={(e) =>
                          setTempRecoveryTime(Number(e.target.value))
                        }
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

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit">Calculate</Button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className={bgColor}>
                <CardHeader>
                  <CardTitle className={textColor}>
                    Salary Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={textColor}>
                    {salaryType === "annual" ? "Annual" : "Hourly"} Salary: $
                    {salary?.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card className={bgColor}>
                <CardHeader>
                  <CardTitle className={textColor}>
                    Daily Meeting Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(dailyMeetingHours).map(([day, hours]) => (
                    <p key={day} className={textColor}>
                      {day}: {hours} hours
                    </p>
                  ))}
                  <p className={`${textColor} font-semibold mt-2`}>
                    Total Weekly Meeting Hours:{" "}
                    {totalWeeklyMeetingHours.toFixed(1)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className={`${bgColor} mb-8`}>
              <CardHeader>
                <CardTitle className={textColor}>Recovery Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={textColor}>
                  Recovery Time per Meeting Hour: {recoveryTimePerHour} minutes
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              <PersonalProductivityLossIndex
                totalWeeklyMeetingHours={totalWeeklyMeetingHours}
                isDark={isDark}
              />
              <PersonalRecoveryProfile
                dailyMeetingHours={dailyMeetingHours}
                recoveryTimePerHour={recoveryTimePerHour}
                isDark={isDark}
              />
              <PersonalMentalLoadIndicator
                totalWeeklyMeetingHours={totalWeeklyMeetingHours}
                isDark={isDark}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <PersonalFlowDistributionChart
                dailyMeetingHours={dailyMeetingHours}
                isDark={isDark}
              />
              <PersonalImpactSummary
                totalWeeklyMeetingHours={totalWeeklyMeetingHours}
                weeklyCost={weeklyCost}
                hourlyRate={hourlyRate}
                isDark={isDark}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleUpdate}>Update Information</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
