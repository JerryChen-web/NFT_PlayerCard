"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const Actions = {
  mint(cardId){
    return this.mintPrimary(cardId);
  },
  mintPrimary(cardId){
    const card = Store.card(cardId);
    if(!card) return UI.toast("找不到卡片", "此卡片不存在。", "NO");
    if(card.owner === "demo_wallet") return UI.toast("已在收藏庫", `${card.playerName} 已完成 Mint。`, "OK");
    if(card.owner && card.owner !== "issuer") return this.secondaryBuy(cardId);
    if(Store.state.wallet < card.price) return UI.toast("餘額不足", "Demo Wallet ETH 不足，無法購買。", "!");
    Store.state.wallet = Number((Store.state.wallet - card.price).toFixed(4));
    card.owner = "demo_wallet";
    card.marketData = ensureMarketData(card);
    card.marketData.owner = "demo_wallet";
    card.marketData.listed = false;
    card.marketData.seller = "";
    card.marketData.lastSale = Number(card.price);
    card.marketData.volume = Number(((card.marketData.volume || 0) + Number(card.price)).toFixed(2));
    card.marketData.priceHistory = card.marketData.priceHistory || [];
    card.marketData.priceHistory.unshift({at:nowISO(), type:"Mint", price:Number(card.price), status:"Confirmed"});
    card.version += 1;
    card.lastUpdate = nowISO();
    card.history = card.history || [];
    const receipt = tradeReceipt("MINT", "issuer", "demo_wallet", card.price);
    card.history.unshift({at:card.lastUpdate, type:"MINT", note:`Minted from primary market for ${money(card.price)} ETH.`, receipt});
    Store.state.lastTradeReceipt = receipt;
    Store.state.activeOracleId = Store.state.activeOracleId || card.id;
    this.log("MINT", card, `一級市場 Mint：${card.playerName}`, -card.price);
    Store.save();
    UI.render();
    UI.toast("購買成功", `${card.playerName} 已加入收藏庫。`, "OK");
  },
  burn(cardId){
    const card = Store.card(cardId);
    if(!card || card.owner !== "demo_wallet") return;
    const refund = Number((ValueModel.estimate(card) * .52).toFixed(4));
    Store.state.wallet = Number((Store.state.wallet + refund).toFixed(4));
    card.owner = null;
    card.marketData = ensureMarketData(card);
    card.marketData.owner = "issuer";
    card.marketData.listed = false;
    card.marketData.seller = "";
    card.version += 1;
    card.lastUpdate = nowISO();
    card.history.unshift({at:card.lastUpdate, type:"DEMO_RETURN", note:`Demo return redeemed ${refund} ETH.`});
    this.log("DEMO_RETURN", card, `Demo 回收：${card.playerName}`, refund);
    if(Store.state.activeOracleId === card.id) Store.state.activeOracleId = Store.ownedCards()[0]?.id || null;
    Store.save();
    UI.render();
    UI.toast("已回收", `${card.playerName} 已從收藏庫移回市場。`, "OK");
  },
  sendOracle(cardId){
    const card = Store.card(cardId);
    if(!card || card.owner !== "demo_wallet") return UI.toast("尚未收藏", "請先 Mint 卡片再送入預言機。", "!");
    Store.state.activeOracleId = card.id;
    Store.state.activeView = "oracle";
    Store.save();
    UI.render();
  },
  oracleEvent(eventId){
    const card = Store.card(Store.state.activeOracleId);
    if(!card || card.owner !== "demo_wallet") return UI.toast("未選擇卡片", "請先選擇收藏庫中的卡片。", "!");
    const event = eventPoolFor(card).find((item) => item.id === eventId);
    if(!event) return;
    const beforeSnapshot = snapshotCard(card);
    const before = Metadata.forCard(card);
    event.apply(card);
    applyOracleBoost(card, event);
    card.version += 1;
    card.lastUpdate = nowISO();
    card.history = card.history || [];
    card.history.unshift({
      at:card.lastUpdate,
      type:`ORACLE_${event.id.toUpperCase()}`,
      note:`${event.title} applied. Metadata v${card.version} generated from manual oracle input.`
    });
    Store.state.lastEffect = {cardId:card.id, effect:event.effect, at:Date.now()};
    Store.state.lastOracleDiff = buildOracleDiff(card, event, beforeSnapshot);
    card.metadataVersions = card.metadataVersions || [];
    card.metadataVersions.unshift({version:card.version, at:card.lastUpdate, reason:event.title, diff:Store.state.lastOracleDiff.changes});
    this.log("ORACLE", card, `${event.title} 更新：${before.rarity} -> ${Rarity[card.rarity]?.label || card.rarity}`, 0);
    Store.save();
    UI.render();
    UI.toast("預言機已更新", `${card.playerName} v${card.version} metadata 已刷新。`, "OK");
  },
  buyNow(cardId){
    const card = Store.card(cardId);
    if(!card) return;
    if(card.owner === "demo_wallet") return UI.toast("已擁有", `${card.playerName} 已在收藏庫。`, "OK");
    if(!card.owner || card.owner === "issuer") return this.mintPrimary(cardId);
    if(card.marketData?.listed) return this.secondaryBuy(cardId);
    return UI.toast("尚未掛單", "此卡片尚未在二級市場掛單出售，可以先 Make Offer。", "!");
  },
  secondaryBuy(cardId){
    const card = Store.card(cardId);
    if(!card) return;
    card.marketData = ensureMarketData(card);
    if(card.owner === "demo_wallet") return UI.toast("已擁有", `${card.playerName} 已在你的收藏庫。`, "OK");
    if(!card.owner || card.owner === "issuer") return this.mintPrimary(cardId);
    if(!card.marketData.listed) return UI.toast("Not Listed", "此卡目前沒有二級市場掛單，可先 Make Offer。", "!");
    const askingPrice = Number(card.marketData.askingPrice || ValueModel.estimate(card));
    const gas = Number((card.marketData.gasFee || .003).toFixed(4));
    const total = Number((askingPrice + gas).toFixed(4));
    if(Store.state.wallet < total) return UI.toast("餘額不足", `Buy Now 需要 ${money(total)} ETH（含 Gas）。`, "!");
    const from = card.owner || card.marketData.owner || "collector";
    Store.state.wallet = Number((Store.state.wallet - total).toFixed(4));
    const receipt = tradeReceipt("SECONDARY_BUY", from, "demo_wallet", askingPrice, gas);
    card.owner = "demo_wallet";
    card.marketData.owner = "demo_wallet";
    card.marketData.listed = false;
    card.marketData.seller = "";
    card.marketData.lastSale = askingPrice;
    card.marketData.volume = Number(((card.marketData.volume || 0) + askingPrice).toFixed(2));
    card.marketData.priceHistory = card.marketData.priceHistory || [];
    card.marketData.priceHistory.unshift({at:nowISO(), type:"Secondary Buy", price:askingPrice, status:"Confirmed"});
    card.version += 1;
    card.lastUpdate = nowISO();
    card.history = card.history || [];
    card.history.unshift({at:card.lastUpdate, type:"SECONDARY_BUY", note:`Buy Now from ${from} for ${money(askingPrice)} ETH plus ${money(gas)} gas.`, receipt});
    Store.state.activeOracleId = card.id;
    Store.state.lastTradeReceipt = receipt;
    this.log("SECONDARY_BUY", card, `二級市場 Buy Now：${card.playerName} ${money(askingPrice)} ETH`, -total);
    Store.save();
    UI.render();
    UI.toast("交易確認", `${card.playerName} 已完成二級市場 Buy Now。`, "TX");
  },
  listForSale(cardId, rawPrice){
    const card = Store.card(cardId);
    if(!card || card.owner !== "demo_wallet") return UI.toast("尚未收藏", "只有持有者可以掛單出售。", "!");
    card.marketData = ensureMarketData(card);
    const askingPrice = Number(rawPrice);
    if(!Number.isFinite(askingPrice) || askingPrice <= 0) return UI.toast("價格無效", "請輸入大於 0 的 ETH 掛單價格。", "!");
    card.marketData.listed = true;
    card.marketData.listingType = "secondary";
    card.marketData.seller = "demo_wallet";
    card.marketData.owner = "demo_wallet";
    card.marketData.askingPrice = Number(askingPrice.toFixed(4));
    card.history = card.history || [];
    card.history.unshift({at:nowISO(), type:"LIST_FOR_SALE", note:`Listed for ${money(card.marketData.askingPrice)} ETH.`});
    this.log("LIST", card, `List for sale: ${card.playerName} ${money(card.marketData.askingPrice)} ETH`, 0);
    Store.save();
    UI.render();
    UI.openDetail(card.id, {skipIntro:true});
    UI.toast("掛單成功", `${card.playerName} 已掛單 ${money(card.marketData.askingPrice)} ETH。`, "OK");
  },
  cancelListing(cardId){
    const card = Store.card(cardId);
    if(!card || card.owner !== "demo_wallet") return;
    card.marketData = ensureMarketData(card);
    card.marketData.listed = false;
    card.marketData.seller = "";
    card.history = card.history || [];
    card.history.unshift({at:nowISO(), type:"CANCEL_LISTING", note:"Owner cancelled the secondary market listing."});
    this.log("CANCEL_LISTING", card, `Cancel listing: ${card.playerName}`, 0);
    Store.save();
    UI.render();
    UI.openDetail(card.id, {skipIntro:true});
    UI.toast("已取消掛單", `${card.playerName} 已從二級市場下架。`, "OK");
  },
  makeOffer(cardId){
    const card = Store.card(cardId);
    if(!card) return;
    card.marketData = ensureMarketData(card);
    const price = Number((ValueModel.estimate(card) * (.86 + Math.random() * .1)).toFixed(2));
    const from = card.owner === "demo_wallet" ? `collector_${Math.floor(1000 + Math.random() * 8999)}` : "demo_wallet";
    const offer = {id:uid("offer"), from, price, at:nowISO(), status:"Pending"};
    card.marketData.offers = card.marketData.offers || [];
    card.marketData.offers.unshift(offer);
    card.history = card.history || [];
    card.history.unshift({at:offer.at, type:"MAKE_OFFER", note:`${offer.from} offered ${money(price)} ETH.`});
    this.log("OFFER", card, `Offer created: ${money(price)} ETH`, 0);
    Store.save();
    UI.render();
    if(Store.state.activeDetailId === card.id) UI.openDetail(card.id, {skipIntro:true});
    UI.toast("出價已建立", `${card.playerName} 新增 ${money(price)} ETH 出價。`, "OK");
  },
  acceptOffer(cardId){
    const card = Store.card(cardId);
    if(!card || card.owner !== "demo_wallet") return UI.toast("無法接受", "只有持有者可以接受出價。", "!");
    card.marketData = ensureMarketData(card);
    const offer = (card.marketData.offers || []).find((item) => item.status === "Pending");
    if(!offer) return UI.toast("No Active Offer", "目前沒有可接受的待處理出價。", "!");
    offer.status = "Accepted";
    card.marketData.offers.forEach((item) => {
      if(item.id !== offer.id && item.status === "Pending") item.status = "Expired";
    });
    const gas = Number((card.marketData.gasFee || .003).toFixed(4));
    const royalty = Number((offer.price * (Number(card.marketData.creatorRoyalty || 0) / 100)).toFixed(4));
    const proceeds = Number((offer.price - gas - royalty).toFixed(4));
    Store.state.wallet = Number((Store.state.wallet + proceeds).toFixed(4));
    const receipt = tradeReceipt("SECONDARY_SALE", "demo_wallet", offer.from, offer.price, gas);
    receipt.royalty = royalty;
    receipt.netProceeds = proceeds;
    card.owner = offer.from;
    card.marketData.owner = offer.from;
    card.marketData.listed = false;
    card.marketData.seller = "";
    card.marketData.lastSale = offer.price;
    card.marketData.volume = Number(((card.marketData.volume || 0) + offer.price).toFixed(2));
    card.marketData.priceHistory = card.marketData.priceHistory || [];
    card.marketData.priceHistory.unshift({at:nowISO(), type:"Sale", price:offer.price, status:"Confirmed"});
    card.version += 1;
    card.lastUpdate = nowISO();
    card.history = card.history || [];
    card.history.unshift({at:nowISO(), type:"ACCEPT_OFFER", note:`Accepted ${money(offer.price)} ETH offer from ${offer.from}.`, receipt});
    Store.state.lastTradeReceipt = receipt;
    this.log("SALE", card, `Accepted offer sale: ${card.playerName} ${money(offer.price)} ETH`, proceeds);
    Store.save();
    UI.render();
    UI.openDetail(card.id, {skipIntro:true});
    UI.toast("交易確認", `${card.playerName} 已售出，錢包增加 ${money(proceeds)} ETH。`, "TX");
  },
  toggleAnimation(){
    Store.state.animationEnabled = Store.state.animationEnabled === false ? true : false;
    Store.save();
    UI.render();
    UI.toast("動畫設定", `卡片預覽動畫 ${Store.state.animationEnabled ? "ON" : "OFF"}。`, "OK");
  },
  setLanguage(value){
    Store.state.languageMode = value || "auto";
    Store.save();
    UI.render();
    if(Store.state.activeDetailId) UI.openDetail(Store.state.activeDetailId, {skipIntro:true});
  },
  toggleWatch(cardId){
    Store.state.watchlist = Store.state.watchlist || [];
    if(Store.state.watchlist.includes(cardId)){
      Store.state.watchlist = Store.state.watchlist.filter((id) => id !== cardId);
    }else{
      Store.state.watchlist.push(cardId);
    }
    const card = Store.card(cardId);
    if(card){
      card.marketData = ensureMarketData(card);
      card.marketData.watchlisted = Store.state.watchlist.includes(cardId);
    }
    Store.save();
    UI.render();
  },
  loadMore(){
    Store.state.visibleCount = Math.min(Store.state.visibleCount + 24, Store.marketCards().length);
    Store.save();
    UI.renderMarket();
  },
  log(type, card, note, delta){
    Store.state.txLog.unshift({
      id:uid("tx"),
      at:nowISO(),
      type,
      tokenId:card?.tokenId || "-",
      cardName:card?.playerName || "-",
      note,
      delta:Number(delta || 0)
    });
    Store.state.txLog = Store.state.txLog.slice(0, 80);
  }
};

Object.assign(window.NFTPlayerCard, {
  Actions
});
