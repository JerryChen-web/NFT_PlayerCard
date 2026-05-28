"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

UI.renderDataHub = function(){
  $("#view-datahub").innerHTML = `
    <div class="section-head">
      <div>
        <h3>資料架構與期末報告規格</h3>
        <p>根據 PDF 整理成網站可展示的資料規格：選題理由、卡片欄位、動態更新邏輯、metadata 與授權風險。</p>
      </div>
    </div>
    <section class="grid cols-2 align-start">
      <article class="panel panel-pad">
        <h3>為什麼選三大運動</h3>
        <table class="mt-14">
          <tr><th>運動</th><th>定位</th><th>Demo 用途</th></tr>
          <tr><td>足球</td><td>全球覆蓋最廣，球星辨識度高</td><td>進球、帽子戲法、轉隊版本</td></tr>
          <tr><td>籃球</td><td>年輕數位市場與個人數據直觀</td><td>30+ 得分、大三元、絕殺</td></tr>
          <tr><td>棒球</td><td>高數據密度與成熟收藏卡文化</td><td>全壘打、無安打、再見安打</td></tr>
        </table>
      </article>
      <article class="panel panel-pad">
        <h3>卡片欄位</h3>
        <table class="mt-14">
          <tr><th>資料表</th><th>欄位</th></tr>
          <tr><td>球員基本資料</td><td>playerName、nationality、team、league、position、jerseyNumber</td></tr>
          <tr><td>表現數據</td><td>足球 goals / assists，籃球 points / rebounds / assists，棒球 AVG / HR / RBI / OPS</td></tr>
          <tr><td>卡片資料</td><td>tokenId、rarity、price、owner、version、lastUpdate、badges、history</td></tr>
          <tr><td>素材資料</td><td>imageUrl、logoUrl、teamColors、licenseNote、sourceUrl</td></tr>
        </table>
      </article>
      <article class="panel panel-pad">
        <h3>動態更新邏輯</h3>
        <table class="mt-14">
          <tr><th>事件</th><th>資料變化</th><th>卡面變化</th></tr>
          <tr><td>進球 / 全壘打</td><td>核心數據加總，版本 +1</td><td>事件光效、徽章、估值提升</td></tr>
          <tr><td>大三元 / 帽子戲法</td><td>多欄位同步更新</td><td>升級 Epic 或 Special Edition</td></tr>
          <tr><td>轉隊 / 受傷</td><td>team 或 status 欄位更新</td><td>metadata 反映狀態變化</td></tr>
          <tr><td>MVP / 冠軍</td><td>新增 award badge</td><td>至少升級 Legendary</td></tr>
        </table>
      </article>
      <article class="panel panel-pad">
        <h3>NFT 與鏈上鏈下分工</h3>
        <table class="mt-14">
          <tr><th>層級</th><th>負責內容</th></tr>
          <tr><td>鏈上</td><td>ERC-721 token、owner、tokenURI、轉移紀錄</td></tr>
          <tr><td>鏈下</td><td>比賽資料、圖片、metadata JSON、授權資訊</td></tr>
          <tr><td>Oracle</td><td>把外部運動事件送進更新邏輯</td></tr>
          <tr><td>前端</td><td>卡面動畫、資料面板、版本歷史、metadata 預覽</td></tr>
        </table>
      </article>
    </section>
    <section class="panel panel-pad mt-14">
      <h3>授權與風險聲明</h3>
      <p>本原型僅作為課堂展示用途。若未來商業化，球員肖像、球隊 Logo、聯盟商標、社群帳號資料與比賽數據皆需取得正式授權。正式版本可採用授權照片、自製插畫、生成式虛構角色，或經球員、球隊、聯盟同意的官方素材。</p>
    </section>
    <section class="panel panel-pad mt-14">
      <h3>Chain Flow：鏈上 / 鏈下 / Oracle 架構</h3>
      <div class="chain-flow long mt-14">
        ${["比賽事件","Sports API / Manual Oracle","Oracle 驗證","更新 stats","更新 abilityStats","產生 metadata JSON","tokenURI 指向新版 metadata","前端卡面動態更新","收藏者看到升級","history / txLog 紀錄"].map((step, index) => `<div class="flow-step active"><b>${index + 1}</b><span>${escapeHTML(step)}</span></div>`).join("")}
      </div>
      <p>這個流程對應 Dynamic NFT、Oracle、metadata、tokenURI、鏈上所有權、鏈下資料、智能合約概念、數位收藏品與交易紀錄。</p>
    </section>
  `;
};
