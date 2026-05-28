"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

function rarityEffectFor(card){
  return RarityVisualEffects[card.rarity] || RarityVisualEffects.common;
}

function getIntroAnimation(card){
  const featured = typeof FeaturedIntroAnimations !== "undefined" ? FeaturedIntroAnimations[card.playerName] : null;
  const colors = card.teamColors || [Sports[card.sport]?.tone || "#3fd0c9", Rarity[card.rarity]?.color || "#e6b85c"];
  if(featured) return {...featured, colors, replayable:true};
  const position = String(card.position || "").toLowerCase();
  let theme = "signature_grid";
  let title = "Dynamic Card Reveal";
  let motifs = ["card seal", "rarity glow", `number ${card.jerseyNumber || "-"}`];
  if(card.sport === "soccer"){
    if(position.includes("goalkeeper")){ theme = "keeper_wall"; title = "Keeper Wall Reveal"; motifs = ["save gloves","box line","defense shield"]; }
    else if(position.includes("back")){ theme = "defense_wall"; title = "Defensive Wall Reveal"; motifs = ["shield","interception line","back line"]; }
    else if(position.includes("mid")){ theme = "passing_map"; title = "Midfield Vision Reveal"; motifs = ["passing lanes","center circle","tempo pulse"]; }
    else { theme = "goal_flash"; title = "Golden Goal Reveal"; motifs = ["shot trail","goal net","gold flash"]; }
  }
  if(card.sport === "basketball"){
    if(position.includes("center")){ theme = "paint_engine"; title = "Paint Engine Reveal"; motifs = ["paint lane","rebound ripple","triple track"]; }
    else if(position.includes("forward")){ theme = "power_drive"; title = "Power Drive Reveal"; motifs = ["court burst","crown flare","rim impact"]; }
    else { theme = "guard_arc"; title = "Guard Arc Reveal"; motifs = ["dribble rhythm","three-point arc","arena lights"]; }
  }
  if(card.sport === "baseball"){
    if(position.includes("pitcher")){ theme = "pitch_spin"; title = "Pitch Spin Reveal"; motifs = ["seam rotation","pitch trail","strike K"]; }
    else if(position.includes("catcher")){ theme = "plate_command"; title = "Plate Command Reveal"; motifs = ["home plate","defense frame","signal lines"]; }
    else { theme = "bat_swing"; title = "Home Plate Reveal"; motifs = ["bat swing","home-run trail","base path"]; }
  }
  return {type:"generated", theme, title, subtitle:`${card.playerName} reveal generated from sport, position and rarity.`, colors, motifs, duration:card.rarity === "mythic" || card.rarity === "limited" || card.rarity === "oneOfOne" ? 2300 : 1800, replayable:true};
}

function reducedMotion(){
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

Object.assign(window.NFTPlayerCard, {
  rarityEffectFor,
  getIntroAnimation,
  reducedMotion
});
