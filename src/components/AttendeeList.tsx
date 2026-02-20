import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AttendeeListProps {
  isDark?: boolean;
}

function getHourlyRate(salary: number, salaryType: "hourly" | "annual"): number {
  return salaryType === "annual" ? salary / 2080 : salary;
}

export function AttendeeList({ isDark = true }: AttendeeListProps) {
  const { attendees, removeAttendee } = useMeetingCost();

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-gray-400" : "text-gray-500";
  const itemBgColor = isDark ? "bg-gray-700" : "bg-gray-100";

  const totalHourlyBurn = attendees.reduce(
    (acc, a) => acc + getHourlyRate(a.salary, a.salaryType),
    0
  );

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor} `}>
      <CardHeader>
        <CardTitle className={textColor}>
          Attendees ({attendees.length})
        </CardTitle>
        {attendees.length > 0 && (
          <p className={`text-sm ${mutedColor}`}>
            Combined burn rate: ${totalHourlyBurn.toFixed(2)}/hr
          </p>
        )}
      </CardHeader>
      <CardContent>
        {attendees.length === 0 ? (
          <p className={`text-sm ${mutedColor}`}>
            No attendees yet. Add people or use the quick-add presets.
          </p>
        ) : (
          <ul className="space-y-2">
            {attendees.map((attendee) => {
              const hourly = getHourlyRate(attendee.salary, attendee.salaryType);
              return (
                <li
                  key={attendee.id}
                  className={`flex items-center justify-between ${itemBgColor} rounded p-2`}
                >
                  <div>
                    <span className={textColor}>{attendee.name}</span>
                    <span className={`ml-2 text-sm ${mutedColor}`}>
                      ${hourly.toFixed(2)}/hr
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAttendee(attendee.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
