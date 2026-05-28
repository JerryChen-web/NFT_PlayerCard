"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const Rarity = {
  common:{label:"Common", color:"#a7b1b7", glow:"rgba(167,177,183,.20)", multiplier:1, weight:1, drop:"46%", market:"Entry-level star card"},
  uncommon:{label:"Uncommon", color:"#78c66d", glow:"rgba(120,198,109,.22)", multiplier:1.12, weight:1.35, drop:"24%", market:"Early collector pick"},
  rare:{label:"Rare", color:"#3fd0c9", glow:"rgba(63,208,201,.24)", multiplier:1.28, weight:2, drop:"15%", market:"High-upside active star"},
  superRare:{label:"Super Rare", color:"#6aa7ff", glow:"rgba(106,167,255,.25)", multiplier:1.46, weight:2.5, drop:"8%", market:"Premium starter"},
  epic:{label:"Epic", color:"#b590ff", glow:"rgba(181,144,255,.27)", multiplier:1.72, weight:3, drop:"4%", market:"Signature performance card"},
  legendary:{label:"Legendary", color:"#e6b85c", glow:"rgba(230,184,92,.30)", multiplier:2.25, weight:4, drop:"2%", market:"GOAT / MVP tier"},
  mythic:{label:"Mythic", color:"#ff6b5f", glow:"rgba(255,107,95,.34)", multiplier:2.85, weight:4.7, drop:"0.7%", market:"Record-breaking chase card"},
  limited:{label:"Limited", color:"#ff8db4", glow:"rgba(255,141,180,.34)", multiplier:3.2, weight:5.2, drop:"0.25%", market:"Numbered event edition"},
  oneOfOne:{label:"One of One", color:"#f7f2e8", glow:"rgba(247,242,232,.42)", multiplier:5.6, weight:7, drop:"1/1", market:"Unique grail card"}
};
const rarityOrder = ["common","uncommon","rare","superRare","epic","legendary","mythic","limited","oneOfOne"];

const RarityVisualEffects = {
  common:{label:"Matte Border", intensity:"low", motifs:["soft haze"], shader:"matte_mist"},
  uncommon:{label:"Green Edge Glow", intensity:"low", motifs:["thin green edge"], shader:"green_edge"},
  rare:{label:"Cyan Flow Border", intensity:"medium", motifs:["cyan flowline"], shader:"cyan_flow"},
  superRare:{label:"Blue Scan Light", intensity:"medium", motifs:["blue scan sweep"], shader:"blue_scan"},
  epic:{label:"Violet Particle Aura", intensity:"high", motifs:["violet particles","soft aura"], shader:"violet_particles"},
  legendary:{label:"Gold Legendary Flow", intensity:"high", motifs:["gold shimmer","signature glow"], shader:"gold_flow"},
  mythic:{label:"Red Gold Energy Ripple", intensity:"very high", motifs:["red energy","gold pulse"], shader:"red_gold_ripple"},
  limited:{label:"Pink Gold Numbered Glow", intensity:"very high", motifs:["numbered light","pink gold flare"], shader:"pink_gold_limited"},
  oneOfOne:{label:"Prism One of One", intensity:"max", motifs:["prism sweep","unique seal"], shader:"prism_one"}
};

Object.assign(window.NFTPlayerCard, {
  Rarity,
  rarityOrder,
  RarityVisualEffects
});
