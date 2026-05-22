"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.toast = function(title, message, icon = "OK"){
  clearTimeout(this.toastTimer);
  $("#toastTitle").textContent = title;
  $("#toastMsg").textContent = message;
  $("#toastIcon").textContent = icon;
  $("#toast").classList.add("show");
  this.toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 3200);
};
