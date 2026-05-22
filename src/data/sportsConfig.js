"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const Sports = {
  soccer:{
    label:"足球",
    short:"Football",
    tone:"#3fd0c9",
    stats:["goals","assists","appearances","shots","passPct","minutes"],
    defaultStats:{goals:8, assists:5, appearances:12, shots:38, passPct:84.2, minutes:980}
  },
  basketball:{
    label:"籃球",
    short:"Basketball",
    tone:"#e6b85c",
    stats:["points","rebounds","assists","steals","blocks","fgPct"],
    defaultStats:{points:24.8, rebounds:7.2, assists:7.6, steals:1.1, blocks:.6, fgPct:51.2}
  },
  baseball:{
    label:"棒球",
    short:"Baseball",
    tone:"#e55d4f",
    stats:["avg","homeRuns","rbi","ops","stolenBases","strikeouts"],
    defaultStats:{avg:.292, homeRuns:34, rbi:92, ops:.948, stolenBases:12, strikeouts:0}
  }
};

Object.assign(window.NFTPlayerCard, {
  Sports
});
