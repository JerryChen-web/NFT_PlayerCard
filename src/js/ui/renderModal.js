"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

function socialLinksHTML(card){
  const labels = [
    ["instagram","Instagram"],["x","X / Twitter"],["facebook","Facebook"],["youtube","YouTube"],["tiktok","TikTok"],["officialWebsite","Official Website"],["leagueProfile","League Profile"],["teamProfile","Team Profile"]
  ];
  const normalized = normalizeSocialLinks(card.socialLinks || {});
  const links = labels.map(([key, fallbackLabel]) => [key, fallbackLabel, normalized[key]]).filter(([, , entry]) => entry?.url);
  if(!links.length) return `<span class="source-pill">pending official social verification</span>`;
  return `
    <div class="social-note">外部社群平台可能需要登入或受瀏覽器限制；若無法開啟，請複製帳號自行搜尋。</div>
    ${links.map(([key, fallbackLabel, entry]) => {
      const label = entry.label || fallbackLabel;
      const handle = entry.handle ? `@${entry.handle.replace(/^@/,"")}` : "";
      const copyHandle = handle ? `<button class="btn" data-action="copy-value" data-copy="${escapeAttr(handle)}" data-copy-label="${escapeAttr(label + " handle")}">Copy Handle</button>` : "";
      return `
        <div class="social-source">
          <div><b>${escapeHTML(label)}</b>${handle ? `<span>${escapeHTML(handle)}</span>` : ""}<small>${escapeHTML(entry.status || card.sourceStatus || "Pending Official Verification")}</small></div>
          <div class="social-actions">
            <a class="btn social-link" href="${escapeAttr(entry.url)}" target="_blank" rel="noopener noreferrer">Open</a>
            ${copyHandle}
            <button class="btn" data-action="copy-value" data-copy="${escapeAttr(entry.url)}" data-copy-label="${escapeAttr(label + " link")}">Copy Link</button>
          </div>
        </div>
      `;
    }).join("")}
  `;
}

UI.logHTML = function(item){
  return `
    <div class="log-line">
      <b>${escapeHTML(item.type || "LOG")} | ${escapeHTML(formatDate(item.at))}</b>
      ${escapeHTML(item.note || item.cardName || "")}
    </div>
  `;
};

UI.openDetail = function(cardId, options = {}){
  const card = Store.card(cardId);
  if(!card) return;
  Store.state.activeDetailId = cardId;
  Store.save();
  $("#modalTitle").textContent = `${card.playerName} | ${card.tokenId}`;
  const meta = Metadata.forCard(card);
  const valuation = ValueModel.breakdown(card);
  const L = uiText();
  const loc = localizedCard(card);
  const intro = card.introAnimation || getIntroAnimation(card);
  const shouldAutoIntro = !options.skipIntro && Store.state.animationEnabled !== false && !reducedMotion();
  const introNotice = Store.state.animationEnabled === false ? L.introOff : reducedMotion() ? L.reducedMotion : intro.subtitle;
  $("#modalBody").innerHTML = `
    <div class="intro-overlay" style="--intro-a:${escapeAttr(intro.colors?.[0] || card.teamColors?.[0] || "#e6b85c")};--intro-b:${escapeAttr(intro.colors?.[1] || card.teamColors?.[1] || "#3fd0c9")}">
      <div class="intro-card">
        <span class="intro-kicker">${escapeHTML(Rarity[card.rarity]?.label || card.rarity)} | #${escapeHTML(card.jerseyNumber)}</span>
        <h3>${escapeHTML(intro.title)}</h3>
        <p>${escapeHTML(introNotice)}</p>
        <div class="intro-motifs">${(intro.motifs || []).map((motif) => `<span>${escapeHTML(motif)}</span>`).join("")}</div>
        <div class="intro-lines" aria-hidden="true"></div>
        <div class="section-actions mt-14">
          <button class="btn" data-action="skip-intro">${escapeHTML(L.skipIntro)}</button>
        </div>
      </div>
    </div>
    <div class="detail-content">
    <div class="detail-grid">
      <div>${this.cardHTML(card, card.owner === "demo_wallet" ? "collection" : "market")}</div>
      <div class="grid">
        <article class="panel panel-pad">
          <div class="section-head compact-head">
            <div><h3>${escapeHTML(L.cardData)}</h3><p>${escapeHTML(L.language)}: ${escapeHTML(LanguageLabels[Store.state.languageMode] || Store.state.languageMode)} / ${escapeHTML(loc.lang)} ${loc.pending ? " | " + escapeHTML(L.translationPending) : ""}</p></div>
            <div class="section-actions">${languageControlsHTML()}<button class="btn" data-action="replay-intro" data-card-id="${card.id}">${escapeHTML(L.replayIntro)}</button></div>
          </div>
          <div class="kv-grid mt-14">
            ${[
              ["sport", Sports[card.sport]?.label],
              ["team", card.team],
              ["league", card.league],
              ["nationality", card.nationality],
              ["rarity", Rarity[card.rarity]?.label],
              ["status", card.status],
              ["era", card.playerEra || "Active"],
              ["owner", card.owner || "unminted"],
              ["last_update", formatDate(card.lastUpdate)]
            ].map(([key, value]) => `<div class="kv"><span>${key}</span><b>${escapeHTML(value)}</b></div>`).join("")}
          </div>
        </article>
        <article class="panel panel-pad">
          <h3>${escapeHTML(L.careerStory)}</h3>
          <p class="story-text">${escapeHTML(loc.biography || loc.careerSummary || "")}</p>
          ${loc.pending ? `<div class="notice mt-14">${escapeHTML(L.translationPending)}</div>` : ""}
          <div class="grid cols-2 mt-14">
            <div>${listBlock("Career Highlights", loc.careerHighlights)}</div>
            <div>${listBlock("Major Awards", loc.majorAwards)}</div>
            <div>${listBlock("Records", loc.records)}</div>
            <div>${listBlock("Skills", card.skills)}</div>
          </div>
        </article>
        <article class="panel panel-pad">
          <h3>${escapeHTML(L.abilitySystem)}</h3>
          <div class="ability-bars mt-14">
            ${Object.entries(card.abilityStats || {}).map(([key, value]) => `<div class="bar-row"><span>${escapeHTML(key)}</span><b>${escapeHTML(value)}</b><i style="width:${clamp(Number(value), 0, 100)}%"></i></div>`).join("")}
          </div>
        </article>
        <article class="panel panel-pad">
          <h3>${escapeHTML(L.collectorAnalysis)}</h3>
          <p>${escapeHTML(loc.collectorValue || card.collectorValue)}</p>
          <div class="valuation-grid mt-14">
            ${[
              ["Base Price", money(valuation.basePrice)],
              ["Rarity Multiplier", `${valuation.rarityMultiplier.toFixed(2)}x`],
              ["Performance Score", valuation.performanceScore.toFixed(2)],
              ["Social Influence", valuation.socialInfluence.toFixed(2)],
              ["Market Heat", valuation.marketHeat.toFixed(2)],
              ["Collector Demand", valuation.collectorDemand.toFixed(2)],
              ["Recent Event Boost", valuation.recentEventBoost.toFixed(2)],
              ["Estimated Value", `${money(valuation.estimatedValue)} ETH`]
            ].map(([k,v]) => `<div><span>${escapeHTML(k)}</span><b>${escapeHTML(v)}</b></div>`).join("")}
          </div>
        </article>
        <article class="panel panel-pad">
          <h3>${escapeHTML(L.socialSources)}</h3>
          <div class="social-grid mt-14">
            ${socialLinksHTML(card)}
          </div>
          <div class="source-list mt-14">
            <div><b>Source Status</b><span>${escapeHTML(card.sourceStatus || "Demo Summary / Pending Official Verification")}</span></div>
            ${(card.officialSources || []).map((source) => `<div><b>${escapeHTML(source.label)}</b><span>${escapeHTML(source.status)}</span>${source.url ? `<a href="${escapeAttr(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.url)}</a>` : ""}</div>`).join("")}
          </div>
        </article>
        <article class="panel panel-pad">
          <h3>${escapeHTML(L.assetStatus)}</h3>
          <div class="kv-grid mt-14">
            ${[
              ["imageUrl", card.imageUrl || "fallback generated card art"],
              ["logoUrl", card.logoUrl || "fallback team code"],
              ["mlbId", card.mlbId || "pending verification"],
              ["imageSourceStatus", card.imageSourceStatus || "fallback generated card art"],
              ["licenseNote", card.licenseNote]
            ].map(([key, value]) => `<div class="kv"><span>${escapeHTML(key)}</span><b>${escapeHTML(value)}</b></div>`).join("")}
          </div>
          <p class="mt-14">本原型中的球員照片僅作為課堂展示與資料結構示範。若未來商業化，球員肖像、球隊 Logo、聯盟商標與影像素材皆需正式授權。</p>
        </article>
        <article class="panel panel-pad">
          <h3>${escapeHTML(L.marketData)}</h3>
          <div class="kv-grid mt-14">
            ${[
              ["Floor Price", `${money(card.marketData?.floorPrice || 0)} ETH`],
              ["Last Sale", `${money(card.marketData?.lastSale || 0)} ETH`],
              ["Volume", `${money(card.marketData?.volume || 0)} ETH`],
              ["Owner", card.owner || card.marketData?.owner || "issuer"],
              ["Seller", card.marketData?.seller || "-"],
              ["Asking Price", card.marketData?.listed ? `${money(card.marketData?.askingPrice || 0)} ETH` : "Not listed"],
              ["Creator Royalty", `${card.marketData?.creatorRoyalty || 5}%`],
              ["Gas Fee", `${money(card.marketData?.gasFee || 0)} ETH`]
            ].map(([key, value]) => `<div class="kv"><span>${key}</span><b>${escapeHTML(value)}</b></div>`).join("")}
          </div>
          ${card.owner === "demo_wallet" ? `
            <div class="listing-panel mt-14">
              <div>
                <b>${escapeHTML(card.marketData?.listed ? "Listed for sale" : L.listForSale)}</b>
                <span>${escapeHTML(card.marketData?.listed ? `${money(card.marketData?.askingPrice || 0)} ETH on secondary market` : "Set a Buy Now price for collectors.")}</span>
              </div>
              ${card.marketData?.listed ? `
                <button class="btn danger" data-action="cancel-listing" data-card-id="${card.id}">${escapeHTML(L.cancelListing)}</button>
              ` : `
                <input class="field listing-price" id="listingPrice-${escapeAttr(card.id)}" type="number" min="0.01" step="0.01" value="${escapeAttr(money((card.marketData?.askingPrice || ValueModel.estimate(card) * 1.06)))}" aria-label="${escapeAttr(L.listingPrice)}" />
                <button class="btn teal" data-action="confirm-listing" data-card-id="${card.id}">${escapeHTML(L.confirmListing)}</button>
              `}
            </div>
          ` : ""}
          <div class="timeline mt-14">
            ${(card.marketData?.offers || []).slice(0, 5).map((offer) => `<div class="log-line"><b>${escapeHTML(offer.from)} | ${money(offer.price)} ETH</b>${escapeHTML(offer.status)} | ${escapeHTML(formatDate(offer.at))}</div>`).join("") || `<div class="log-line">No active offer yet.</div>`}
          </div>
          <div class="section-actions mt-14">
            <button class="btn" data-action="make-offer" data-card-id="${card.id}">${escapeHTML(card.owner === "demo_wallet" ? "Simulate Incoming Offer" : L.makeOffer)}</button>
            ${card.owner === "demo_wallet" ? `<button class="btn teal" data-action="accept-offer" data-card-id="${card.id}" ${(card.marketData?.offers || []).some((offer) => offer.status === "Pending") ? "" : "disabled"}>${(card.marketData?.offers || []).some((offer) => offer.status === "Pending") ? escapeHTML(L.acceptOffer) : escapeHTML(L.noActiveOffer)}</button>` : ""}
          </div>
        </article>
        <article class="panel panel-pad">
          <div class="section-head">
            <div><h3>${escapeHTML(L.metadataViewer)}</h3><p>${escapeHTML(meta.tokenURI)} | validation: demo schema ok</p></div>
            <div class="section-actions"><button class="btn" data-action="copy-json" data-card-id="${card.id}">Copy JSON</button><button class="btn" data-action="download-json" data-card-id="${card.id}">Download</button></div>
          </div>
          <pre class="json-box mt-14">${escapeHTML(JSON.stringify(meta, null, 2))}</pre>
        </article>
      </div>
    </div>
    </div>
  `;
  $("#detailModal").classList.add("open");
  if(shouldAutoIntro) this.playIntro(card.id);
};

UI.closeModal = function(){
  this.finishIntro();
  $("#detailModal").classList.remove("open");
};

UI.playIntro = function(cardId, manual = false){
  const card = Store.card(cardId);
  if(!card) return;
  const intro = card.introAnimation || getIntroAnimation(card);
  const modal = $("#detailModal");
  const overlay = modal.querySelector(".intro-overlay");
  if(!overlay) return;
  clearTimeout(this.introTimer);
  overlay.classList.add("is-active");
  modal.classList.add("intro-playing");
  const duration = manual ? Math.max(1200, Math.min(Number(intro.duration || 1800), 2600)) : (reducedMotion() ? 850 : Number(intro.duration || 1800));
  this.introTimer = setTimeout(() => this.finishIntro(), duration);
};

UI.finishIntro = function(){
  clearTimeout(this.introTimer);
  this.introTimer = null;
  const modal = $("#detailModal");
  if(!modal) return;
  modal.classList.remove("intro-playing");
  modal.querySelector(".intro-overlay")?.classList.remove("is-active");
};

UI.copyMetadata = function(cardId){
  const id = cardId || Store.state.activeDetailId || Store.state.activeOracleId;
  const card = Store.card(id);
  if(!card) return;
  const text = JSON.stringify(Metadata.forCard(card), null, 2);
  copyText(text).then(() => this.toast("已複製", `${card.playerName} Metadata JSON 已複製。`, "OK"));
};

UI.downloadMetadata = function(cardId){
  const id = cardId || Store.state.activeDetailId || Store.state.activeOracleId;
  const card = Store.card(id);
  if(!card) return;
  downloadText(`${card.tokenId}_metadata.json`, JSON.stringify(Metadata.forCard(card), null, 2));
};

UI.copyValue = function(value, label = "內容"){
  if(!value) return;
  copyText(value).then(() => this.toast("已複製", `${label} 已複製。`, "OK"));
};

UI.exportState = function(){
  downloadText("dynamic_player_cards_v3_state.json", JSON.stringify(Store.state, null, 2));
};

UI.resetDemo = function(){
  Store.reset();
  this.render();
  this.toast("Demo 已重置", "Wallet、收藏庫與事件紀錄已回到初始狀態。", "OK");
};

Object.assign(window.NFTPlayerCard, {
  socialLinksHTML
});
