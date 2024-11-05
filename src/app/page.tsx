import { MeetingCostCalculator } from "@/components/MeetingCostCalculator";
import { OptInBanner } from "@/components/OptInBanner";

export default function LandingPage() {
  return (
    <>
      <OptInBanner />
      <MeetingCostCalculator />
    </>
  );
}
