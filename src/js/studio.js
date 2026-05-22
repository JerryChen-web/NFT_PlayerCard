"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.addCustomCard = function(target){
  const sportId = $("#studioSport")?.value || "soccer";
  const sport = Sports[sportId] || Sports.soccer;
  const stats = {};
  sport.stats.forEach((key) => {
    const input = $(`#stat_${cssEscape(key)}`);
    stats[key] = Number(input?.value || sport.defaultStats[key] || 0);
  });
  const card = {
    id:uid("custom_card"),
    tokenId:`DSP-2026-CUSTOM-${String(Store.state.cards.length + 1).padStart(3,"0")}`,
    sport:sportId,
    playerName:$("#studioName").value.trim() || "CUSTOM PLAYER",
    team:$("#studioTeam").value.trim() || "Concept Team",
    teamCode:"CUS",
    league:$("#studioLeague").value.trim() || "Concept League",
    position:$("#studioPosition").value.trim() || "Player",
    jerseyNumber:$("#studioJersey").value.trim() || "0",
    nationality:$("#studioNationality").value.trim() || "Unknown",
    continent:"Custom",
    rarity:$("#studioRarity").value,
    price:Number($("#studioPrice").value || .38),
    owner:target === "collection" ? "demo_wallet" : null,
    serial:`CU-${String(Store.state.cards.length + 1).padStart(3,"0")}/999`,
    status:"Active",
    version:target === "collection" ? 2 : 1,
    lastUpdate:nowISO(),
    imageUrl:$("#studioImage").value.trim(),
    logoUrl:$("#studioLogo").value.trim(),
    teamColors:[sport.tone, Rarity[$("#studioRarity").value]?.color || "#e6b85c"],
    badges:["Custom Demo"],
    stats,
    metadata:{sourceUrl:"", dataSource:"Card Studio custom demo data.", animationUrl:"dsp-player-card-v3.html#custom"},
    history:[{at:nowISO(), type:target === "collection" ? "CUSTOM_MINT" : "CUSTOM_CREATE", note:`Card Studio created card into ${target}.`}],
    licenseNote:"Custom concept card."
  };
  enrichCard(card, Store.state.cards.length + 1);
  Store.state.cards.unshift(card);
  if(target === "collection"){
    Actions.log("CUSTOM_MINT", card, `Card Studio 直接 Mint：${card.playerName}`, 0);
    Store.state.activeOracleId = card.id;
  }
  Store.state.activeView = target === "collection" ? "collection" : "market";
  Store.save();
  this.render();
  this.toast("自訂卡已建立", `${card.playerName} 已加入${target === "collection" ? "收藏庫" : "市場"}。`, "OK");
};
