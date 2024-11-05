"use client";
import { MeetingCostProvider } from "@/contexts/MeetingCostContext";
import { CostCounter } from "./CostCounter";
import { TimerControls } from "./TimerControls";
import { EstimatedCost } from "./EstimatedCost";
import { AddAttendeeForm } from "./AddAttendeeForm";
import { AttendeeList } from "./AttendeeList";

interface MeetingCostCalculatorProps {
  isDark?: boolean;
}
type Attendee = {
  name: string;
  salary: number;
  salaryType: "annual" | "hourly";
};

const defaultAttendees: Array<Omit<Attendee, "id">> = [
  { name: "John Doe", salary: 60000, salaryType: "annual" },
  { name: "Jane Smith", salary: 30, salaryType: "hourly" },
  { name: "Alice Johnson", salary: 25, salaryType: "hourly" },
  { name: "Bob Brown", salary: 140000, salaryType: "annual" },
];

export function MeetingCostCalculator({
  isDark = true,
}: MeetingCostCalculatorProps) {
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";

  return (
    <MeetingCostProvider defaultAttendees={defaultAttendees}>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Meeting Cost Calculator
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
            Track and optimize your meeting costs
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:col-span-2 lg:row-span-1">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <CostCounter isDark={false} />
                <div className="p-4">
                  <TimerControls isDark={false} />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tl-[2rem]" />
            </div>
            <div className="relative lg:col-span-1 lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                <AttendeeList isDark={false} />
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            <div className="relative lg:col-span-1 lg:row-span-1">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                <EstimatedCost isDark={false} />
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            <div className="relative lg:col-span-1 lg:row-span-1">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <AddAttendeeForm isDark={false} />
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-br-[2rem]" />
            </div>
          </div>
        </div>
      </div>
    </MeetingCostProvider>
  );
}
