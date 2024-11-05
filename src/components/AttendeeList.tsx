import { useMeetingCost } from "@/contexts/MeetingCostContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AttendeeListProps {
  isDark?: boolean;
}

export function AttendeeList({ isDark = true }: AttendeeListProps) {
  const { attendees, removeAttendee } = useMeetingCost();

  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const itemBgColor = isDark ? "bg-gray-700" : "bg-gray-100";

  return (
    <Card className={`h-full w-full overflow-hidden ${bgColor} `}>
      <CardHeader>
        <CardTitle className={textColor}>Attendees</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {attendees.map((attendee) => (
            <li
              key={attendee.id}
              className={`flex items-center justify-between ${itemBgColor} rounded p-2`}
            >
              <span className={textColor}>
                {attendee.name}
                {/* - ${attendee.salary} ({attendee.salaryType}) */}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAttendee(attendee.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
