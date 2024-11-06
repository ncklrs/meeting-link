import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DailyMeetingHours {
  [key: string]: number;
}

interface MeetingState {
  salary: number | null;
  salaryType: "hourly" | "annual";
  dailyMeetingHours: DailyMeetingHours;
  recoveryTimePerHour: number;
  isDataSubmitted: boolean;
  setSalary: (salary: number | null) => void;
  setSalaryType: (type: "hourly" | "annual") => void;
  setDailyMeetingHours: (hours: DailyMeetingHours) => void;
  setRecoveryTimePerHour: (time: number) => void;
  setIsDataSubmitted: (isSubmitted: boolean) => void;
  resetAllData: () => void;
}

const initialState = {
  salary: null,
  salaryType: "annual" as const,
  dailyMeetingHours: {
    Monday: 2,
    Tuesday: 3,
    Wednesday: 2,
    Thursday: 4,
    Friday: 1,
  },
  recoveryTimePerHour: 30,
  isDataSubmitted: false,
};

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      ...initialState,
      setSalary: (salary) => set({ salary }),
      setSalaryType: (salaryType) => set({ salaryType }),
      setDailyMeetingHours: (hours) => set({ dailyMeetingHours: hours }),
      setRecoveryTimePerHour: (time) => set({ recoveryTimePerHour: time }),
      setIsDataSubmitted: (isSubmitted) =>
        set({ isDataSubmitted: isSubmitted }),
      resetAllData: () => set(initialState),
    }),
    {
      name: "meeting-storage",
    }
  )
);
