import { useEffect, useState } from "react";

export default function Calendar() {
  const [calendarRange, setCalendarRange] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  useEffect(() => {
    const calendarRange = [new Date(), new Date()];
    while (calendarRange[0].getDay() !== 0) {
      calendarRange[0].setDate(calendarRange[0].getDate() - 1);
    }
    calendarRange[0].setHours(0, 0, 0, 0);
    calendarRange[1].setDate(calendarRange[0].getDate() + 6);
    calendarRange[1].setHours(23, 59, 59, 999);
    setCalendarRange(calendarRange);
  }, []);

  return (
    <div className="h-full flex border justify-center">
      <div className="w-[95%] h-[80%]">
        <div>{calendarRange.map((date) => date.toISOString()).join(", ")}</div>
        <div>{calendarRange[1].toTimeString()}</div>
        <div className="grid grid-cols-[50px_repeat(7,_1fr)] gap-2 bg-amber-500 py-[2px]">
          <div className="bg-amber-50"></div>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold text-center text-xs">
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
