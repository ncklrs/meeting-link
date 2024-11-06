import React from "react";

interface ManifestoProps {
  isDark: boolean;
}

const Manifesto: React.FC<ManifestoProps> = ({ isDark }) => {
  const bgColor = isDark ? "bg-gray-800" : "bg-background"; // Background color
  const textColor = isDark ? "text-gray-50" : "text-primaryText"; // Primary text color
  const itemBgColor = isDark ? "bg-gray-700" : "bg-secondaryBackground"; // Item background color

  return (
    <section className={`${bgColor} ${textColor} p-8 rounded-lg shadow-lg`}>
      {/* <h1 className="text-3xl font-bold mb-4">
        The Minimalist's Manifesto for Meetings That Matter
      </h1> */}

      <p className="mb-4">
        Meetings, meetings everywhere — and not a minute to think! We've reached
        peak meeting madness, folks. Death by 1,000 Zoom calls. Slavery to the
        calendar. Beaten down by back-to-back briefings.
      </p>

      <p className="mb-4">But it doesn't have to be this way.</p>

      <p className="mb-4">
        We, the under-caffeinated, the easily distracted, the gently affronted,
        hereby declare:
      </p>

      <div className={`p-4 rounded ${itemBgColor} mb-4`}>
        <p>🚫 No more aimless agendas</p>
        <p>🚫 Down with the dreaded "just a quick sync"</p>
        <p>🚫 Enough with the last-minute invites</p>
      </div>

      <p className="font-bold mb-4">
        Hear our battle cry: Meetings must have PURPOSE. They must have
        STRUCTURE. They must have a clear OUTCOME.
      </p>

      <p className="mb-4">We will no longer subject ourselves to:</p>

      <div className={`p-4 rounded ${itemBgColor} mb-4`}>
        <p>✂️ Scissoring our focus between too many open tabs</p>
        <p>⏱️ Waiting endlessly for the late stragglers</p>
        <p>😓 Enduring the torture of the CEO's PowerPoint deck</p>
        <p>🤯 Losing our train of thought amid the back-and-forth</p>
      </div>

      <p className="mb-4">
        No more squandering our precious brain cells and dwindling attention
        spans!
      </p>

      <p className="mb-4">
        The mental toll is real, people. That quick "let's sync up" snowballs
        into a day of disjointed task-switching, draining our energy and
        creativity. And good luck trying to enter a state of deep work when your
        calendar is booked solid.
      </p>

      <p className="mb-4">
        Too many "hello, hellos" and not enough flow. The context-switching
        penalty is severe - it can take up to 23 minutes to refocus after an
        interruption. That's time we'll never get back.
      </p>

      <p className="mb-4">
        And what about the hit to our productivity? All those delayed
        follow-ups, postponed projects, and missed deadlines add up fast. The
        raw cost is staggering when you factor in team salaries.
      </p>

      <p className="font-bold mb-4">We demand:</p>

      <div className={`p-4 rounded ${itemBgColor} mb-4`}>
        <p>✍️ Carefully crafted meeting agendas</p>
        <p>🕰️ Strict start and stop times</p>
        <p>🧠 Space for thoughtful participation</p>
        <p>🎯 Actionable next steps — not just "we'll follow up"</p>
      </div>

      <p className="mb-4">Admit it. You're tired too. Join the movement.</p>

      <p className="mb-4">
        Let's break the cycle of "meetings about meetings" and get back to doing
        REAL work.
      </p>

      <p className="font-bold text-lg">Are you with us?</p>

      <div className="mt-4">
        <p>#NoMoreMeetingMadness</p>
        <p>#OnlyEffectiveMeetings</p>
        <p>#TheEndOfZoomFatigue</p>
      </div>
    </section>
  );
};

export default Manifesto;
