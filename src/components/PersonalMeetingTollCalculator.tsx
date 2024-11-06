"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { PersonalProductivityLossIndex } from "./PersonalProductivityLossIndex";
import { PersonalRecoveryProfile } from "./PersonalRecoveryProfile";
import { PersonalFlowDistributionChart } from "./PersonalFlowDistributionChart";
import { PersonalMentalLoadIndicator } from "./PersonalMentalLoadIndicator";
import { PersonalImpactSummary } from "./PersonalImpactSummary";
import { useMeetingStore } from "@/store/useMeetingStore";
import { analytics } from "@/lib/segment";
import SalaryInformationCard from "./SalaryInformationCard";
import DailyMeetingHoursCard from "./DailyMeetingHoursCard";
import RecoveryTimeCard from "./RecoveryTimeCard";
import { set } from "react-hook-form";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempSalary, setTempSalary] = useState<number>(Number(salary) || 98000);
  const [tempSalaryType, setTempSalaryType] = useState(salaryType);
  const [tempDailyHours, setTempDailyHours] = useState(dailyMeetingHours);
  const [tempRecoveryTime, setTempRecoveryTime] = useState(recoveryTimePerHour);

  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const accentColor = isDark ? "bg-gray-700" : "bg-secondaryBackground"; // Item background color

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
    setIsDialogOpen(false);
    analytics.track("Calculation Complete", {
      category: "User Engagement",
      label: "Personal Meeting Toll Calculator",
      salary: tempSalary,
      salaryType: tempSalaryType,
      dailyMeetingHours: tempDailyHours,
      recoveryTimePerHour: tempRecoveryTime,
    });
  };

  const handleUpdate = () => {
    // setIsDataSubmitted(false);
    setIsDialogOpen(true);
  };

  const handleReset = () => {
    resetAllData();
    setTempSalary(98000);
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
    <div className={`${bgColor} py-24 sm:py-32 font-sans`}>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className={`text-base/7 font-semibold${textColor}`}>
          What are meetings costing you?
        </h2>
        <p
          className={`my-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight sm:text-5xl ${textColor}`}
        >
          Track and optimize your time spent in meetings
        </p>

        {!isDataSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <SalaryInformationCard
              bgColor={bgColor}
              textColor={textColor}
              tempSalary={Number(tempSalary)}
              setTempSalary={setTempSalary}
              tempSalaryType={tempSalaryType}
              setTempSalaryType={setTempSalaryType}
            />

            <DailyMeetingHoursCard
              bgColor={bgColor}
              textColor={textColor}
              tempDailyHours={tempDailyHours}
              setTempDailyHours={setTempDailyHours}
            />
            <RecoveryTimeCard
              bgColor={bgColor}
              textColor={textColor}
              tempRecoveryTime={tempRecoveryTime}
              setTempRecoveryTime={setTempRecoveryTime}
            />
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit">Calculate</Button>
            </div>
          </form>
        ) : (
          <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              {/* <DialogTrigger asChild>
                <Button type="button" onClick={handleUpdate}>
                  Update
                </Button>
              </DialogTrigger> */}
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <DialogHeader>
                    <DialogTitle>Update Information</DialogTitle>
                    <DialogDescription>
                      Make changes to your information here. Click save when
                      you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <SalaryInformationCard
                      bgColor={bgColor}
                      textColor={textColor}
                      tempSalary={Number(tempSalary)}
                      setTempSalary={setTempSalary}
                      tempSalaryType={tempSalaryType}
                      setTempSalaryType={setTempSalaryType}
                    />
                    <DailyMeetingHoursCard
                      bgColor={bgColor}
                      textColor={textColor}
                      tempDailyHours={tempDailyHours}
                      setTempDailyHours={setTempDailyHours}
                    />
                    <RecoveryTimeCard
                      bgColor={bgColor}
                      textColor={textColor}
                      tempRecoveryTime={tempRecoveryTime}
                      setTempRecoveryTime={setTempRecoveryTime}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
