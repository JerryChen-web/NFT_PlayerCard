"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.renderStudio = function(){
  $("#view-studio").innerHTML = `
    <section class="grid cols-2 align-start">
      <article class="panel panel-pad">
        <h3>建立自訂示範卡</h3>
        <p>可補充組員想展示的球員或概念卡。若圖片或 Logo URL 空白，卡面會自動使用隊色與姓名縮寫。</p>
        <div class="form-grid mt-14">
          ${field("studioName","球員姓名","SAMURAI ACE")}
          <div class="form-field"><label for="studioSport">運動</label><select class="field" id="studioSport">${Object.entries(Sports).map(([id, sport]) => `<option value="${id}">${sport.label}</option>`).join("")}</select></div>
          ${field("studioTeam","球隊","Taipei Meteors")}
          ${field("studioLeague","聯盟","Concept League")}
          ${field("studioNationality","國籍","Taiwan")}
          ${field("studioPosition","位置","Forward")}
          ${field("studioJersey","背號","8")}
          <div class="form-field"><label for="studioRarity">稀有度</label><select class="field" id="studioRarity">${Object.entries(Rarity).map(([id, rarity]) => `<option value="${id}" ${id === "rare" ? "selected" : ""}>${rarity.label}</option>`).join("")}</select></div>
          ${field("studioPrice","價格 ETH","0.38","number","0.01","0.01")}
          ${field("studioImage","照片 URL","")}
          ${field("studioLogo","Logo URL","")}
        </div>
        <h4 class="mt-18">初始數據</h4>
        <div class="form-grid mt-14" id="studioStats"></div>
        <div class="section-actions mt-18">
          <button class="btn primary" data-action="add-card" data-target="market">加入市場</button>
          <button class="btn teal" data-action="add-card" data-target="collection">直接 Mint</button>
        </div>
      </article>
      <article class="panel panel-pad">
        <h3>資料欄位提示</h3>
        <table class="mt-14">
          <tr><th>欄位</th><th>用途</th></tr>
          <tr><td>照片 URL / Logo URL</td><td>支援遠端圖源；載入失敗時會顯示 fallback</td></tr>
          <tr><td>稀有度</td><td>影響邊框色、估值模型與 metadata attributes</td></tr>
          <tr><td>初始數據</td><td>依運動切換欄位，預言機事件會延續這些欄位更新</td></tr>
          <tr><td>加入收藏庫</td><td>建立後立即 owner = demo_wallet，適合直接測試 Oracle</td></tr>
        </table>
        <div class="notice mt-14">自訂卡預設使用自製概念資料，較適合避開肖像權與商標風險。</div>
      </article>
    </section>
  `;
  this.renderStudioStats("soccer");
};

UI.renderStudioStats = function(sportId){
  const sport = Sports[sportId] || Sports.soccer;
  const statsBox = $("#studioStats");
  if(!statsBox) return;
  statsBox.innerHTML = sport.stats.slice(0, 6).map((key) => {
    const value = sport.defaultStats[key] ?? 0;
    return field(`stat_${key}`, StatLabels[key] || key, value, "number", key === "avg" || key === "ops" ? "0.001" : "0.1", "");
  }).join("");
};
