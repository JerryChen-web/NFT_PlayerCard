"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const Views = [
  {id:"dashboard", icon:"總", title:"總覽 Dashboard", subtitle:"資料來源、事件判斷、metadata 更新與動態卡面展示。", nav:"總覽", sub:"Dashboard"},
  {id:"market", icon:"市", title:"Dynamic Card Exchange", subtitle:"150 張球星卡，支援搜尋、排序、Mint、出價與二級市場交易。", nav:"市場", sub:"Market"},
  {id:"collection", icon:"藏", title:"我的收藏庫", subtitle:"管理已 Mint 的 Dynamic NFT 卡片與版本紀錄。", nav:"收藏庫", sub:"Collection"},
  {id:"oracle", icon:"更", title:"預言機事件台", subtitle:"手動注入比賽事件，更新數據、徽章、稀有度與 metadata。", nav:"預言機", sub:"Oracle"},
  {id:"datahub", icon:"資", title:"資料中心", subtitle:"整理 PDF 主線：運動選擇、資料欄位、鏈上鏈下分工與授權風險。", nav:"資料中心", sub:"Data Hub"},
  {id:"studio", icon:"作", title:"卡片工作坊", subtitle:"建立自訂示範卡，測試資料欄位與動態收藏流程。", nav:"工作坊", sub:"Studio"}
];

const EraLabels = {
  all:"All Eras",
  Active:"Active",
  Retired:"Retired",
  Legend:"Legend",
  Historical:"Historical"
};

const LanguageLabels = {
  auto:"Auto",
  "zh-Hant":"繁中",
  en:"English"
};

const UIStrings = {
  "zh-Hant":{
    cardData:"卡片資料", careerStory:"球員生平", abilitySystem:"能力值系統", collectorAnalysis:"收藏價值分析",
    socialSources:"社群與官方資料", assetStatus:"圖片來源 / 授權狀態", marketData:"市場資料與出價",
    metadataViewer:"Metadata 版本檢視", language:"語言", replayIntro:"重播過場動畫", skipIntro:"跳過動畫",
    introOff:"動畫目前已關閉，可手動重播。", reducedMotion:"已依裝置設定降低動畫。", translationPending:"Translation pending",
    listingPrice:"掛單價格", confirmListing:"確認掛單", cancelListing:"取消掛單", listForSale:"掛單出售",
    acceptOffer:"接受出價", noActiveOffer:"No Active Offer", makeOffer:"Make Offer"
  },
  en:{
    cardData:"Card Data", careerStory:"Career Story", abilitySystem:"Ability System", collectorAnalysis:"Collector Value Analysis",
    socialSources:"Social & Official Sources", assetStatus:"Image Source / Asset Status", marketData:"Market Data & Offers",
    metadataViewer:"Metadata Version Viewer", language:"Language", replayIntro:"Replay Intro", skipIntro:"Skip Intro",
    introOff:"Animations are off. Replay is still available manually.", reducedMotion:"Motion has been reduced by device preference.", translationPending:"Translation pending",
    listingPrice:"Listing Price", confirmListing:"Confirm Listing", cancelListing:"Cancel Listing", listForSale:"List for Sale",
    acceptOffer:"Accept Offer", noActiveOffer:"No Active Offer", makeOffer:"Make Offer"
  }
};

const StatLabels = {
  goals:"GOALS", assists:"ASSISTS", appearances:"APP", shots:"SHOTS", passPct:"PASS%", minutes:"MIN",
  points:"PTS", rebounds:"REB", steals:"STL", blocks:"BLK", fgPct:"FG%",
  avg:"AVG", homeRuns:"HR", rbi:"RBI", ops:"OPS", stolenBases:"SB", strikeouts:"K",
  era:"ERA", whip:"WHIP"
};

Object.assign(window.NFTPlayerCard, {
  Views,
  EraLabels,
  LanguageLabels,
  UIStrings,
  StatLabels
});
