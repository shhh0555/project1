document.addEventListener("DOMContentLoaded", async () => {
  // 設定預設日期 (7天後出發，停留4天)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 7);
  
  const returnDay = new Date(tomorrow);
  returnDay.setDate(returnDay.getDate() + 4);

  document.getElementById("depart-date").value = formatDate(tomorrow);
  document.getElementById("return-date").value = formatDate(returnDay);

  // 初始化載入預設航班清單
  await loadAndRenderFlights();

  // 搜尋表單提交事件
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const from = document.getElementById("from-city").value;
    const to = document.getElementById("to-city").value;
    const departDate = document.getElementById("depart-date").value;
    const returnDate = document.getElementById("return-date").value;

    // 1. 生成第三方平台直達按鈕
    generatePlatformLinks(from, to, departDate, returnDate);

    // 2. 透過模擬 API 取得過濾後的航班資料並渲染
    await loadAndRenderFlights({ from, to });
  });
});

// 日期格式化工具
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// 載入並渲染航班卡片
async function loadAndRenderFlights(criteria = {}) {
  const container = document.getElementById("deals-container");
  container.innerHTML = `<div style="text-align:center; padding: 20px; color:#64748b;">🌴 正在搜尋最新航班優惠...</div>`;

  // 呼叫 Mock API
  const response = await window.FLIGHT_MOCK_API.search(criteria);
  const flights = response.data;

  if (flights.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 20px; color:#64748b;">目前沒有找到符合條件的航班，請嘗試其他目的地！</div>`;
    return;
  }

  container.innerHTML = flights.map(flight => `
    <div class="deal-card">
      <div class="deal-info">
        <h3>${flight.airline.logo} ${flight.airline.name} <span style="font-size:0.8rem; color:#64748b;">(${flight.schedule.flightNumber})</span></h3>
        <p>${flight.route.fromCity} ➔ ${flight.route.toCity} | ${flight.schedule.departureTime} 起飛</p>
        <span style="display:inline-block; margin-top:4px; font-size:0.7rem; color:#d97706; background:#fef3c7; padding:2px 6px; border-radius:4px;">${flight.tags[0]}</span>
      </div>
      <div class="deal-price">
        <div class="price">${flight.price.formatted}</div>
        <a href="${flight.directBookingUrl}" target="_blank" rel="noopener" class="btn-book">官網預訂 ➔</a>
      </div>
    </div>
  `).join("");
}

// 產生各大比價平台直達網址
function generatePlatformLinks(from, to, departDate, returnDate) {
  const container = document.getElementById("platform-links");
  const resultsSection = document.getElementById("search-results");

  const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights%20to%20${to}%20from%20${from}%20on%20${departDate}%20through%20${returnDate}`;
  
  const formatSkyDate = (dStr) => dStr.replace(/-/g, "").slice(2);
  const skyscannerUrl = `https://www.skyscanner.com.tw/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/${formatSkyDate(departDate)}/${formatSkyDate(returnDate)}/`;
  
  const tripUrl = `https://tw.trip.com/flights/${from}-to-${to}/tickets-${from.toLowerCase()}-${to.toLowerCase()}?flighttype=rt&ddate=${departDate}&rdate=${returnDate}`;

  container.innerHTML = `
    <a href="${googleFlightsUrl}" target="_blank" class="platform-btn">
      <span>✈️ Google 航班比價</span>
      <span class="badge">即時開票 ➔</span>
    </a>
    <a href="${skyscannerUrl}" target="_blank" class="platform-btn">
      <span>🔍 Skyscanner 搜尋</span>
      <span class="badge">比價首選 ➔</span>
    </a>
    <a href="${tripUrl}" target="_blank" class="platform-btn">
      <span>🧳 Trip.com 特惠比價</span>
      <span class="badge">套票優惠 ➔</span>
    </a>
  `;

  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth" });
}
