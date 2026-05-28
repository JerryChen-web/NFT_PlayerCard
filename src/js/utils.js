"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const clone = (value) => JSON.parse(JSON.stringify(value));
const nowISO = () => new Date().toISOString();
const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
const money = (value) => Number(value || 0).toFixed(2);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[char]));
const escapeAttr = escapeHTML;

function option(value, label, selected){
  return `<option value="${escapeAttr(value)}" ${String(value) === String(selected) ? "selected" : ""}>${escapeHTML(label)}</option>`;
}

function field(id, label, value, type = "text", step = "", min = ""){
  return `
    <div class="form-field">
      <label for="${escapeAttr(id)}">${escapeHTML(label)}</label>
      <input class="field" id="${escapeAttr(id)}" type="${type}" ${step ? `step="${escapeAttr(step)}"` : ""} ${min ? `min="${escapeAttr(min)}"` : ""} value="${escapeAttr(value)}" />
    </div>
  `;
}

function listBlock(title, items){
  const list = Array.isArray(items) ? items : String(items || "").split(/\n|;|,/).filter(Boolean);
  return `<h4>${escapeHTML(title)}</h4><ul class="clean-list">${list.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
}

function initials(name){
  const parts = String(name || "CARD").replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
  if(!parts.length) return "DC";
  if(parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatDate(iso){
  try{
    return new Date(iso).toLocaleString("zh-TW", {hour12:false});
  }catch(_){
    return iso || "-";
  }
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:"application/json;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
  }catch(_){
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

function cssEscape(value){
  if(window.CSS && CSS.escape) return CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

Object.assign(window.NFTPlayerCard, {
  $,
  $$,
  clone,
  nowISO,
  uid,
  money,
  clamp,
  escapeHTML,
  escapeAttr,
  option,
  field,
  listBlock,
  initials,
  formatDate,
  downloadText,
  copyText,
  cssEscape
});
