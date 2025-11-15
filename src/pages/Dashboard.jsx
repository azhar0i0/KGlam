import React, { useState, Fragment, useMemo } from "react";
import { Link } from 'react-router-dom';
import { Line } from "react-chartjs-2";
import './demi/style.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { demoData } from "./demi/DemiData";
import {
  UserGroupIcon,
  UsersIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Custom dropdown component
const BookingDropdown = ({ selectedRange, setSelectedRange }) => {
  const options = ["Weekly", "Monthly", "6Months", "LifeTime"];
  return (
    <Menu as="div" className="relative inline-block text-left w-32">
      <div>
        <Menu.Button className="inline-flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 hover:ring-2 hover:ring-[#01ABAB] focus:outline-none focus:ring-2 focus:ring-[#01ABAB]">
          {selectedRange}
          <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 w-full bg-white rounded-xl border-gray-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          {options.map((option) => (
            <Menu.Item key={option}>
              {({ active }) => (
                <button
                  onClick={() => setSelectedRange(option)}
                  className={`${
                    active ? "bg-[#01ABAB] text-white" : "text-gray-700"
                  } group flex rounded-xl items-center w-full px-4 py-2 text-sm transition-all border-gray-300`}
                >
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState("Weekly");
  const chartData = demoData[selectedRange];

  // Calculate Active Users dynamically from the chart data
  const activeUsers = useMemo(() => {
    if (!chartData || !chartData.datasets || chartData.datasets.length === 0)
      return 0;
    const dataPoints = chartData.datasets[0].data;
    const avg = dataPoints.reduce((a, b) => a + b, 0);
    return Math.round(avg); // Rounded average for display
  }, [chartData]);

  return (
    <div className="space-y-8">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1 */}
<Link to="/management">
  <div className="DasgboardCardsCustomCSS mobile-card-spacing bg-gray-100 p-6 rounded-2xl flex justify-between items-center w-full shadow-sm hover:shadow-md transition-all cursor-pointer">
    <div>
      <h3 className="text-gray-700 text-lg font-semibold">
        Total Saloons
      </h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">765+</p>
      <p className="text-xs text-gray-500 mt-1">
        Showing Lifetime trend
      </p>
    </div>
    <div className="flex-shrink-0">
      <UserGroupIcon className="w-14 h-14 bg-[#01ABAB] text-white p-3 rounded-full" />
    </div>
  </div>
</Link>

{/* Card 2 */}
<Link to="/customers">
  <div className="DasgboardCardsCustomCSS bg-gray-100 p-6 rounded-2xl flex justify-between items-center w-full shadow-sm hover:shadow-md transition-all cursor-pointer">
    <div>
      <h3 className="text-gray-700 text-lg font-semibold">
        Total Customers
      </h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">1000+</p>
      <p className="text-xs text-gray-500 mt-1">
        Showing Lifetime trend
      </p>
    </div>
    <div className="flex-shrink-0">
      <UsersIcon className="w-14 h-14 bg-[#01ABAB] text-white p-3 rounded-full" />
    </div>
  </div>
</Link>

        {/* Card 3 - ACTIVE USERS (Dynamic) */}
        <div className="DasgboardCardsCustomCSS bg-gray-100 p-6 rounded-2xl flex justify-between items-center w-full shadow-sm hover:shadow-md transition-all">
          <div>
            <h3 className="text-gray-700 text-lg font-semibold">
              Active Users
            </h3>
            {/* Dynamically updates with chart */}
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activeUsers.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Showing {selectedRange} trend
            </p>
          </div>
          <div className="flex-shrink-0">
            <CalendarIcon className="w-14 h-14 bg-[#01ABAB] text-white p-3 rounded-full" />
          </div>
        </div>
      </div>

      {/* Booking Graph */}
      <div className="DasgboardCardsCustomCSS bg-gray-100 p-6 rounded-2xl shadow-sm w-full">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Active Users in Saloon App
          </h2>

          {/* Custom Dropdown */}
          <BookingDropdown
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>

        {/* Chart Wrapper */}
        <div className="h-[250px] sm:h-[320px] md:h-[380px] w-full">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
              },
              scales: {
                x: { grid: { display: false } },
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 50 },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
