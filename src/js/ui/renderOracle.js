"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.oracleFlowPanel = function(card){
  const diff = Store.state.lastOracleDiff;
  return `
    <article class="panel panel-pad">
      <h3>Oracle Verification Flow</h3>
      <div class="chain-flow mt-14">
        ${(diff?.status || ["Pending","Verifying","Confirmed","Metadata Updated"]).map((step, index) => `<div class="flow-step ${diff ? "active" : ""}"><b>${index + 1}</b><span>${escapeHTML(step)}</span></div>`).join("")}
      </div>
      ${diff ? `
        <div class="grid cols-2 mt-14 align-start">
          <div class="diff-table">
            ${diff.changes.map((item) => `<div><span>${escapeHTML(item.key)}</span><b>${escapeHTML(item.before)} → ${escapeHTML(item.after)}</b></div>`).join("")}
          </div>
          <pre class="json-box compact">${escapeHTML(JSON.stringify(diff.payload, null, 2))}</pre>
        </div>
      ` : `<p>觸發事件後會顯示 Pending → Verifying → Confirmed → Metadata Updated，以及更新前後比較表與 Oracle JSON payload。</p>`}
    </article>
  `;
};

UI.renderOracle = function(){
  const owned = Store.ownedCards();
  const selected = Store.card(Store.state.activeOracleId) || owned[0];
  if(selected && selected.id !== Store.state.activeOracleId){
    Store.state.activeOracleId = selected.id;
    Store.save();
  }
  if(!selected){
    $("#view-oracle").innerHTML = `
      <div class="empty"><div><strong>尚無可更新的收藏卡</strong><span>先從市場 Mint 一張卡，再回到預言機事件台。</span><div class="mt-14"><button class="btn primary" data-view="market">前往市場</button></div></div></div>
    `;
    return;
  }
  const events = eventPoolFor(selected);
  $("#view-oracle").innerHTML = `
    <section class="oracle-layout">
      <div>${this.cardHTML(selected, "oracle")}</div>
      <div class="grid">
        <article class="panel panel-pad">
          <h3>Manual Oracle Events</h3>
          <p>選擇事件後，卡片資料會立即重算並寫入版本紀錄。這裡模擬 Chainlink / sports API 將外部比賽資料傳入 metadata 更新流程。</p>
          <div class="event-grid mt-14">
            ${events.map((event) => `
              <button class="btn event-btn" data-action="oracle-event" data-event-id="${event.id}">
                <span class="event-icon">${event.icon}</span>
                <span><strong>${event.title}</strong><span>${event.impact}</span></span>
              </button>
            `).join("")}
          </div>
        </article>
        ${this.oracleFlowPanel(selected)}
        <article class="panel panel-pad">
          <div class="section-head">
            <div><h3>Metadata Preview</h3><p>${selected.tokenId} | ${selected.playerName} | v${selected.version}</p></div>
            <div class="section-actions">
              <button class="btn" data-action="copy-json">複製</button>
              <button class="btn" data-action="download-json">下載</button>
            </div>
          </div>
          <pre class="json-box" id="metadataBox">${escapeHTML(JSON.stringify(Metadata.forCard(selected), null, 2))}</pre>
        </article>
        <section class="grid cols-2 align-start">
          <article class="panel panel-pad">
            <h3>Card History</h3>
            <div class="timeline mt-14">
              ${(selected.history || []).slice(0, 10).map((item) => this.logHTML(item)).join("") || `<div class="log-line">尚無紀錄</div>`}
            </div>
          </article>
          <article class="panel panel-pad">
            <h3>Demo Tx Log</h3>
            <div class="timeline mt-14">
              ${Store.state.txLog.slice(0, 10).map((item) => this.logHTML(item)).join("") || `<div class="log-line">尚無交易紀錄</div>`}
            </div>
          </article>
        </section>
      </div>
    </section>
  `;
};
