// export const demoData = {
//   'Weekly': {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Bookings',
//         data: [50, 75, 150, 100, 200, 170, 220],
//         borderColor: '#01ABAB',
//         backgroundColor: 'rgba(1, 171, 171, 0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   },
//   'Monthly': {
//     labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
//     datasets: [
//       {
//         label: 'Bookings',
//         data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300 + 50)),
//         borderColor: '#01ABAB',
//         backgroundColor: 'rgba(1, 171, 171, 0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   },
//   '6Months': {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Bookings',
//         data: [1200, 1500, 1700, 1600, 1800, 2000],
//         borderColor: '#01ABAB',
//         backgroundColor: 'rgba(1, 171, 171, 0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   },
//   'LifeTime': {
//     labels: ['2019', '2020', '2021', '2022', '2023'],
//     datasets: [
//       {
//         label: 'Bookings',
//         data: [5000, 7500, 10000, 12000, 15000],
//         borderColor: '#01ABAB',
//         backgroundColor: 'rgba(1, 171, 171, 0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   },
// };




// Generate random bookings for simulation
const generateBookingsData = (length, min = 50, max = 300) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));
};

// Get the last N months (6 months in this case)
const getLastNMonths = (n) => {
  const months = [];
  const date = new Date();
  for (let i = 0; i < n; i++) {
    months.unshift(date.toLocaleString('default', { month: 'short' }));
    date.setMonth(date.getMonth() - 1);
  }
  return months;
};

export const demoData = {
  'Weekly': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookings',
        data: [50, 75, 150, 100, 200, 170, 220],
        borderColor: '#01ABAB',
        backgroundColor: 'rgba(1, 171, 171, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  },
  'Monthly': {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Bookings',
        data: generateBookingsData(30),
        borderColor: '#01ABAB',
        backgroundColor: 'rgba(1, 171, 171, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  },
  '6Months': {
    labels: getLastNMonths(6), // Dynamically get the last 6 months
    datasets: [
      {
        label: 'Bookings',
        data: generateBookingsData(6, 1000, 2000), // Randomized data for the last 6 months
        borderColor: '#01ABAB',
        backgroundColor: 'rgba(1, 171, 171, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  },
  'LifeTime': {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Bookings',
        data: [5000, 7500, 10000, 12000, 15000],
        borderColor: '#01ABAB',
        backgroundColor: 'rgba(1, 171, 171, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  },
};
