import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../contexts/authcontext";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function AddEventPage() {
  const { currentUser } = useAuth();

  const [dateChosen, setDateChosen] = useState<Value>(new Date());
  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");

  const [currentUserId, setCurrentUserId] = useState<number>(0);

  useEffect(() => {
    async function getCurrentUserId() {
      if (currentUser) {
        const res = await fetch(
          `http://localhost:3000/users?email=${currentUser.email}`
        );
        const data = await res.json();
        setCurrentUserId(data.id);
      }
    }

    getCurrentUserId();
  }, [currentUser]);

  const [textDate, setTextDate] = useState<string>(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );

  const [startTimeChosen, setStartTimeChosen] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const [endTimeChosen, setEndTimeChosen] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const [startTextTime, setStartTextTime] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const [endTextTime, setEndTextTime] = useState<string>(
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

  const changeStartTextTime = (value: string) => {
    setStartTextTime(value);
    console.log('"' + value + '"');
    console.log(/^(([1-9]|0[1-9]|1[0-2]):[0-5]\d (AM|PM))$/.test(value));
    if (/^((0[1-9]|1[0-2]):[0-5]\d (AM|PM))$/.test(value)) {
      console.log("test");
      setStartTimeChosen(value);
    }
  };

  const changeEndTextTime = (value: string) => {
    setEndTextTime(value);
    if (/^((0[1-9]|1[0-2]):[0-5]\d (AM|PM))$/.test(value)) {
      setEndTimeChosen(value);
    }
  };

  const addEvent = async () => {
    console.log(
      eventName,
      eventDescription,
      startTimeChosen,
      endTimeChosen,
      dateChosen
    );

    if (!dateChosen) {
      throw "no date chosen";
    }

    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: eventName,
        description: eventDescription,
        startTime: startTimeChosen,
        endTime: endTimeChosen,
        date: dateChosen.toLocaleString("sv"),
        userId: currentUserId,
      }),
    });

    const data = await res.json();

    console.log(data);
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
        <div>{startTimeChosen}</div>
        <div>{endTimeChosen}</div>
      </div>
      <Calendar onChange={changeCalendarDate} value={dateChosen} />

      <div className="border w-[40%]">
        <div className="flex flex-col">
          <label htmlFor="add-event-page-event-name-input" className="m-2">
            Event Name
          </label>
          <input
            id="add-event-page-event-name-input"
            type="text"
            name="add-event-page-event-name-input"
            className="bg-white p-3"
            placeholder="SWE Weekly Meeting"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="add-event-page-event-description-input"
            className="m-2"
          >
            Event Description
          </label>
          {/* <input
            id="add-event-page-event-description-input"
            type="text"
            name="add-event-page-event-description-input"
            className="bg-white p-3"
            placeholder="SWE Weekly Meeting"
            onChange={(event) => setEventName(event.target.value)}
          /> */}

          <textarea
            value={eventDescription}
            onChange={(event) => setEventDescription(event.target.value)}
            rows={10}
            cols={50}
            className="bg-white p-[10px]"
            placeholder="Weekly meeting for SWE to discuss project progress and future goals"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="add-event-page-event-start-time-input"
            className="m-2"
          >
            Start Time
          </label>
          <input
            id="add-event-page-event-start-time-input"
            type="text"
            name="add-event-page-event-start-time-input"
            className="bg-white p-3"
            placeholder="12:00 PM"
            value={startTextTime}
            onChange={(event) => changeStartTextTime(event.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="add-event-page-event-end-time-input" className="m-2">
            End Time
          </label>
          <input
            id="add-event-page-event-end-time-input"
            type="text"
            name="add-event-page-event-end-time-input"
            className="bg-white p-3"
            placeholder="12:00 PM"
            value={endTextTime}
            onChange={(event) => changeEndTextTime(event.target.value)}
          />
        </div>

        {/* <div className="flex flex-col">
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
        </div> */}

        <div className="flex flex-col">
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

        <div className="flex flex-col items-center">
          <button
            className="bg-orange-400 rounded-lg p-2 m-2 w-[30%]"
            onClick={addEvent}
          >
            Add Event
          </button>
        </div>
      </div>

      {/* <div className="flex flex-row gap-4">
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
      </div> */}
    </div>
  );
}
