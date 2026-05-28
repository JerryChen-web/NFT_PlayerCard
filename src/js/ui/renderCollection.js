"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.renderCollection = function(){
  const cards = Store.ownedCards();
  const totalValue = cards.reduce((sum, card) => sum + ValueModel.estimate(card), 0);
  $("#view-collection").innerHTML = `
    <div class="section-head">
      <div>
        <h3>Demo Wallet Collection</h3>
        <p>已收藏 ${cards.length} 張，估值 ${money(totalValue)} ETH。收藏卡可送入預言機更新 metadata，也可做 Demo 回收。</p>
      </div>
      <div class="section-actions">
        <button class="btn" data-action="export-state">匯出狀態</button>
      </div>
    </div>
    ${cards.length ? `<div class="card-grid">${cards.map((card) => this.cardHTML(card, "collection")).join("")}</div>` : `
      <div class="empty"><div><strong>收藏庫目前是空的</strong><span>先到市場 Mint 一張球員卡。</span><div class="mt-14"><button class="btn primary" data-view="market">前往市場</button></div></div></div>
    `}
  `;
};
