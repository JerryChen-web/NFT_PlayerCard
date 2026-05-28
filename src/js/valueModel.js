"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const ValueModel = {
  score(card){
    const rarityWeight = Rarity[card.rarity]?.weight || 1;
    const badgeBoost = (card.badges?.length || 0) * .06;
    const versionBoost = Math.max(0, (card.version || 1) - 1) * .035;
    const statBoost = Object.values(card.stats || {}).reduce((sum, value) => sum + Math.min(Number(value) || 0, 120) / 900, 0);
    return 1 + rarityWeight * .08 + badgeBoost + versionBoost + statBoost;
  },
  breakdown(card){
    const basePrice = Number(card.price || .1);
    const rarityMultiplier = Rarity[card.rarity]?.multiplier || 1;
    const ability = card.abilityStats || {};
    const legacy = card.legacyStats || {};
    const performanceScore = clamp(.82 + (ability.ovr || 75) / 125 + Object.values(card.stats || {}).reduce((sum, value) => sum + Math.min(Math.abs(Number(value) || 0), 150) / 3000, 0), .85, 1.95);
    const socialInfluence = clamp((card.marketData?.socialInfluence || 58) / 70, .72, 1.5);
    const marketHeat = clamp((card.marketData?.marketHeat || ability.marketHeat || 60) / 72, .72, 1.45);
    const collectorDemand = clamp(((card.marketData?.collectorDemand || 60) + (legacy.collectorDemand || 0) * .18) / 75, .74, 1.5);
    const recentEventBoost = clamp(1 + Math.min((card.version || 1) - 1, 12) * .018 + (card.status !== "Active" ? .035 : 0), 1, 1.34);
    const estimatedValue = clamp(basePrice * rarityMultiplier * performanceScore * socialInfluence * marketHeat * collectorDemand * recentEventBoost, .01, 999);
    return {basePrice, rarityMultiplier, performanceScore, socialInfluence, marketHeat, collectorDemand, recentEventBoost, estimatedValue};
  },
  estimate(card){
    return this.breakdown(card).estimatedValue;
  }
};

Object.assign(window.NFTPlayerCard, {
  ValueModel
});
