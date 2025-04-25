import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  CalendarEventExternal,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

type CalendarProps = {
  events: CalendarEventExternal[];
};

export default function Calendar(props: CalendarProps) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  console.log("prop events", props.events);

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    // events: [
    //   {
    //     id: 1,
    //     title: "Coffee with John",
    //     start: "2025-04-26 10:05",
    //     end: "2025-04-26 12:35",
    //     description:
    //       "blahasdasd asd asd asd asdasdsssssssssssssssssssasdasdasdasd",
    //   },
    //   {
    //     id: 2,
    //     title: "Ski trip",
    //     start: "2025-04-27",
    //     end: "2025-04-27",
    //   },
    // ],
    events: props.events,
    plugins: [eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return <ScheduleXCalendar calendarApp={calendar} />;
}
