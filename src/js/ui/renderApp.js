"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const UI = window.NFTPlayerCard.UI = {
  toastTimer:null,
  introTimer:null
};

UI.init = function(){
  Store.load();
  if(!Store.state.activeOracleId){
    Store.state.activeOracleId = Store.ownedCards()[0]?.id || null;
  }
  this.bind();
  this.render();
};

UI.bind = function(){
  document.addEventListener("click", (event) => {
    const viewTarget = event.target.closest("[data-view]");
    if(viewTarget){
      this.setView(viewTarget.dataset.view);
      return;
    }
    const action = event.target.closest("[data-action]");
    if(!action) return;
    const id = action.dataset.cardId;
    switch(action.dataset.action){
      case "buy": Actions.mint(id); break;
      case "buy-now": Actions.buyNow(id); break;
      case "make-offer": Actions.makeOffer(id); break;
      case "list-sale": this.openDetail(id, {skipIntro:true}); break;
      case "confirm-listing": Actions.listForSale(id, $(`#listingPrice-${cssEscape(id)}`)?.value); break;
      case "cancel-listing": Actions.cancelListing(id); break;
      case "accept-offer": Actions.acceptOffer(id); break;
      case "toggle-animation": Actions.toggleAnimation(); break;
      case "set-language": Actions.setLanguage(action.dataset.language); break;
      case "skip-intro": this.finishIntro(); break;
      case "replay-intro": this.playIntro(id || Store.state.activeDetailId, true); break;
      case "watch": Actions.toggleWatch(id); break;
      case "load-more": Actions.loadMore(); break;
      case "burn": Actions.burn(id); break;
      case "detail": this.openDetail(id); break;
      case "oracle": Actions.sendOracle(id); break;
      case "oracle-event": Actions.oracleEvent(action.dataset.eventId); break;
      case "copy-json": this.copyMetadata(id); break;
      case "download-json": this.downloadMetadata(id); break;
      case "copy-value": this.copyValue(action.dataset.copy, action.dataset.copyLabel); break;
      case "export-state": this.exportState(); break;
      case "reset-demo": this.resetDemo(); break;
      case "close-modal": this.closeModal(); break;
      case "add-card": this.addCustomCard(action.dataset.target || "market"); break;
    }
  });
  document.addEventListener("input", (event) => {
    if(event.target.id === "marketSearch"){
      Store.state.search = event.target.value;
      Store.state.visibleCount = 24;
      Store.save();
      this.renderMarket();
    }
  });
  document.addEventListener("change", (event) => {
    if(event.target.id === "filterSport"){
      Store.state.filterSport = event.target.value;
      Store.state.visibleCount = 24;
      Store.save();
      this.renderMarket();
    }
    if(event.target.id === "filterLeague"){
      Store.state.filterLeague = event.target.value;
      Store.state.visibleCount = 24;
      Store.save();
      this.renderMarket();
    }
    if(event.target.id === "filterRarity"){
      Store.state.filterRarity = event.target.value;
      Store.state.visibleCount = 24;
      Store.save();
      this.renderMarket();
    }
    if(event.target.id === "filterEra"){
      Store.state.filterEra = event.target.value;
      Store.state.visibleCount = 24;
      Store.save();
      this.renderMarket();
    }
    if(event.target.id === "languageMode"){
      Actions.setLanguage(event.target.value);
    }
    if(event.target.id === "sortBy"){
      Store.state.sortBy = event.target.value;
      Store.save();
      this.renderMarket();
    }
    if(event.target.id === "oraclePicker"){
      Store.state.activeOracleId = event.target.value;
      Store.save();
      this.render();
    }
    if(event.target.id === "studioSport"){
      this.renderStudioStats(event.target.value);
    }
  });
  $("#detailModal").addEventListener("click", (event) => {
    if(event.target.id === "detailModal") this.closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if(event.key === "Escape") this.closeModal();
  });
};

UI.setView = function(view){
  if(!Views.some((item) => item.id === view)) return;
  Store.state.activeView = view;
  Store.save();
  this.render();
};

UI.render = function(){
  const view = Views.find((item) => item.id === Store.state.activeView) || Views[0];
  this.applySettings();
  $("#pageIcon").textContent = view.icon;
  $("#pageTitle").textContent = view.title;
  $("#pageSubtitle").textContent = view.subtitle;
  $("#nav").innerHTML = Views.map((item) => `
    <button class="nav-btn ${item.id === view.id ? "active" : ""}" data-view="${item.id}">
      <span class="nav-ico">${item.icon}</span>
      <span><strong>${item.nav}</strong><small>${item.sub}</small></span>
    </button>
  `).join("");
  $$(".view").forEach((node) => node.classList.remove("active"));
  $(`#view-${view.id}`)?.classList.add("active");
  $("#walletBalance").textContent = money(Store.state.wallet);
  $("#walletMeter").style.width = `${clamp(Store.state.wallet / 12.5 * 100, 7, 100)}%`;
  $("#collectionBadge").textContent = `${Store.ownedCards().length} CARDS`;
  this.renderTopActions();
  if(view.id === "dashboard") this.renderDashboard();
  if(view.id === "market") this.renderMarket();
  if(view.id === "collection") this.renderCollection();
  if(view.id === "oracle") this.renderOracle();
  if(view.id === "datahub") this.renderDataHub();
  if(view.id === "studio") this.renderStudio();
};

UI.applySettings = function(){
  document.body.classList.toggle("animations-off", Store.state.animationEnabled === false);
};

UI.renderTopActions = function(){
  const view = Store.state.activeView;
  if(view === "market"){
    $("#topActions").innerHTML = `
      <input class="search" id="marketSearch" value="${escapeAttr(Store.state.search)}" placeholder="搜尋球員 / 球隊 / 國籍" />
      <select class="select" id="filterSport" aria-label="運動篩選">
        ${option("all","全部運動",Store.state.filterSport)}
        ${Object.entries(Sports).map(([id, sport]) => option(id, sport.label, Store.state.filterSport)).join("")}
      </select>
      <select class="select" id="filterLeague" aria-label="聯盟篩選">
        ${option("all","全部聯盟",Store.state.filterLeague)}
        ${Store.leagues().map((league) => option(league, league, Store.state.filterLeague)).join("")}
      </select>
      <select class="select" id="filterRarity" aria-label="稀有度篩選">
        ${option("all","全部稀有度",Store.state.filterRarity)}
        ${Object.entries(Rarity).map(([id, rarity]) => option(id, rarity.label, Store.state.filterRarity)).join("")}
      </select>
      <select class="select" id="filterEra" aria-label="Era Filter">
        ${Object.entries(EraLabels).map(([id, label]) => option(id, label, Store.state.filterEra)).join("")}
      </select>
      <select class="select" id="sortBy" aria-label="排序">
        ${option("marketHeat","Market Heat",Store.state.sortBy)}
        ${option("ovr","OVR",Store.state.sortBy)}
        ${option("priceDesc","價格高到低",Store.state.sortBy)}
        ${option("priceAsc","價格低到高",Store.state.sortBy)}
        ${option("rarity","稀有度",Store.state.sortBy)}
        ${option("recent","最近更新",Store.state.sortBy)}
      </select>
      <select class="select" id="languageMode" aria-label="Language">
        ${Object.entries(LanguageLabels).map(([id, label]) => option(id, label, Store.state.languageMode)).join("")}
      </select>
      <button class="btn ${Store.state.animationEnabled === false ? "" : "teal"}" data-action="toggle-animation">動畫 ${Store.state.animationEnabled === false ? "OFF" : "ON"}</button>
    `;
    return;
  }
  if(view === "oracle"){
    const owned = Store.ownedCards();
    $("#topActions").innerHTML = owned.length ? `
      <select class="select" id="oraclePicker" aria-label="選擇預言機卡片">
        ${owned.map((card) => option(card.id, `${card.playerName} | v${card.version}`, Store.state.activeOracleId)).join("")}
      </select>
      <button class="btn" data-action="copy-json">複製 Metadata</button>
      <button class="btn" data-action="download-json">下載 JSON</button>
    ` : `<button class="btn primary" data-view="market">前往市場</button>`;
    return;
  }
  if(view === "collection"){
    $("#topActions").innerHTML = `
      <button class="btn" data-action="export-state">匯出收藏資料</button>
      <button class="btn primary" data-view="market">市場</button>
    `;
    return;
  }
  $("#topActions").innerHTML = `
    <button class="btn primary" data-view="market">開始 Mint</button>
    <button class="btn" data-view="oracle">預言機</button>
  `;
};

Object.assign(window.NFTPlayerCard, {
  UI
});
