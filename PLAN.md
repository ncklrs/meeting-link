# Calculator Improvements Plan

## Current State

The meeting cost calculator has a solid foundation but several features are incomplete or
disabled, and key usability improvements are missing. Here's what needs fixing:

**Broken/Incomplete:**
- MeetingInefficiencyCalculator only renders 2 of 10 tracked metrics (rest left as a comment: "Add the rest here")
- The `/time-wasted` page has 4 components commented out (ImpactSummary, PersonalCalculator, MeetingInefficiencyCalculator, PersonalCostCalculator)
- The landing page has MeetingCostCalculator commented out
- AttendeeList hides salary info (commented out on line 31)
- No input validation on forms (can add attendees with negative salary, NaN estimated time, etc.)

**Missing features that would make it useful:**

---

## Plan (8 steps)

### Step 1: Complete the MeetingInefficiencyCalculator

**File:** `src/components/MeetingInefficiencyCalculator.tsx`

Add the 8 missing InefficiencyCard entries for all metrics already tracked in context:
- `recapTime` (0-15 min slider)
- `clarificationTime` (0-15 min slider)
- `bufferTime` (0-30 min slider)
- `followUpTime` (0-30 min slider)
- `decisionDelayTime` (0-30 min slider)
- `passiveListeningPercentage` (0-100% — display as percentage of estimated time wasted)
- `roleRelevance` (0-100% — show cost of irrelevant time)
- `agendaPresent` (boolean toggle — show flat "no agenda" penalty)

Each card already follows a consistent pattern via `<InefficiencyCard>`. This is straightforward.

### Step 2: Uncomment and wire up the `/time-wasted` page

**File:** `src/app/time-wasted/page.tsx`

- Uncomment `ImpactSummary`, `MeetingInefficiencyCalculator`, `PersonalCalculator`, and `PersonalCostCalculator`
- Remove the nested `<MeetingCostCalculator>` wrapper (it creates a duplicate `MeetingCostProvider`) since the page already wraps everything in one
- Verify each component renders correctly with `isDark={false}`

### Step 3: Add input validation and error handling

**Files:** `AddAttendeeForm.tsx`, `EstimatedCost.tsx`, `MeetingCostContext.tsx`

- Validate salary is a positive number before adding attendee
- Validate name is non-empty and trimmed
- Guard `setEstimatedTime` against NaN/negative values
- Show inline validation messages on the form
- Prevent adding duplicate attendee names (optional warning)

### Step 4: Add a meeting cost summary/report card

**New component:** `MeetingSummary.tsx`

After stopping the timer, show a summary card with:
- Total meeting duration
- Total cost
- Cost per attendee (average)
- Cost per minute
- Comparison: "This meeting cost as much as X hours of [relatable item]"
- Inefficiency breakdown (what percentage of cost was wasted)

This gives users an actionable takeaway from each meeting.

### Step 5: Add export/share functionality

**New component:** `ExportButton.tsx`

Allow users to export meeting results:
- **Copy to clipboard** — formatted text summary of meeting cost + attendees
- **Download as CSV** — attendee list with costs, meeting totals
- Share-friendly text format for Slack/email: "Our 45-min meeting with 6 people cost $342.50"

### Step 6: Add cost threshold alerts

**Files:** `MeetingCostContext.tsx`, `CostCounter.tsx`

- Add a configurable cost threshold (e.g., $100, $500)
- When real-time cost exceeds threshold, change the cost display color to red/warning
- Show a subtle notification: "This meeting has exceeded $X"
- Optional: browser notification support

### Step 7: Improve attendee management UX

**Files:** `AttendeeList.tsx`, `AddAttendeeForm.tsx`

- Show salary info in the attendee list (uncomment and format it properly as hourly rate)
- Show each attendee's per-hour cost contribution
- Add quick-add presets: "Engineer ($150k)", "Designer ($120k)", "Manager ($130k)" etc.
- Add "Edit attendee" capability (click to modify salary/name)
- Show attendee count and total hourly burn rate at the top of the list

### Step 8: Enable the calculator on the landing page

**File:** `src/app/page.tsx`

- Uncomment `<MeetingCostCalculator isDark={false} />` on the landing page
- This gives visitors an immediate interactive demo instead of just the manifesto

---

## Priority Order

| Priority | Step | Impact | Effort |
|----------|------|--------|--------|
| 1 | Step 2: Uncomment /time-wasted page | High — unlocks 4 hidden features | Low |
| 2 | Step 1: Complete inefficiency cards | High — finishes half-built feature | Low |
| 3 | Step 8: Enable landing page calculator | High — first impression | Trivial |
| 4 | Step 3: Input validation | Medium — prevents broken states | Low |
| 5 | Step 7: Attendee UX improvements | Medium — daily usability | Medium |
| 6 | Step 4: Meeting summary card | High — actionable output | Medium |
| 7 | Step 5: Export/share | High — viral growth + utility | Medium |
| 8 | Step 6: Cost threshold alerts | Medium — engagement feature | Medium |
