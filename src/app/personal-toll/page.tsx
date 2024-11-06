import { PersonalMeetingTollCalculator } from "@/components/PersonalMeetingTollCalculator";
import { OptInBanner } from "@/components/OptInBanner";

export default function PersonalMeetingTollPage() {
  return (
    <>
      {/* <OptInBanner /> */}
      <PersonalMeetingTollCalculator isDark={false} />
    </>
  );
}
