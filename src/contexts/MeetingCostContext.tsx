import React, { createContext, useContext, useState, useEffect } from "react";

interface Attendee {
  id: string;
  name: string;
  salary: number;
  salaryType: "hourly" | "annual";
}

interface MeetingCostContextType {
  attendees: Attendee[];
  addAttendee: (attendee: Omit<Attendee, "id">) => void;
  removeAttendee: (id: string) => void;
  currentCost: number;
  elapsedTime: number;
  estimatedTime: number;
  setEstimatedTime: (time: number) => void;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  personalHourlyRate: number;
  setPersonalHourlyRate: (rate: number) => void;
  personalMeetingHours: number;
  setPersonalMeetingHours: (hours: number) => void;
  inefficiencyMetrics: {
    smallTalkTime: number;
    waitingTime: number;
    recapTime: number;
    agendaPresent: boolean;
    roleRelevance: number;
    clarificationTime: number;
    bufferTime: number;
    followUpTime: number;
    decisionDelayTime: number;
    passiveListeningPercentage: number;
  };
  updateInefficiencyMetric: (metric: string, value: number | boolean) => void;
}

const MeetingCostContext = createContext<MeetingCostContextType | undefined>(
  undefined
);

interface MeetingCostProviderProps {
  children: React.ReactNode;
  defaultAttendees?: Array<Omit<Attendee, "id">>;
}

export function MeetingCostProvider({
  children,
  defaultAttendees = [],
}: MeetingCostProviderProps) {
  const [attendees, setAttendees] = useState<Attendee[]>(() =>
    defaultAttendees.map((attendee) => ({
      ...attendee,
      id: Date.now().toString() + Math.random().toString(),
    }))
  );
  // const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentCost, setCurrentCost] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [personalHourlyRate, setPersonalHourlyRate] = useState(0);
  const [personalMeetingHours, setPersonalMeetingHours] = useState(0);
  const [inefficiencyMetrics, setInefficiencyMetrics] = useState({
    smallTalkTime: 5,
    waitingTime: 5,
    recapTime: 5,
    agendaPresent: true,
    roleRelevance: 80,
    clarificationTime: 5,
    bufferTime: 10,
    followUpTime: 10,
    decisionDelayTime: 10,
    passiveListeningPercentage: 30,
  });

  const addAttendee = (attendee: Omit<Attendee, "id">) => {
    setAttendees([...attendees, { ...attendee, id: Date.now().toString() }]);
  };

  const removeAttendee = (id: string) => {
    setAttendees(attendees.filter((attendee) => attendee.id !== id));
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setCurrentCost(0);
  };

  const updateInefficiencyMetric = (
    metric: string,
    value: number | boolean
  ) => {
    setInefficiencyMetrics((prev) => ({ ...prev, [metric]: value }));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        const totalCostPerSecond = attendees.reduce((acc, attendee) => {
          const hourlyRate =
            attendee.salaryType === "annual"
              ? attendee.salary / 2080
              : attendee.salary;
          return acc + hourlyRate / 3600;
        }, 0);
        setCurrentCost((prev) => prev + totalCostPerSecond);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, attendees]);

  return (
    <MeetingCostContext.Provider
      value={{
        attendees,
        addAttendee,
        removeAttendee,
        currentCost,
        elapsedTime,
        estimatedTime,
        setEstimatedTime,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
        personalHourlyRate,
        setPersonalHourlyRate,
        personalMeetingHours,
        setPersonalMeetingHours,
        inefficiencyMetrics,
        updateInefficiencyMetric,
      }}
    >
      {children}
    </MeetingCostContext.Provider>
  );
}

export const useMeetingCost = () => {
  const context = useContext(MeetingCostContext);
  if (context === undefined) {
    throw new Error("useMeetingCost must be used within a MeetingCostProvider");
  }
  return context;
};
