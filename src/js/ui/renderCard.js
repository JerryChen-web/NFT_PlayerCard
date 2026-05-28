"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.cardHTML = function(card, context = "market"){
  const sport = Sports[card.sport] || Sports.soccer;
  const rarity = Rarity[card.rarity] || Rarity.common;
  const owned = card.owner === "demo_wallet";
  const effect = Store.state.lastEffect?.cardId === card.id && Date.now() - Store.state.lastEffect.at < 1800 ? `effect-${Store.state.lastEffect.effect}` : "";
  const visibleStats = sport.stats.filter((key) => key in (card.stats || {})).slice(0, 3);
  const statusClass = card.status === "Injured" ? "warning" : /Edition|Updated/.test(card.status || "") ? "special" : "";
  const teamA = card.teamColors?.[0] || sport.tone;
  const teamB = card.teamColors?.[1] || rarity.color;
  const watched = Store.state.watchlist?.includes(card.id);
  const actions = context === "collection" ? `
    <button class="btn teal" data-action="oracle" data-card-id="${card.id}">送入預言機</button>
    <button class="btn" data-action="detail" data-card-id="${card.id}">詳情</button>
    <button class="btn" data-action="${card.marketData?.listed ? "cancel-listing" : "list-sale"}" data-card-id="${card.id}">${card.marketData?.listed ? "取消掛單" : "掛單"}</button>
  ` : context === "oracle" ? `
    <button class="btn" data-action="detail" data-card-id="${card.id}">完整資料</button>
    <a class="btn" href="${escapeAttr(card.metadata?.sourceUrl || "#")}" target="_blank" rel="noopener noreferrer">來源頁</a>
  ` : `
    <button class="btn primary" data-action="${owned ? "detail" : "buy-now"}" data-card-id="${card.id}" ${!owned && card.owner && card.owner !== "issuer" && !card.marketData?.listed ? "disabled" : ""}>${owned ? "已擁有" : (!card.owner || card.owner === "issuer" ? "Mint" : (card.marketData?.listed ? "Buy Now" : "Not Listed"))}</button>
    <button class="btn" data-action="make-offer" data-card-id="${card.id}">出價</button>
    <button class="btn" data-action="detail" data-card-id="${card.id}">詳情</button>
  `;
  const imageClass = `${card.imageUrl ? "media-frame" : "media-frame is-fallback"} media-${card.sport}`;
  const fallbackNote = card.sport === "baseball" && !card.mlbId ? "PHOTO PENDING | MLB ID pending verification" : "PHOTO PENDING";
  return `
    <article class="player-card ${effect} rarity-${card.rarity} ${Store.state.animationEnabled === false ? "" : "anim-live"}" data-card-id="${card.id}" style="--team-a:${teamA};--team-b:${teamB};--rarity-color:${rarity.color}">
      <div class="card-topline">
        <span class="serial">${escapeHTML(card.tokenId)} | ${escapeHTML(card.serial)}</span>
        <span class="rarity-pill">${escapeHTML(rarity.label)}</span>
      </div>
      <div class="${imageClass}">
        ${card.imageUrl ? `<img class="player-img" alt="${escapeAttr(card.playerName)}" src="${escapeAttr(card.imageUrl)}" loading="lazy" onerror="this.closest('.media-frame').classList.add('is-fallback');this.remove();" />` : ""}
        <div class="fallback-initials">${escapeHTML(initials(card.playerName))}</div>
        <div class="fallback-note">${escapeHTML(fallbackNote)}</div>
        <div class="media-label">
          <span class="source-pill">${escapeHTML(sport.label)}</span>
          <span class="status-pill ${statusClass}">${escapeHTML(card.status || "Active")}</span>
        </div>
        <div class="team-logo ${card.logoUrl ? "" : "logo-failed"}" data-code="${escapeAttr(card.teamCode || sport.short)}">
          ${card.logoUrl ? `<img alt="${escapeAttr(card.team)} logo" src="${escapeAttr(card.logoUrl)}" loading="lazy" onerror="this.closest('.team-logo').classList.add('logo-failed');this.remove();" />` : ""}
        </div>
      </div>
      <div class="card-body">
        <div class="name-row">
          <div>
            <h4 class="player-name">${escapeHTML(card.playerName)}</h4>
            <div class="team-line">${escapeHTML(card.team)} | ${escapeHTML(card.league)} | ${escapeHTML(card.position)}</div>
          </div>
          <div class="number-chip">#${escapeHTML(card.jerseyNumber)}</div>
        </div>
        <div class="ability-head">
          <div class="ovr"><span>OVR</span><b>${card.abilityStats?.ovr || "-"}</b></div>
          <div class="ability-mini">
            ${["attack","speed","skill"].map((key) => `<span>${key.toUpperCase()} <b>${card.abilityStats?.[key] || "-"}</b></span>`).join("")}
          </div>
          <button class="icon-btn watch-btn ${watched ? "active" : ""}" data-action="watch" data-card-id="${card.id}" title="Watchlist">${watched ? "★" : "☆"}</button>
        </div>
        <div class="badge-row">
          ${(card.badges || []).slice(0, 4).map((badge) => `<span class="badge">${escapeHTML(badge)}</span>`).join("") || `<span class="badge">BASE CARD</span>`}
        </div>
        <div class="skill-row">
          ${(card.skills || []).slice(0, 4).map((skill) => `<span>${escapeHTML(skill)}</span>`).join("")}
        </div>
        <div class="stats">
          ${visibleStats.map((key) => `
            <div class="stat-box"><span>${escapeHTML(StatLabels[key] || key)}</span><b>${escapeHTML(formatStat(key, card.stats[key]))}</b></div>
          `).join("")}
        </div>
        <div class="value-row"><span>v${card.version} | ${owned ? "demo_wallet" : (card.marketData?.listed ? "secondary" : "primary")}</span><b>${money(ValueModel.estimate(card))} ETH</b></div>
        <div class="card-actions three">${actions}</div>
      </div>
    </article>
  `;
};
