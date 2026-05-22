"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

function emptySocialLinks(){
  return {
    instagram:{handle:"", url:"", status:"Pending Official Verification"},
    x:{handle:"", url:"", status:"Pending Official Verification"},
    facebook:{handle:"", url:"", status:"Pending Official Verification"},
    youtube:{handle:"", url:"", status:"Pending Official Verification"},
    tiktok:{handle:"", url:"", status:"Pending Official Verification"},
    officialWebsite:{label:"Official Website", url:"", status:"Pending Official Verification"},
    leagueProfile:{label:"League Profile", url:"", status:"Pending Official Verification"},
    teamProfile:{label:"Team Profile", url:"", status:"Pending Official Verification"}
  };
}

function normalizeSocialLinks(links = {}, defaultStatus = "Pending Official Verification"){
  const base = emptySocialLinks();
  Object.entries(base).forEach(([key, fallback]) => {
    const value = links[key];
    if(typeof value === "string"){
      base[key] = {...fallback, url:value, handle:handleFromUrl(key, value), status:value ? defaultStatus : fallback.status};
    }else if(value && typeof value === "object"){
      const url = value.url || "";
      base[key] = {...fallback, ...value, url, handle:value.handle || handleFromUrl(key, url), status:value.status || (url ? defaultStatus : fallback.status)};
    }
  });
  return base;
}

function handleFromUrl(key, url){
  if(!url) return "";
  const clean = String(url).replace(/\/+$/,"");
  if(["instagram","x","facebook","tiktok"].includes(key)){
    const part = clean.split("/").filter(Boolean).pop() || "";
    return part && !part.includes(".") ? part.replace(/^@/,"") : "";
  }
  return "";
}

function socialUrl(entry){
  if(!entry) return "";
  return typeof entry === "string" ? entry : entry.url || "";
}

function localizedFor(card){
  const featured = typeof FeaturedLocalized !== "undefined" ? FeaturedLocalized[card.playerName] : null;
  if(featured) return clone(featured);
  return {
    en:{
      careerSummary:card.careerSummary || summaryFor(card),
      biography:card.biography || biographyFor(card),
      playStyle:card.playStyle || playStyleFor(card),
      collectorValue:card.collectorValue || collectorTextFor(card),
      careerHighlights:card.careerHighlights || [],
      majorAwards:card.majorAwards || [],
      records:card.records || [],
      translationStatus:"Demo Summary / Translation pending"
    }
  };
}

function currentLanguage(){
  const mode = Store.state?.languageMode || "auto";
  if(mode === "zh-Hant" || mode === "en") return mode;
  const lang = navigator.language || "";
  return /zh-(TW|HK|Hant)|zh_Hant|zh/i.test(lang) ? "zh-Hant" : "en";
}

function uiText(){
  return UIStrings[currentLanguage()] || UIStrings.en;
}

function localizedCard(card){
  const lang = currentLanguage();
  const localized = card.localized || localizedFor(card);
  const chosen = localized[lang] || localized.en || localized["zh-Hant"] || {};
  const pending = !localized[lang];
  return {
    lang,
    pending,
    careerSummary:chosen.careerSummary || card.careerSummary || "",
    biography:chosen.biography || card.biography || card.careerSummary || "",
    playStyle:chosen.playStyle || card.playStyle || "",
    collectorValue:chosen.collectorValue || card.collectorValue || "",
    careerHighlights:chosen.careerHighlights || card.careerHighlights || [],
    majorAwards:chosen.majorAwards || card.majorAwards || [],
    records:chosen.records || card.records || []
  };
}

function languageControlsHTML(){
  return `
    <div class="language-tools">
      ${Object.entries(LanguageLabels).map(([id, label]) => `<button class="btn ${Store.state.languageMode === id ? "teal" : ""}" data-action="set-language" data-language="${id}">${escapeHTML(label)}</button>`).join("")}
    </div>
  `;
}

Object.assign(window.NFTPlayerCard, {
  emptySocialLinks,
  normalizeSocialLinks,
  handleFromUrl,
  socialUrl,
  localizedFor,
  currentLanguage,
  uiText,
  localizedCard,
  languageControlsHTML
});
