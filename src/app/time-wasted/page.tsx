"use client";
import { PersonalCostCalculator } from "@/components/PersonalCostCalculator";
import { OptInBanner } from "@/components/OptInBanner";

interface PersonalCostCalculatorProps {
  isDark?: boolean;
}
export default function PersoanlCostPage({
  isDark = false,
}: PersonalCostCalculatorProps) {
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  return (
    <>
      <OptInBanner />
      <div className={`${bgColor} py-24 sm:py-32 font-sans`}>
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2
            className={`text-base/7 font-semibold text-cyan-600 ${textColor}`}
          >
            Spend a lot of time in meetings?
          </h2>
          <p
            className={`mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight sm:text-5xl ${textColor}`}
          >
            Identify the cost of your time in meetings
          </p>
          <div className="mt-10">
            <PersonalCostCalculator isDark={false} />
          </div>
        </div>
      </div>
    </>
  );
}
