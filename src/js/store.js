"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const Store = {
  key:"dsp_player_cards_v3_exchange_state_20260520",
  state:null,
  defaults(){
    return {
      wallet:12.5,
      activeView:"dashboard",
      search:"",
      filterSport:"all",
      filterLeague:"all",
      filterRarity:"all",
      filterEra:"all",
      sortBy:"marketHeat",
      animationEnabled:true,
      languageMode:"auto",
      visibleCount:24,
      activeOracleId:null,
      activeDetailId:null,
      activeListingId:null,
      lastEffect:null,
      lastOracleDiff:null,
      lastTradeReceipt:null,
      watchlist:[],
      txLog:[],
      cards:clone(StarterCards)
    };
  },
  load(){
    try{
      const raw = localStorage.getItem(this.key);
      if(!raw){
        this.state = this.defaults();
        return;
      }
      const parsed = JSON.parse(raw);
      const defaults = this.defaults();
      const mergedCards = mergeCardDefaults(Array.isArray(parsed.cards) ? parsed.cards : [], defaults.cards);
      this.state = {
        ...defaults,
        ...parsed,
        cards:mergedCards,
        txLog:Array.isArray(parsed.txLog) ? parsed.txLog : defaults.txLog,
        watchlist:Array.isArray(parsed.watchlist) ? parsed.watchlist : defaults.watchlist
      };
    }catch(_error){
      this.state = this.defaults();
    }
  },
  save(){
    localStorage.setItem(this.key, JSON.stringify(this.state));
  },
  reset(){
    localStorage.removeItem(this.key);
    this.state = this.defaults();
    this.save();
  },
  card(id){
    return this.state.cards.find((card) => card.id === id);
  },
  ownedCards(){
    return this.state.cards.filter((card) => card.owner === "demo_wallet");
  },
  leagues(){
    return Array.from(new Set(this.state.cards.map((card) => card.league).filter(Boolean))).sort();
  },
  marketCards(){
    const keyword = this.state.search.trim().toLowerCase();
    const filtered = this.state.cards.filter((card) => {
      const sportOK = this.state.filterSport === "all" || card.sport === this.state.filterSport;
      const leagueOK = this.state.filterLeague === "all" || card.league === this.state.filterLeague;
      const rarityOK = this.state.filterRarity === "all" || card.rarity === this.state.filterRarity;
      const eraOK = this.state.filterEra === "all" || card.playerEra === this.state.filterEra;
      const haystack = `${card.playerName} ${card.team} ${card.league} ${card.nationality} ${card.position} ${(card.skills || []).join(" ")}`.toLowerCase();
      return sportOK && leagueOK && rarityOK && eraOK && (!keyword || haystack.includes(keyword));
    });
    return sortCards(filtered, this.state.sortBy);
  }
};

function mergeCardDefaults(saved, defaults){
  const savedById = new Map(saved.map((card) => [card.id, card]));
  const merged = defaults.map((base) => {
    const existing = savedById.get(base.id);
    const next = existing ? {...base, ...existing, stats:{...(base.stats || {}), ...(existing.stats || {})}, metadata:{...(base.metadata || {}), ...(existing.metadata || {})}} : base;
    if(!next.mlbId && base.mlbId) next.mlbId = base.mlbId;
    if(!next.imageUrl && base.imageUrl) next.imageUrl = base.imageUrl;
    if(!next.logoUrl && base.logoUrl) next.logoUrl = base.logoUrl;
    if(next.imageUrl && /fallback/i.test(next.imageSourceStatus || "")) next.imageSourceStatus = "";
    if(next.logoUrl && next.assetStatus?.teamLogo === "fallback") next.assetStatus.teamLogo = "available";
    return enrichCard(next);
  });
  saved.forEach((card) => {
    if(!merged.some((item) => item.id === card.id)) merged.push(enrichCard(card));
  });
  return merged;
}

Object.assign(window.NFTPlayerCard, {
  Store,
  mergeCardDefaults
});
