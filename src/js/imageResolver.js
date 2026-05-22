"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

function leagueHub(sport){
  if(sport === "basketball") return "https://www.nba.com/players";
  if(sport === "baseball") return "https://www.mlb.com/players";
  return "https://www.fifa.com/";
}

function getBaseballHeadshot(playerName, mlbId){
  return mlbId ? `https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/${mlbId}/headshot/67/current` : "";
}

function teamColors(team, sport){
  const palette = [["#3fd0c9","#e6b85c"],["#6aa7ff","#f7f2e8"],["#e55d4f","#e6b85c"],["#b590ff","#3fd0c9"],["#78c66d","#e6b85c"]];
  return palette[Math.abs(hashCode(team + sport)) % palette.length];
}

function teamCode(team){
  return String(team || "DSP").replace(/[^A-Za-z ]/g,"").split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0,3).toUpperCase() || "DSP";
}

function nationalityText(value){
  return value ? `${value}-connected` : "international";
}

function slug(value){
  return String(value || "card").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
}

function hashCode(value){
  return String(value).split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

Object.assign(window.NFTPlayerCard, {
  leagueHub,
  getBaseballHeadshot,
  teamColors,
  teamCode,
  nationalityText,
  slug,
  hashCode
});
