import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authcontext";
import { Event } from "@prisma/client";
import Calendar from "./Calendar";

type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
};

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoaded, setEventsLoaded] = useState<boolean>(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function getUserEvents() {
      let res = await fetch(
        `http://localhost:3000/users?email=${currentUser?.email}`
      );
      let user = await res.json();

      res = await fetch(`http://localhost:3000/users/${user.id}/events`);

      let events = await res.json();

      const formattedEvents: CalendarEvent[] = events.map((event: Event) => ({
        id: event.eventId,
        title: event.title,
        start: new Date(event.startTime).toLocaleString("sv").slice(0, -3),
        end: new Date(event.endTime).toLocaleString("sv").slice(0, -3),
        description: event.description,
      }));
      console.log(formattedEvents);
      setCalendarEvents(formattedEvents);
      setEventsLoaded(true);
    }

    if (currentUser) getUserEvents();
  }, [currentUser]);

  return (
    <div>
      {eventsLoaded ? <Calendar events={calendarEvents} /> : <div></div>}
    </div>
  );
}
