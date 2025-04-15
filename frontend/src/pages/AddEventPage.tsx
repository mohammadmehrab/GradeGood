import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function AddEventPage() {
  const [dateChosen, setDateChosen] = useState<Value>(new Date());
  const [textDate, setTextDate] = useState<string>(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

  const [timeChosen, setTimeChosen] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const [textTime, setTextTime] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const changeCalendarDate = (value: Value) => {
    if (value) {
      setDateChosen(value);
      setTextDate(
        value.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    }
  };

  const changeTextDate = (value: string) => {
    setTextDate(value);
    if (
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(value) &&
      !isNaN(Date.parse(value))
    ) {
      setDateChosen(new Date(value));
    }
  };

  const changeTextTime = (value: string) => {
    setTextTime(value);
    if (/^(0[1-9]|1[0-2]:[0-5]\d (AM|PM))$/.test(value)) {
      setTimeChosen(value);
    }
  };

  return (
    <div className="font-sans h-full flex flex-col items-center">
      <div className="flex flex-row w-[20%] border justify-around text-4xl">
        <div>
          {dateChosen?.toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
          })}
        </div>
        <div>{timeChosen}</div>
      </div>
      <Calendar onChange={changeCalendarDate} value={dateChosen} />
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1/2">
          <label htmlFor="add-event-page-event-name-input" className="m-2">
            Event Name
          </label>
          <input
            id="add-event-page-event-name-input"
            type="text"
            name="add-event-page-event-name-input"
            className="bg-white p-3"
            placeholder="SWE Weekly Meeting"
          />
        </div>
        <div className="flex flex-col flex-1/2">
          <label htmlFor="add-event-page-event-time-input" className="m-2">
            Event Time
          </label>
          <input
            id="add-event-page-event-time-input"
            type="text"
            name="add-event-page-event-time-input"
            className="bg-white p-3"
            placeholder="12:00 PM"
            value={textTime}
            onChange={(event) => changeTextTime(event.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col flex-1/2">
          <label htmlFor="add-event-page-event-date-input" className="m-2">
            Event Date
          </label>
          <input
            id="add-event-page-event-date-input"
            type="text"
            name="add-event-page-event-date-input"
            className="bg-white p-3"
            placeholder="--/--/----"
            value={textDate}
            onChange={(event) => changeTextDate(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
