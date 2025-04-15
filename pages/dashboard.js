// 더미 데이터 생성 함수
function generateDummyData() {
  return {
    paymentSuccessRate: (94.7 + (Math.random() * 2 - 1)).toFixed(1),
    authSuccessRate: (97.2 + (Math.random() * 1.5 - 0.75)).toFixed(1),
    churnRate: (3.5 + (Math.random() * 1 - 0.5)).toFixed(1),
    totalTransactions: Math.floor(12500 + Math.random() * 1000),
    totalRevenue: Math.floor(4250000 + Math.random() * 100000),
    activeUsers: Math.floor(8700 + Math.random() * 500),
    weeklyData: {
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      success: [
        Math.floor(Math.random() * 500) + 1500,
        Math.floor(Math.random() * 500) + 1500,
        Math.floor(Math.random() * 500) + 1500,
        Math.floor(Math.random() * 500) + 1500,
        Math.floor(Math.random() * 500) + 1500,
        Math.floor(Math.random() * 500) + 1500,
        Math.floor(Math.random() * 500) + 1500
      ],
      fail: [
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 50,
        Math.floor(Math.random() * 100) + 50
      ]
    },
    dailyTrend: {
      labels: ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'],
      amounts: [
        Math.floor(Math.random() * 200000) + 100000,
        Math.floor(Math.random() * 300000) + 200000,
        Math.floor(Math.random() * 500000) + 800000,
        Math.floor(Math.random() * 500000) + 900000,
        Math.floor(Math.random() * 500000) + 1000000,
        Math.floor(Math.random() * 400000) + 800000
      ]
    }
  };
}

// 다크모드 토글
const themeToggle = document.getElementById('theme-toggle');
themeToggle.ad
