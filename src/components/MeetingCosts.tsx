import {
  MeetingCostProvider,
  useMeetingCost,
} from "@/contexts/MeetingCostContext";
import { CostCounter } from "./CostCounter";
import { TimerControls } from "./TimerControls";
import { EstimatedCost } from "./EstimatedCost";
import { AddAttendeeForm } from "./AddAttendeeForm";
import { AttendeeList } from "./AttendeeList";
import { ProductivityLossIndex } from "./ProductivityLossIndex";
import { MentalLoadIndicator } from "./MentalLoadIndicator";
import { FlowDisruptionChart } from "./FlowDisruptionChart";
import { CustomizedRecoveryProfile } from "./CustomizedRecoveryProfile";
import { ImpactSummary } from "./ImpactSummary";
import { PersonalCalculator } from "./PersonalCalculator";
import { MeetingInefficiencyCalculator } from "./MeetingInefficiencyCalculator";

interface MeetingCostCalculatorProps {
  isDark?: boolean;
}

function MeetingCostCalculatorContent({
  isDark = true,
}: MeetingCostCalculatorProps) {
  const { estimatedTime, setEstimatedTime } = useMeetingCost();

  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <div className={`${bgColor} py-24 sm:py-32`}>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-indigo-400">
          Meeting Cost Calculator
        </h2>
        <p
          className={`mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight ${textColor} sm:text-5xl`}
        >
          Track the true cost and impact of your meetings
        </p>
        <div className="mt-10">
          <EstimatedCost isDark={isDark} />
        </div>
        <div className="mt-10">
          <MeetingInefficiencyCalculator isDark={isDark} />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-4">
          <div className="flex p-px lg:col-span-4 lg:row-span-2">
            <CostCounter isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-2">
            <AddAttendeeForm isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-2">
            <ProductivityLossIndex isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-2">
            <MentalLoadIndicator isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-4">
            <FlowDisruptionChart isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-2">
            <CustomizedRecoveryProfile isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-3">
            <ImpactSummary isDark={isDark} />
          </div>
          <div className="flex p-px lg:col-span-3">
            <PersonalCalculator isDark={isDark} />
          </div>
        </div>
        <TimerControls isDark={isDark} />
        <div className="mt-6">
          <AttendeeList isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

export function MeetingCostCalculator(props: MeetingCostCalculatorProps) {
  return (
    <MeetingCostProvider>
      <MeetingCostCalculatorContent {...props} />
    </MeetingCostProvider>
  );
}
