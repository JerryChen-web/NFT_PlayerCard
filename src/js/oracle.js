"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const EventSets = {
  soccer:[
    {id:"goal", icon:"G", title:"進球 +1", impact:"goals +1，解鎖進球光效", effect:"goal", apply(card){
      inc(card,"goals",1); inc(card,"shots",3); addBadge(card,"Goal Spark"); promote(card,"rare");
    }},
    {id:"hat_trick", icon:"HT", title:"帽子戲法", impact:"單場三球，升級 Special Edition", effect:"award", apply(card){
      inc(card,"goals",3); inc(card,"shots",7); addBadge(card,"Hat Trick"); promote(card,"epic"); card.status = "Special Edition";
    }},
    {id:"assist", icon:"A", title:"關鍵助攻", impact:"assists +1，提升傳球資料", effect:"goal", apply(card){
      inc(card,"assists",1); inc(card,"passPct",.3); addBadge(card,"Key Assist");
    }}
  ],
  basketball:[
    {id:"thirty", icon:"30", title:"單場 30+ 得分", impact:"得分能力值上升，新增高光徽章", effect:"award", apply(card){
      inc(card,"points",1.1); inc(card,"fgPct",.4); addBadge(card,"30+ Night"); promote(card,"rare");
    }},
    {id:"triple_double", icon:"TD", title:"大三元", impact:"三項數據達雙位數，升級金色光效", effect:"award", apply(card){
      inc(card,"points",.8); inc(card,"rebounds",.7); inc(card,"assists",.8); addBadge(card,"Triple-Double"); promote(card,"epic"); card.status = "Special Edition";
    }},
    {id:"clutch", icon:"CL", title:"絕殺時刻", impact:"解鎖 Clutch 徽章與版本紀錄", effect:"goal", apply(card){
      inc(card,"points",.5); addBadge(card,"Clutch Shot"); promote(card,"epic");
    }}
  ],
  baseball:[
    {id:"homer", icon:"HR", title:"全壘打", impact:"HR +1，火焰球軌與價值提升", effect:"homer", apply(card){
      inc(card,"homeRuns",1); inc(card,"rbi",2); inc(card,"ops",.006); addBadge(card,"Home Run"); promote(card,"rare");
    }},
    {id:"no_hitter", icon:"NH", title:"無安打紀錄", impact:"投手紀錄版，稀有度升級", effect:"award", apply(card){
      card.stats.era = Number(Math.max(0, Number(card.stats.era ?? 2.8) - .08).toFixed(2));
      card.stats.whip = Number(Math.max(.4, Number(card.stats.whip ?? 1.05) - .03).toFixed(2));
      inc(card,"strikeouts",8); addBadge(card,"No-Hitter Edition"); promote(card,"epic"); card.status = "Record Edition";
    }},
    {id:"walkoff", icon:"WO", title:"再見安打", impact:"解鎖 Walk-off 徽章", effect:"homer", apply(card){
      inc(card,"rbi",1); inc(card,"ops",.004); addBadge(card,"Walk-off"); promote(card,"epic");
    }}
  ],
  legacy:[
    {id:"legacy_moment", icon:"LM", title:"Legacy Moment", impact:"歷史代表時刻重播，提升 Legacy Score", effect:"award", apply(card){
      card.legacyStats = card.legacyStats || legacyStatsFor(card);
      card.legacyStats.legacyScore = clamp((card.legacyStats.legacyScore || 60) + 5, 1, 99);
      card.legacyStats.historicalImpact = clamp((card.legacyStats.historicalImpact || 60) + 4, 1, 99);
      addBadge(card,"Legacy Moment"); promote(card,"epic"); card.status = "Legacy Edition";
    }},
    {id:"hall_of_fame", icon:"HF", title:"Hall of Fame", impact:"名人堂級紀念，收藏需求上升", effect:"award", apply(card){
      card.legacyStats = card.legacyStats || legacyStatsFor(card);
      card.legacyStats.legacyScore = clamp((card.legacyStats.legacyScore || 60) + 8, 1, 99);
      card.legacyStats.collectorDemand = clamp((card.legacyStats.collectorDemand || 60) + 7, 1, 99);
      addBadge(card,"Hall of Fame"); promote(card,"legendary"); card.status = "Icon Edition";
    }},
    {id:"record_anniversary", icon:"RA", title:"Record Anniversary", impact:"紀錄週年推升 Market Heat", effect:"goal", apply(card){
      card.legacyStats = card.legacyStats || legacyStatsFor(card);
      card.legacyStats.culturalInfluence = clamp((card.legacyStats.culturalInfluence || 60) + 5, 1, 99);
      addBadge(card,"Record Anniversary"); promote(card,"rare");
    }},
    {id:"jersey_retirement", icon:"JR", title:"Jersey Retirement", impact:"球衣退休紀念，解鎖收藏徽章", effect:"award", apply(card){
      card.legacyStats = card.legacyStats || legacyStatsFor(card);
      card.legacyStats.collectorDemand = clamp((card.legacyStats.collectorDemand || 60) + 6, 1, 99);
      addBadge(card,"Jersey Retirement"); promote(card,"mythic"); card.status = "Retired Number Edition";
    }}
  ],
  global:[
    {id:"transfer", icon:"TR", title:"轉隊 / 版本更新", impact:"隊名改為 Special Edition，記錄 team 欄位變化", effect:"goal", apply(card){
      card.previousTeam = card.previousTeam || card.team;
      card.team = `${card.team} Special Edition`;
      card.league = `${card.league} Update`;
      card.status = "Team Updated";
      addBadge(card,"Team Update");
    }},
    {id:"injury", icon:"IN", title:"受傷狀態", impact:"status 更新為 Injured，metadata 即時反映", effect:"injury", apply(card){
      card.status = "Injured";
      addBadge(card,"Injury Watch");
    }},
    {id:"award", icon:"MV", title:"MVP / 冠軍", impact:"解鎖獎項徽章，至少升級 Legendary", effect:"award", apply(card){
      addBadge(card,"MVP / Champion"); promote(card,"legendary"); card.status = "Award Edition";
    }}
  ]
};

function isLegacyCard(card){
  return ["Retired","Legend","Historical"].includes(card.playerEra);
}

function eventPoolFor(card){
  return [...(isLegacyCard(card) ? EventSets.legacy : (EventSets[card.sport] || [])), ...EventSets.global];
}

function formatStat(key, value){
  const number = Number(value);
  if(["avg","ops","whip"].includes(key)) return number.toFixed(3).replace(/^0/,"");
  if(["passPct","fgPct"].includes(key)) return `${number.toFixed(1)}%`;
  if(["points","rebounds","assists","steals","blocks","era"].includes(key)) return number.toFixed(1);
  return Number.isFinite(number) ? String(Math.round(number)) : String(value ?? "-");
}

function inc(card, key, amount){
  const current = Number(card.stats?.[key] ?? 0);
  const next = current + amount;
  const decimals = ["avg","ops","whip"].includes(key) ? 3 : ["points","rebounds","assists","steals","blocks","fgPct","passPct","era"].includes(key) ? 1 : 0;
  card.stats[key] = Number(next.toFixed(decimals));
}

function addBadge(card, badge){
  card.badges = Array.isArray(card.badges) ? card.badges : [];
  if(!card.badges.includes(badge)) card.badges.unshift(badge);
  card.badges = card.badges.slice(0, 8);
}

function promote(card, target){
  const currentIndex = rarityOrder.indexOf(card.rarity);
  const targetIndex = rarityOrder.indexOf(target);
  if(targetIndex > currentIndex) card.rarity = target;
}

function snapshotCard(card){
  return {
    stats:clone(card.stats || {}),
    abilityStats:clone(card.abilityStats || {}),
    legacyStats:clone(card.legacyStats || {}),
    rarity:card.rarity,
    value:ValueModel.estimate(card),
    version:card.version
  };
}

function applyOracleBoost(card, event){
  card.abilityStats = card.abilityStats || abilityFor(card.sport, card.position, card.rarity, 25);
  card.marketData = ensureMarketData(card);
  const boost = event.id === "injury" ? -3 : event.id === "transfer" ? 2 : event.id === "award" ? 6 : event.id === "triple_double" || event.id === "hat_trick" || event.id === "no_hitter" ? 5 : 3;
  card.abilityStats.marketHeat = clamp((card.abilityStats.marketHeat || 60) + boost * 2, 1, 99);
  card.abilityStats.clutch = clamp((card.abilityStats.clutch || 60) + (event.id === "injury" ? -2 : boost), 1, 99);
  card.abilityStats.potential = clamp((card.abilityStats.potential || 60) + (boost > 3 ? 1 : 0), 1, 99);
  card.abilityStats.ovr = clamp((card.abilityStats.ovr || 70) + (boost > 4 ? 1 : 0) + (event.id === "injury" ? -1 : 0), 1, 99);
  card.marketData.marketHeat = card.abilityStats.marketHeat;
  card.marketData.collectorDemand = clamp((card.marketData.collectorDemand || 60) + boost, 1, 99);
  card.marketData.recentEventBoost = boost;
  card.legacyStats = card.legacyStats || legacyStatsFor(card);
  if(isLegacyCard(card) || String(event.id).includes("legacy") || ["hall_of_fame","record_anniversary","jersey_retirement"].includes(event.id)){
    card.legacyStats.legacyScore = clamp((card.legacyStats.legacyScore || 60) + Math.max(2, boost), 1, 99);
    card.legacyStats.historicalImpact = clamp((card.legacyStats.historicalImpact || 60) + Math.max(1, boost - 1), 1, 99);
    card.legacyStats.culturalInfluence = clamp((card.legacyStats.culturalInfluence || 60) + Math.max(1, boost), 1, 99);
    card.legacyStats.collectorDemand = clamp((card.legacyStats.collectorDemand || 60) + Math.max(2, boost), 1, 99);
  }
  if(event.id === "award") promote(card,"legendary");
  if(event.id === "no_hitter" || event.id === "hat_trick" || event.id === "triple_double") promote(card,"mythic");
}

function buildOracleDiff(card, event, before){
  const after = snapshotCard(card);
  const changes = [];
  Object.keys({...before.stats, ...after.stats}).forEach((key) => {
    if(String(before.stats[key]) !== String(after.stats[key])) changes.push({type:"stat", key, before:formatStat(key, before.stats[key] ?? 0), after:formatStat(key, after.stats[key] ?? 0)});
  });
  ["ovr","marketHeat","potential","clutch"].forEach((key) => {
    if(before.abilityStats[key] !== after.abilityStats[key]) changes.push({type:"ability", key, before:before.abilityStats[key], after:after.abilityStats[key]});
  });
  Object.keys({...before.legacyStats, ...after.legacyStats}).forEach((key) => {
    if(before.legacyStats[key] !== after.legacyStats[key]) changes.push({type:"legacy", key, before:before.legacyStats[key] ?? 0, after:after.legacyStats[key] ?? 0});
  });
  if(before.rarity !== after.rarity) changes.push({type:"rarity", key:"rarity", before:Rarity[before.rarity]?.label || before.rarity, after:Rarity[after.rarity]?.label || after.rarity});
  changes.push({type:"market", key:"estimatedValue", before:`${money(before.value)} ETH`, after:`${money(after.value)} ETH`});
  return {
    status:["Pending","Verifying","Confirmed","Metadata Updated"],
    payload:{
      eventType:event.id,
      playerId:card.id,
      playerName:card.playerName,
      source:"Manual Oracle Demo",
      verified:true,
      timestamp:nowISO(),
      changes,
      metadataVersion:card.version + 1,
      oracleStatus:"Metadata Updated",
      txHash:`0xora${Date.now().toString(16)}`
    },
    changes
  };
}

Object.assign(window.NFTPlayerCard, {
  EventSets,
  isLegacyCard,
  eventPoolFor,
  formatStat,
  inc,
  addBadge,
  promote,
  snapshotCard,
  applyOracleBoost,
  buildOracleDiff
});
