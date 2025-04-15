// 아이콘 컴포넌트 생성
const { Sun, Moon, CreditCard, TrendingDown, ShieldCheck, Users, ArrowUpRight, ArrowDownRight } = lucide;

// 더미 데이터 생성 함수
const generateDummyData = () => {
  return {
    paymentSuccessRate: 94.7 + (Math.random() * 2 - 1),
    authSuccessRate: 97.2 + (Math.random() * 1.5 - 0.75),
    churnRate: 3.5 + (Math.random() * 1 - 0.5),
    totalTransactions: Math.floor(12500 + Math.random() * 1000),
    totalRevenue: Math.floor(4250000 + Math.random() * 100000),
    activeUsers: Math.floor(8700 + Math.random() * 500),
    weeklyData: [
      { name: '월', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
      { name: '화', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
      { name: '수', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
      { name: '목', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
      { name: '금', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
      { name: '토', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
      { name: '일', 성공건수: Math.floor(Math.random() * 500) + 1500, 실패건수: Math.floor(Math.random() * 100) + 50 },
    ],
    dailyTrend: [
      { name: '00-04', 금액: Math.floor(Math.random() * 200000) + 100000 },
      { name: '04-08', 금액: Math.floor(Math.random() * 300000) + 200000 },
      { name: '08-12', 금액: Math.floor(Math.random() * 500000) + 800000 },
      { name: '12-16', 금액: Math.floor(Math.random() * 500000) + 900000 },
      { name: '16-20', 금액: Math.floor(Math.random() * 500000) + 1000000 },
      { name: '20-24', 금액: Math.floor(Math.random() * 400000) + 800000 },
    ]
  };
};

// 카드 컴포넌트
const MetricCard = ({ title, value, icon, trend, trendValue, format }) => {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const trendColor = isPositive ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold mt-1 dark:text-white">
            {format === 'percent' ? `${value.toFixed(1)}%` : 
             format === 'number' ? value.toLocaleString() : 
             format === 'currency' ? `₩${value.toLocaleString()}` : value}
          </p>
        </div>
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <TrendIcon className={`w-4 h-4 ${trendColor} mr-1`} />
        <span className={`text-sm ${trendColor}`}>{trendValue}%</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">지난 주 대비</span>
      </div>
    </div>
  );
};

// 메인 대시보드 컴포넌트
const PaymentDashboard = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [data, setData] = React.useState(generateDummyData());
  
  React.useEffect(() => {
    // 시스템 다크모드 감지
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    // 5초마다 데이터 갱신 (시뮬레이션)
    const interval = setInterval(() => {
      setData(generateDummyData());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">결제 대시보드</h1>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="결제 성공률" 
              value={data.paymentSuccessRate} 
              icon={<CreditCard size={24} className="text-blue-600 dark:text-blue-400" />} 
              trend="up" 
              trendValue={1.2}
              format="percent"
            />
            <MetricCard 
              title="인증 성공률" 
              value={data.authSuccessRate} 
              icon={<ShieldCheck size={24} className="text-green-600 dark:text-green-400" />} 
              trend="up" 
              trendValue={0.8}
              format="percent"
            />
            <MetricCard 
              title="이탈률" 
              value={data.churnRate} 
              icon={<TrendingDown size={24} className="text-red-600 dark:text-red-400" />} 
              trend="down" 
              trendValue={0.5}
              format="percent"
            />
            <MetricCard 
              title="활성 사용자" 
              value={data.activeUsers} 
              icon={<Users size={24} className="text-purple-600 dark:text-purple-400" />} 
              trend="up" 
              trendValue={2.4}
              format="number"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">요일별 결제 현황</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#374151' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '0.375rem',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="성공건수" fill="#3B82F6" />
                    <Bar dataKey="실패건수" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">시간대별 결제 금액</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`₩${value.toLocaleString()}`, '결제금액']}
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#374151' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '0.375rem',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="금액" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">총 거래 건수</h2>
              <p className="text-3xl font-bold dark:text-white">{data.totalTransactions.toLocaleString()}건</p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                최근 30일 기준
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">총 결제 금액</h2>
              <p className="text-3xl font-bold dark:text-white">₩{data.totalRevenue.toLocaleString()}</p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                최근 30일 기준
              </div>
            </div>
          </div>
          
          <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2025 결제 대시보드 | 데이터는 5초마다 자동으로 갱신됩니다
          </footer>
        </div>
      </div>
    </div>
  );
};

// 랜더링
ReactDOM.render(<PaymentDashboard />, document.getElementById('root'));
