import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

type Policy = {
  name: string;
  goal: number;
  progress: number[];
};

type ProgChartItems = {
  pols: Policy[];
};

export default function ProgChart({ pols }: ProgChartItems) {
  const numPolicies = Math.max(...pols.map((p) => p.progress.length));
  const lineColors = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "purple",
    "pink",
  ];

  const data = Array.from({ length: numPolicies }).map((_, i) => {
    const entry: { [key: string]: any } = { name: i + 1 };
    pols.forEach((p) => {
      entry[p.name] = p.progress[i] ?? null;
    });
    return entry;
  });
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "Element index",
              position: "insideBottom",
              offset: -5,
            }}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            domain={[0, 100]}
            label={{
              value: "Grade",
              position: "insideLeft",
              angle: -90,
            }}
          />

          <Legend />
          <Tooltip />
          <Line
            type="linear"
            dataKey="Target Grade"
            stroke="#3b82f6"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />

          {pols.map((p, i) => (
            <ReferenceLine
              key={`${p.name}-goal`}
              y={p.goal}
              stroke={lineColors[i]}
              strokeDasharray="3 3"
            />
          ))}

          {pols.map((p, i) => (
            <Line
              key={p.name}
              type="linear"
              dataKey={p.name}
              stroke={lineColors[i]}
              strokeWidth={2}
              activeDot={{ r: 5 }}
              dot={{ r: 4 }}
              connectNulls
              label={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
