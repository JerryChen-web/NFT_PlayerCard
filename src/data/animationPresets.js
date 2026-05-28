"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const FeaturedIntroAnimations = {
  "Lionel Messi":{type:"signature", theme:"gold_vision", title:"Vision of the Maestro", subtitle:"Passing lanes unfold into a number 10 seal.", motifs:["passing lanes","stadium lights","number 10 seal"], duration:2200},
  "Kylian Mbappe":{type:"signature", theme:"tricolor_sprint", title:"Tricolor Sprint Freeze", subtitle:"Blue-white-red speed trails lock into the reveal.", motifs:["speed trails","France colors","sprint freeze"], duration:1900},
  "Erling Haaland":{type:"signature", theme:"blue_thunder", title:"Box Thunder Impact", subtitle:"Blue power lines shake the goal frame.", motifs:["goal net","thunder strike","number 9"], duration:2100},
  "LeBron James":{type:"signature", theme:"crown_23", title:"Crown Court 23", subtitle:"A gold crown rises over the court grid.", motifs:["crown","number 23","court lines"], duration:2200},
  "Stephen Curry":{type:"signature", theme:"deep_range_arc", title:"Deep Range Orbit", subtitle:"A three-point arc lands as a glowing range ring.", motifs:["three point arc","spark trail","range ring"], duration:2000},
  "Nikola Jokic":{type:"signature", theme:"triple_engine", title:"Triple-Double Engine", subtitle:"PTS, REB and AST tracks launch together.", motifs:["PTS","REB","AST","passing hub"], duration:2200},
  "Shohei Ohtani":{type:"signature", theme:"two_way_split", title:"Two-Way Icon Reveal", subtitle:"Pitch trail and bat swing merge into one seal.", motifs:["pitch trail","bat swing","number 17 seal"], duration:2300},
  "Aaron Judge":{type:"signature", theme:"home_run_99", title:"All Rise Home Run", subtitle:"A red ball trail rises into the number 99.", motifs:["home run trail","number 99","power halo"], duration:2100},
  "Juan Soto":{type:"signature", theme:"plate_vision", title:"Plate Vision Lock", subtitle:"The strike-zone frame locks onto the ball path.", motifs:["strike zone","ball tracking","plate vision"], duration:2000}
};

Object.assign(window.NFTPlayerCard, {
  FeaturedIntroAnimations
});
