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
  setSalary: (salary: number | null) => void;
  setSalaryType: (type: "hourly" | "annual") => void;
  setDailyMeetingHours: (day: string, hours: number) => void;
  setRecoveryTimePerHour: (time: number) => void;
  resetSalary: () => void;
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      salary: null,
      salaryType: "annual",
      dailyMeetingHours: {
        Monday: 2,
        Tuesday: 3,
        Wednesday: 2,
        Thursday: 4,
        Friday: 1,
      },
      recoveryTimePerHour: 30,
      setSalary: (salary) => set({ salary }),
      setSalaryType: (salaryType) => set({ salaryType }),
      setDailyMeetingHours: (day, hours) =>
        set((state) => ({
          dailyMeetingHours: { ...state.dailyMeetingHours, [day]: hours },
        })),
      setRecoveryTimePerHour: (time) => set({ recoveryTimePerHour: time }),
      resetSalary: () => set({ salary: null }),
    }),
    {
      name: "meeting-storage",
    }
  )
);
