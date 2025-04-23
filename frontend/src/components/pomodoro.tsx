import { useEffect, useState } from "react";

type Mode = "work" | "shortBreak" | "longBreak";

export default function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const [mode, setMode] = useState<Mode>("work");
  const [secondsLeft, setSecondsLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setSecondsLeft(getDuration());
  }, [workDuration, shortBreakDuration, longBreakDuration, mode]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSessionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getDuration = () => {
    if (mode === "work") return workDuration * 60;
    if (mode === "shortBreak") return shortBreakDuration * 60;
    return longBreakDuration * 60;
  };

  const handleSessionEnd = () => {
    if (mode === "work") {
      const next = sessionCount + 1;
      setSessionCount(next);
      setMode(next % 4 === 0 ? "longBreak" : "shortBreak");
    } else {
      setMode("work");
    }
    setIsRunning(false);
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Pomodoro Timer</h1>

      <div className="flex justify-center gap-2 mb-6">
        {(["work", "shortBreak", "longBreak"] as Mode[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setMode(type);
              setSecondsLeft(getDuration());
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded ${
              mode === type ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {type === "work"
              ? "Pomodoro"
              : type === "shortBreak"
              ? "Short Break"
              : "Long Break"}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="text-6xl font-mono">{formatTime(secondsLeft)}</p>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pomodoro (min)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={workDuration}
            onChange={(e) => setWorkDuration(+e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short Break (min)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={shortBreakDuration}
            onChange={(e) => setShortBreakDuration(+e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Long Break (min)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={longBreakDuration}
            onChange={(e) => setLongBreakDuration(+e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}