"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.renderDashboard = function(){
  const owned = Store.ownedCards();
  const totalValue = owned.reduce((sum, card) => sum + ValueModel.estimate(card), 0);
  const latest = Store.state.cards.slice().sort((a,b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))[0] || Store.state.cards[0];
  const sportCounts = Object.keys(Sports).map((sport) => Store.state.cards.filter((card) => card.sport === sport).length);
  $("#view-dashboard").innerHTML = `
    <section class="hero-grid">
      <article class="panel brief">
        <div>
          <span class="brief-kicker">Dynamic NFT Prototype</span>
          <h2 class="mt-18">用真實運動資料概念，驅動會更新的球員收藏卡。</h2>
          <p>本版本已擴充為足球、籃球、棒球各至少 50 位球員，並加入 NFT 市場交易、Oracle 更新、metadata 版本、社群資料與收藏價值分析。</p>
        </div>
        <div class="pipeline" aria-label="資料流程">
          ${["資料來源","事件判斷","Metadata","動態卡面","版本紀錄"].map((title, index) => `
            <div class="pipe-step">
              <b>${index + 1}. ${title}</b>
              <span>${["官方球員頁與示範快照","進球、大三元、全壘打等事件","attributes 與 animation_url","照片、Logo、隊色與徽章","history 與 demo tx log"][index]}</span>
            </div>
          `).join("")}
        </div>
      </article>
      <div>${this.cardHTML(latest, "spotlight")}</div>
    </section>

    <section class="grid cols-4 mt-14">
      <article class="stat-tile"><span>主卡數</span><strong>${Store.state.cards.length}</strong><p>足球、籃球、棒球各至少 50 位球星，總計至少 150 張動態球員卡。</p></article>
      <article class="stat-tile"><span>收藏數</span><strong>${owned.length}</strong><p>已 Mint 到 Demo Wallet 的卡片。</p></article>
      <article class="stat-tile"><span>估值</span><strong>${money(totalValue)}</strong><p>依稀有度、徽章與版本估算。</p></article>
      <article class="stat-tile"><span>運動分布</span><strong>${sportCounts.join("/")}</strong><p>足球 / 籃球 / 棒球。</p></article>
    </section>

    <section class="grid cols-3 mt-14">
      ${this.rankingCard("Highest Value", topCards("value", 5))}
      ${this.rankingCard("Market Heat", topCards("marketHeat", 5))}
      <article class="panel panel-pad">
        <h3>Collector Achievements</h3>
        <div class="achievement-grid mt-14">
          ${achievementList().map((item) => `<div class="achievement ${item.done ? "done" : ""}"><b>${escapeHTML(item.name)}</b><span>${escapeHTML(item.desc)}</span></div>`).join("")}
        </div>
      </article>
    </section>

    <section class="grid cols-2 mt-14 align-start">
      <article class="panel panel-pad">
        <h3>展示主線</h3>
        <table class="mt-14">
          <tr><th>階段</th><th>網站呈現</th></tr>
          <tr><td>選擇球員</td><td>市場與搜尋篩選主卡</td></tr>
          <tr><td>蒐集數據</td><td>卡面三項摘要與詳情 metadata</td></tr>
          <tr><td>判斷事件</td><td>預言機事件按鈕</td></tr>
          <tr><td>更新 metadata</td><td>JSON 即時重算與下載</td></tr>
          <tr><td>保存紀錄</td><td>history 與 demo transaction log</td></tr>
        </table>
      </article>
      <article class="panel panel-pad">
        <h3>授權定位</h3>
        <p>本網站是課堂展示原型。頁面用遠端球員照片與 Logo 做真實感參考，並保留載入失敗 fallback；若轉成公開商業產品，需要處理肖像權、商標權、資料授權與 NFT 法規。</p>
        <div class="notice mt-14">Demo 不上鏈、不登入、不串即時 API、不承諾投資或收益。鏈上概念只用來說明 tokenURI、metadata 與版本紀錄。</div>
      </article>
    </section>
  `;
};
