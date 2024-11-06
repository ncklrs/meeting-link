"use client";
import { MeetingInefficiencyCalculator } from "@/components/MeetingIneficency";
import { PersonalCostCalculator } from "@/components/PersonalCostCalculator";
import { OptInBanner } from "@/components/OptInBanner";
import { PersonalCalculator } from "@/components/PersonalCalculator";
import { MeetingCostProvider } from "@/contexts/MeetingCostContext";
import { ImpactSummary } from "@/components/ImpactSummary";
import { MeetingCostCalculator } from "@/components/MeetingCosts";

export default function PersonalCostPage() {
  // Set isDark based on your preferred condition (hardcoded to false here for example)
  const isDark = false;
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <>
      {/* <OptInBanner /> */}
      <MeetingCostProvider>
        <div className={`${bgColor} py-24 sm:py-32 font-sans`}>
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className={`text-base/7 font-semibold ${textColor}`}>
              Spend a lot of time in meetings?
            </h2>
            <p
              className={`mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight sm:text-5xl ${textColor}`}
            >
              Identify the cost of your time in meetings
            </p>
            <div className="mt-10">
              <MeetingCostCalculator isDark={isDark} />
            </div>
            <div className="mt-10">
              {/* <ImpactSummary isDark={isDark} /> */}
              {/* <PersonalCalculator isDark={isDark} /> */}
              {/* <MeetingInefficiencyCalculator isDark={isDark} /> */}
              {/* <PersonalCostCalculator isDark={isDark} /> */}
            </div>
          </div>
        </div>
      </MeetingCostProvider>
    </>
  );
}
