"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

function tradeReceipt(type, from, to, price, gasFee){
  const gas = Number((gasFee ?? (.002 + Math.random() * .006)).toFixed(4));
  return {
    txHash:`0x${Math.random().toString(16).slice(2).padEnd(12,"0")}${Date.now().toString(16)}`,
    blockNumber:Math.floor(18400000 + Math.random() * 900000),
    gasFee:gas,
    from,
    to,
    price:Number(price || 0),
    status:"Confirmed",
    timestamp:nowISO(),
    type
  };
}

Object.assign(window.NFTPlayerCard, {
  tradeReceipt
});
