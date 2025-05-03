import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authcontext";
import { Event, Recurrence } from "@prisma/client";
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

      let events: Event[] = await res.json();

      const nonRecurringEvents = events.filter(
        (event) => event.recurrence === Recurrence.NONE
      );

      console.log("nonrecurring events", nonRecurringEvents);

      const formattedEvents: CalendarEvent[] = nonRecurringEvents.map(
        (event: Event) => ({
          id: "" + event.eventId,
          title: event.title,
          start: new Date(event.startTime).toLocaleString("sv").slice(0, -3),
          end: new Date(event.endTime).toLocaleString("sv").slice(0, -3),
          description: event.description,
        })
      );

      console.log("formatted events pre:", formattedEvents);

      const recurringEvents = events.filter(
        (event) => event.recurrence !== Recurrence.NONE
      );

      console.log("recurring events", recurringEvents);

      const getRecurringDate = (
        originalDate: Date,
        recur: Recurrence,
        multiple: number
      ) => {
        let date;
        switch (recur) {
          case Recurrence.DAILY:
            date = new Date(originalDate);
            date.setDate(date.getDate() + multiple);
            return date;
          case Recurrence.WEEKLY:
            date = new Date(originalDate);
            date.setDate(date.getDate() + multiple * 7);
            return date;
          case Recurrence.MONTHLY:
            date = new Date(originalDate);
            date.setMonth(date.getMonth() + multiple);
            return date;
          case Recurrence.YEARLY:
            date = new Date(originalDate);
            date.setFullYear(date.getFullYear() + multiple);
            return date;
          default:
            throw "error: couldnt get proper date";
        }
      };

      recurringEvents.forEach((event) => {
        for (let i = 0; i <= 10; i++) {
          formattedEvents.push({
            id: event.eventId * 1000 + i + "",
            title: event.title,
            start: getRecurringDate(event.startTime, event.recurrence, i)
              .toLocaleString("sv")
              .slice(0, -3),
            end: getRecurringDate(event.endTime, event.recurrence, i)
              .toLocaleString("sv")
              .slice(0, -3),
            description: event.description,
          });
        }

        for (let i = -1; i >= -10; i--) {
          formattedEvents.push({
            id: event.eventId * 1000 + i + "",
            title: event.title,
            start: getRecurringDate(event.startTime, event.recurrence, i)
              .toLocaleString("sv")
              .slice(0, -3),
            end: getRecurringDate(event.endTime, event.recurrence, i)
              .toLocaleString("sv")
              .slice(0, -3),
            description: event.description,
          });
        }
      });

      console.log("formatted events", formattedEvents);
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
