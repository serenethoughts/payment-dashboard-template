// pages/index.js
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const dummySequences = {
  '결제 성공률': [92.1, 93.3, 94.0],
  '인증 성공률': [89.5, 91.0, 88.8],
  '수단별 이탈률': [12.3, 11.8, 13.2],
  '디바이스별 성공률': [95.7, 96.4, 94.9],
};

const labels = Object.keys(dummySequences);

export default function Dashboard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % dummySequences[labels[0]].length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentData = labels.map((label) => ({
    name: label,
    value: dummySequences[label][index],
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">결제 지표 대시보드</h1>
        <button
          onClick={() => {
            document.documentElement.classList.toggle('dark');
            localStorage.theme =
              document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          }}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
          🌗 모드 전환
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {currentData.map((metric) => (
          <div key={metric.name} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{metric.name}</h2>
            <p className="text-3xl">{metric.value}%</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">지표 요약 차트</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
