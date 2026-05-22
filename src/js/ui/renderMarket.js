"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.renderMarket = function(){
  const cards = Store.marketCards();
  const visible = cards.slice(0, Store.state.visibleCount || 24);
  const listed = Store.state.cards.filter((card) => card.marketData?.listed);
  const floor = cards.length ? Math.min(...cards.map((card) => ValueModel.estimate(card))) : 0;
  const volume = Store.state.cards.reduce((sum, card) => sum + Number(card.marketData?.volume || 0), 0);
  $("#view-market").innerHTML = `
    <div class="section-head">
      <div>
        <h3>Dynamic Player Card Exchange</h3>
        <p>找到 ${cards.length} 張卡片，顯示 ${visible.length} 張。支援一級 Mint、二級掛單、出價、Floor Price、Market Heat 與 Load More。</p>
      </div>
      <div class="section-actions">
        <button class="btn" data-view="studio">新增自訂卡</button>
      </div>
    </div>
    <section class="exchange-strip">
      <article><span>Floor Price</span><b>${money(floor)} ETH</b><small>目前篩選卡池最低估值</small></article>
      <article><span>Volume</span><b>${money(volume)} ETH</b><small>Demo 累計交易量</small></article>
      <article><span>Secondary Listings</span><b>${listed.length}</b><small>收藏者掛單出售</small></article>
      <article><span>Watchlist</span><b>${Store.state.watchlist?.length || 0}</b><small>觀察清單</small></article>
    </section>
    <section class="grid cols-3 mt-14">
      ${this.rankingCard("Trending Cards", topCards("marketHeat", 5))}
      ${this.rankingCard("Undervalued Cards", undervaluedCards(5))}
      ${this.receiptCard(Store.state.lastTradeReceipt)}
    </section>
    ${cards.length ? `<div class="card-grid mt-14">${visible.map((card) => this.cardHTML(card, "market")).join("")}</div>
      ${visible.length < cards.length ? `<div class="load-row"><button class="btn primary" data-action="load-more">Load More (${cards.length - visible.length})</button></div>` : ""}` : `
      <div class="empty"><div><strong>沒有符合篩選的卡片</strong><span>調整搜尋或篩選條件。</span></div></div>
    `}
  `;
};

UI.rankingCard = function(title, cards){
  return `
    <article class="panel panel-pad mini-rank">
      <h3>${escapeHTML(title)}</h3>
      <div class="rank-list mt-14">
        ${cards.map((card, index) => `
          <button class="rank-row" data-action="detail" data-card-id="${card.id}">
            <b>${index + 1}</b>
            <span>${escapeHTML(card.playerName)}<small>${escapeHTML(card.team)} | OVR ${card.abilityStats?.ovr || "-"}</small></span>
            <strong>${money(ValueModel.estimate(card))}</strong>
          </button>
        `).join("") || `<div class="log-line">暫無資料</div>`}
      </div>
    </article>
  `;
};

UI.receiptCard = function(receipt){
  if(!receipt){
    return `
      <article class="panel panel-pad mini-rank">
        <h3>Latest Chain Confirmation</h3>
        <p>完成 Mint、掛單或二級市場交易後，這裡會顯示模擬鏈上確認結果。</p>
      </article>
    `;
  }
  return `
    <article class="panel panel-pad mini-rank">
      <h3>Latest Chain Confirmation</h3>
      <div class="kv-grid mt-14">
        ${[
          ["Tx Hash", receipt.txHash],
          ["Block", receipt.blockNumber],
          ["From", receipt.from],
          ["To", receipt.to],
          ["Price", `${money(receipt.price)} ETH`],
          ["Status", receipt.status]
        ].map(([k,v]) => `<div class="kv"><span>${escapeHTML(k)}</span><b>${escapeHTML(v)}</b></div>`).join("")}
      </div>
    </article>
  `;
};
