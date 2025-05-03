export default function HomePage() {
  return (
    <div className="relative h-full min-h-screen bg-[#C4E9D2] text-gray-900 overflow-hidden">

      <div className="z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-blue-700 drop-shadow-md">
          Welcome to GradeGood
        </h1>
        <p className="mt-6 text-xl max-w-2xl text-gray-800">
          GradeGood helps you meet deadlines, track GPA, and stay on top of your courses.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { title: "📊 Goal Setting", desc: "Input courses, grades, and credits — we do the math and track your academic progress." },
            { title: "⏱️ Built-in Study Timer", desc: "Pomodoro timer to help keep you focused with balanced breaks." },
            { title: "📅 Course + Event Planner", desc: "Organize your classes and events with our custom calendar." }, ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white bg-opacity-80 rounded-2xl border border-green-200 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-2">{f.title}</h3>
              <p className="text-gray-700 text-md">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}