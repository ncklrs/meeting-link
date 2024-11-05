"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface Attendee {
  id: number;
  name: string;
  salary: number;
  salaryType: "hourly" | "annual";
}

interface MeetingCostContextType {
  attendees: Attendee[];
  addAttendee: (attendee: Omit<Attendee, "id">) => void;
  removeAttendee: (id: number) => void;
  estimatedTime: number;
  setEstimatedTime: (time: number) => void;
  currentCost: number;
  elapsedTime: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const MeetingCostContext = createContext<MeetingCostContextType | undefined>(
  undefined
);

export const useMeetingCost = () => {
  const context = useContext(MeetingCostContext);
  if (!context) {
    throw new Error("useMeetingCost must be used within a MeetingCostProvider");
  }
  return context;
};

interface MeetingCostProviderProps {
  children: React.ReactNode;
  defaultAttendees?: Omit<Attendee, "id">[];
}

export const MeetingCostProvider: React.FC<MeetingCostProviderProps> = ({
  children,
  defaultAttendees = [],
}) => {
  const [attendees, setAttendees] = useState<Attendee[]>(() =>
    defaultAttendees.map((attendee) => ({
      ...attendee,
      id: Date.now() + Math.random(),
    }))
  );
  const [estimatedTime, setEstimatedTime] = useState(60);
  const [currentCost, setCurrentCost] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const calculateCost = useCallback(() => {
    const totalCost = attendees.reduce((acc, attendee) => {
      const hourlyRate =
        attendee.salaryType === "annual"
          ? attendee.salary / 2080
          : attendee.salary;
      return acc + (hourlyRate / 3600) * elapsedTime;
    }, 0);
    setCurrentCost(totalCost);
  }, [attendees, elapsedTime]);

  useEffect(() => {
    calculateCost();
  }, [elapsedTime, attendees, calculateCost]);

  const addAttendee = (attendee: Omit<Attendee, "id">) => {
    setAttendees([...attendees, { ...attendee, id: Date.now() }]);
  };

  const removeAttendee = (id: number) => {
    setAttendees(attendees.filter((attendee) => attendee.id !== id));
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setCurrentCost(0);
  };

  return (
    <MeetingCostContext.Provider
      value={{
        attendees,
        addAttendee,
        removeAttendee,
        estimatedTime,
        setEstimatedTime,
        currentCost,
        elapsedTime,
        isRunning,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </MeetingCostContext.Provider>
  );
};
