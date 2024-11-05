import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Button } from "@/components/ui/button";

interface TimerControlsProps {
  isDark?: boolean;
}

export function TimerControls({ isDark = true }: TimerControlsProps) {
  const { isRunning, startTimer, stopTimer, resetTimer } = useMeetingCost();

  const buttonVariant = isDark ? "default" : "outline";

  return (
    <div className="mt-6 space-x-4">
      <Button
        variant={buttonVariant}
        onClick={isRunning ? stopTimer : startTimer}
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
      <Button variant={buttonVariant} onClick={resetTimer}>
        Reset
      </Button>
    </div>
  );
}
