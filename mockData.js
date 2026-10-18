/**
 * ChillFlight Mock API Dataset
 * 模擬真實航班 API 回傳格式
 */

window.FLIGHT_MOCK_API = {
  status: "success",
  timestamp: new Date().toISOString(),
  
  flights: [
    {
      id: "FL-OKA-001",
      airline: { name: "樂桃航空", logo: "🍑", code: "MM" },
      route: { from: "TPE", to: "OKA", fromCity: "台北", toCity: "沖繩" },
      schedule: { departureTime: "06:40", arrivalTime: "09:15", duration: "1h 35m", flightNumber: "MM 922" },
      price: { amount: 4880, formatted: "NT$ 4,880" },
      tags: ["超值海島", "早去晚回"],
      directBookingUrl: "https://www.flypeach.com/tw"
    },
    {
      id: "FL-DAD-002",
      airline: { name: "台灣虎航", logo: "🐅", code: "IT" },
      route: { from: "TPE", to: "DAD", fromCity: "台北", toCity: "峴港" },
      schedule: { departureTime: "11:45", arrivalTime: "13:55", duration: "3h 10m", flightNumber: "IT 551" },
      price: { amount: 5200, formatted: "NT$ 5,200" },
      tags: ["度假勝地", "熱門首選"],
      directBookingUrl: "https://www.tigerairtw.com/zh-tw/"
    },
    {
      id: "FL-PQC-003",
      airline: { name: "星宇航空", logo: "⭐", code: "JX" },
      route: { from: "TPE", to: "PQC", fromCity: "台北", toCity: "富國島" },
      schedule: { departureTime: "14:20", arrivalTime: "17:10", duration: "3h 50m", flightNumber: "JX 711" },
      price: { amount: 11500, formatted: "NT$ 11,500" },
      tags: ["奢華免簽", "精品航空"],
      directBookingUrl: "https://www.starlux-airlines.com/"
    },
    {
      id: "FL-BKK-004",
      airline: { name: "泰國亞航", logo: "✈️", code: "FD" },
      route: { from: "TPE", to: "BKK", fromCity: "台北", toCity: "曼谷" },
      schedule: { departureTime: "15:50", arrivalTime: "18:40", duration: "3h 50m", flightNumber: "FD 234" },
      price: { amount: 5600, formatted: "NT$ 5,600" },
      tags: ["泰浪漫", "小資必去"],
      directBookingUrl: "https://www.airasia.com/zh/tw"
    },
    {
      id: "FL-NRT-005",
      airline: { name: "中華航空", logo: "🌸", code: "CI" },
      route: { from: "TPE", to: "NRT", fromCity: "台北", toCity: "東京成田" },
      schedule: { departureTime: "08:30", arrivalTime: "12:45", duration: "3h 15m", flightNumber: "CI 100" },
      price: { amount: 9800, formatted: "NT$ 9,800" },
      tags: ["傳統航空", "含行李餐點"],
      directBookingUrl: "https://www.china-airlines.com/"
    }
  ],

  // 模擬非同步 API 查詢方法
  search: function(criteria) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.flights.filter(flight => {
          const matchFrom = !criteria.from || flight.route.from === criteria.from;
          const matchTo = !criteria.to || flight.route.to === criteria.to;
          return matchFrom && matchTo;
        });

        // 若無完全符合則退回預設顯示前三筆
        const results = filtered.length > 0 ? filtered : this.flights.slice(0, 3);
        
        resolve({
          success: true,
          count: results.length,
          data: results
        });
      }, 350); // 模擬網路延遲
    });
  }
};
