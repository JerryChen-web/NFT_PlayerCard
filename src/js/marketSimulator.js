"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

function buildStarterCards(){
  enrichCards(FeaturedCards);
  const cards = [...FeaturedCards];
  const existing = new Set(cards.map((card) => card.playerName));
  Object.entries(TopRosters).forEach(([sport, rows]) => {
    let rank = cards.filter((card) => card.sport === sport).length + 1;
    rows.forEach((row) => {
      if(cards.filter((card) => card.sport === sport).length >= 50) return;
      if(existing.has(row[0])) return;
      const card = makeGeneratedCard(sport, row, rank);
      cards.push(card);
      existing.add(card.playerName);
      rank += 1;
    });
  });
  return cards;
}

function enrichCards(cards){
  cards.forEach((card, index) => enrichCard(card, index + 1));
}

function makeGeneratedCard(sport, row, rank){
  const [playerName, team, league, position, jerseyNumber, nationality, continent] = row;
  const code = sport === "soccer" ? "SC" : sport === "basketball" ? "BK" : "BB";
  const rarity = rarityByRank(rank);
  const mlbId = sport === "baseball" ? (MLBPlayerIds[playerName] || "") : "";
  const card = {
    id:`card_${sport}_${slug(playerName)}`,
    tokenId:`DSP-2026-${code}-${String(rank).padStart(3,"0")}`,
    sport, playerName, team, teamCode:teamCode(team), league, position, jerseyNumber, nationality, continent,
    mlbId,
    rarity, price:priceByRank(rank, sport), owner:null, serial:`${code}-${String(rank).padStart(3,"0")}/${rarity === "oneOfOne" ? "001" : rarity === "limited" ? "500" : rarity === "legendary" ? "700" : "1500"}`,
    status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:sport === "baseball" ? getBaseballHeadshot(playerName, mlbId) : "",
    logoUrl:sport === "baseball" ? (MLBTeamLogoMap[team] || "") : "",
    teamColors:teamColors(team, sport), badges:badgesFor(sport, position, rank),
    stats:statsByRank(sport, rank, position),
    metadata:{sourceUrl:leagueHub(sport), dataSource:"demo; pending official verification; needs source verification", animationUrl:`dsp-player-card-v3.html#${slug(playerName)}`},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED_PENDING_VERIFY", note:"Expanded demo roster card generated from public top-player context; official biography/social verification pending."}],
    licenseNote:"Demo roster entry. Official images, marks, social accounts and live statistics require formal rights verification before commercial use."
  };
  enrichCard(card, rank);
  return card;
}

function enrichCard(card, rank = 25){
  card.birthDate = card.birthDate || "pending official verification";
  card.birthPlace = card.birthPlace || "pending official verification";
  card.height = card.height || "pending official verification";
  card.weight = card.weight || "pending official verification";
  card.skills = card.skills || skillsFor(card.sport, card.position, rank);
  card.abilityStats = card.abilityStats || abilityFor(card.sport, card.position, card.rarity, rank);
  card.playerEra = card.playerEra || playerEraFor(card);
  card.era = card.era || {status:card.playerEra, primeYears:card.playerEra === "Active" ? "current" : "legacy archive", generation:card.playerEra === "Active" ? "modern" : "legend"};
  card.legacyStats = card.legacyStats || legacyStatsFor(card);
  const featuredProfile = FeaturedProfiles[card.playerName];
  if(featuredProfile){
    ["careerSummary","biography","careerHighlights","majorAwards","records","playStyle","collectorValue"].forEach((key) => {
      if(featuredProfile[key]) card[key] = clone(featuredProfile[key]);
    });
    if(featuredProfile.socialLinks) card.socialLinks = {...(card.socialLinks || {}), ...featuredProfile.socialLinks};
    if(featuredProfile.officialSources) card.officialSources = clone(featuredProfile.officialSources);
    card.sourceStatus = featuredProfile.sourceStatus || "Verified Seed Link / Demo Use";
  }
  card.majorAwards = card.majorAwards || awardsFor(card.sport, rank, card.playerName);
  card.records = card.records || recordsFor(card.sport, rank, card.playerName);
  card.careerHighlights = card.careerHighlights || highlightsFor(card);
  card.playStyle = card.playStyle || playStyleFor(card);
  card.collectorValue = card.collectorValue || collectorTextFor(card);
  card.careerSummary = card.careerSummary || summaryFor(card);
  card.biography = card.biography || biographyFor(card);
  card.localized = card.localized || localizedFor(card);
  card.socialLinks = {...emptySocialLinks(), ...(card.socialLinks || {}), ...(VerifiedSocials[card.playerName] || {})};
  card.socialLinks = normalizeSocialLinks(card.socialLinks, card.sourceStatus || (VerifiedSocials[card.playerName] ? "Verified Seed Link" : "Pending Official Verification"));
  card.imageSourceStatus = card.imageSourceStatus || (card.imageUrl ? "official image seed / demo use" : card.sport === "baseball" && !card.mlbId ? "fallback generated card art; MLB ID pending verification" : "fallback generated card art");
  card.assetStatus = card.assetStatus || {
    playerImage:card.imageUrl ? "available" : "fallback",
    teamLogo:card.logoUrl ? "available" : "fallback",
    license:"classroom demo only; commercial use requires formal authorization"
  };
  card.officialSources = card.officialSources || officialSourcesFor(card);
  card.marketData = ensureMarketData(card);
  card.introAnimation = card.introAnimation || getIntroAnimation(card);
  card.rarityEffect = card.rarityEffect || rarityEffectFor(card);
  card.metadata = {...(card.metadata || {}), tokenURI:`ipfs://demo/dynamic-player-card/${card.tokenId}`};
  card.metadataVersions = card.metadataVersions || [{version:card.version || 1, at:card.lastUpdate || nowISO(), reason:"Initial metadata snapshot"}];
  card.sourceStatus = card.sourceStatus || (VerifiedSocials[card.playerName] ? "seed profile partly verified from official/league pages" : "demo; pending official verification; needs source verification");
  return card;
}

// StarterCards is initialized after the featured card seed list below.

function rarityByRank(rank){
  if(rank === 1) return "oneOfOne";
  if(rank <= 3) return "limited";
  if(rank <= 7) return "mythic";
  if(rank <= 14) return "legendary";
  if(rank <= 22) return "epic";
  if(rank <= 32) return "superRare";
  if(rank <= 42) return "rare";
  if(rank <= 48) return "uncommon";
  return "common";
}

function priceByRank(rank, sport){
  const base = sport === "basketball" ? .42 : sport === "baseball" ? .38 : .4;
  return Number((base + Math.max(0, 52 - rank) * .037).toFixed(2));
}

function statsByRank(sport, rank, position){
  const boost = Math.max(0, 54 - rank);
  if(sport === "soccer") return {goals:Math.round(5 + boost * .72), assists:Math.round(3 + boost * .36), appearances:Math.round(18 + boost * .18), shots:Math.round(30 + boost * 1.8), passPct:Number((78 + boost * .28).toFixed(1)), minutes:Math.round(1120 + boost * 34)};
  if(sport === "basketball") return {points:Number((15 + boost * .32).toFixed(1)), rebounds:Number((3.8 + boost * .14).toFixed(1)), assists:Number((3.2 + boost * .13).toFixed(1)), steals:Number((.7 + boost * .012).toFixed(1)), blocks:Number((.3 + boost * .012).toFixed(1)), fgPct:Number((43 + boost * .18).toFixed(1))};
  const pitcher = /Pitcher/i.test(position);
  if(pitcher) return {avg:0, homeRuns:0, rbi:0, ops:0, era:Number((3.7 - boost * .032).toFixed(2)), whip:Number((1.25 - boost * .006).toFixed(2)), strikeouts:Math.round(120 + boost * 3.5)};
  return {avg:Number((.245 + boost * .0017).toFixed(3)), homeRuns:Math.round(14 + boost * .63), rbi:Math.round(52 + boost * 1.25), ops:Number((.735 + boost * .0062).toFixed(3)), stolenBases:Math.round(4 + boost * .36), strikeouts:0};
}

function abilityFor(sport, position, rarity, rank){
  const tier = Rarity[rarity]?.weight || 1;
  const top = Math.round(98 - rank * .55 + tier * 1.3);
  const archetype = /Goalkeeper|Pitcher|Center Back|Defensive|Catcher/i.test(position) ? "defense" : /Winger|Guard|Shortstop|Outfield/i.test(position) ? "speed" : /Striker|Forward|DH|First Base/i.test(position) ? "attack" : "skill";
  const base = clamp(top, 72, 99);
  return {
    ovr:base,
    attack:clamp(base + (archetype === "attack" ? 4 : sport === "baseball" ? 2 : 0), 55, 99),
    defense:clamp(base + (archetype === "defense" ? 4 : -2), 50, 99),
    speed:clamp(base + (archetype === "speed" ? 4 : -1), 50, 99),
    skill:clamp(base + (archetype === "skill" ? 4 : 1), 55, 99),
    stamina:clamp(base - 1 + (rank < 15 ? 2 : 0), 55, 99),
    clutch:clamp(base + (rank < 10 ? 4 : 0), 55, 99),
    potential:clamp(base + (rank > 20 ? 3 : 1), 55, 99),
    marketHeat:clamp(94 - rank * .6 + tier * 2, 45, 99)
  };
}

function skillsFor(sport, position, rank){
  const pool = sport === "soccer"
    ? ["Vision Pass","Finisher","Golden Boot DNA","Captain Mentality","Speed Demon","Defensive Wall","Playmaker","Record Breaker"]
    : sport === "basketball"
      ? ["Deep Range","Triple-Double Engine","Clutch Shot","Two-Way Legend","Playmaker","Defensive Wall","Finisher","Captain Mentality"]
      : ["Power Hitter","Home Run Threat","Record Breaker","Clutch Shot","Speed Demon","Defensive Wall","Playmaker","Captain Mentality"];
  const offset = Math.abs(hashCode(position)) % pool.length;
  const count = rank < 10 ? 4 : rank < 28 ? 3 : 2;
  return Array.from({length:count}, (_, index) => pool[(offset + index) % pool.length]);
}

function badgesFor(sport, position, rank){
  const first = sport === "soccer" ? "Global XI" : sport === "basketball" ? "All-NBA Tier" : "All-Star Tier";
  const role = /Goalkeeper|Pitcher|Catcher|Defensive|Back|Center/i.test(position) ? "Defensive Wall" : /Guard|Midfielder|Shortstop/i.test(position) ? "Playmaker" : "Finisher";
  return [first, role, rank <= 10 ? "Market Heat" : "Scout Pick"];
}

function awardsFor(sport, rank, name){
  if(rank <= 3) return ["Global superstar tier", "MVP / Ballon d'Or conversation", "Signature collector edition"];
  if(rank <= 12) return ["League award contender", "All-star or elite team recognition", "Featured chase card"];
  if(sport === "baseball") return ["All-Star caliber profile", "Advanced-stat standout", "Postseason upside"];
  if(sport === "basketball") return ["All-NBA caliber profile", "Franchise cornerstone traits", "Playoff impact"];
  return ["International-level profile", "Club cornerstone traits", "Major competition upside"];
}

function recordsFor(sport, rank, name){
  const headline = rank <= 5 ? "Historic pace / generational profile" : rank <= 18 ? "Elite single-season and playoff indicators" : "Rising or established top-50 profile";
  return [headline, `${name} card record tracked by demo oracle history`, "Official record verification pending"];
}

function highlightsFor(card){
  return [
    `${card.playerName} is modeled as a top-tier ${card.position} in ${card.league}.`,
    `The card tracks ${Sports[card.sport]?.label || card.sport} performance signals, special-event badges and metadata versions.`,
    `Collector demand is weighted by rarity, market heat, skill tags and social influence.`
  ];
}

function summaryFor(card){
  return `${card.playerName} is positioned as a premium ${card.sport} collectible from ${card.team}, combining performance identity, market heat, rarity and dynamic metadata into one evolving player card.`;
}

function biographyFor(card){
  const sportLabel = Sports[card.sport]?.label || card.sport;
  return [
    `${card.playerName} enters this Dynamic NFT database as a ${nationalityText(card.nationality)} ${sportLabel} star associated with ${card.team} in ${card.league}. The profile is structured like an official player page: background fields, team context, performance identity, awards, records and source notes are kept together so the card can be used for presentation and future verification.`,
    `Early-career details such as birth date, birth place, height and weight are intentionally marked pending when they have not been verified from official league or club sources in this local build. The card still preserves the data slots so a production version can replace demo text with licensed, audited biography copy.`,
    `Professionally, this card emphasizes the player's role as ${card.position}. The front card highlights OVR, major skills and live market signals, while the detail modal keeps longer career story, awards, records, play style and collector value analysis.`,
    `As a collectible, ${card.playerName} is valuable because the card can evolve. Oracle events may upgrade stats, ability ratings, market heat, rarity and metadata history, turning a static player profile into a dynamic digital artwork with an auditable transaction trail.`
  ].join("\n\n");
}

function playStyleFor(card){
  const skills = (card.skills || []).join(", ");
  return `${card.playerName} is represented as a ${card.position} whose card identity centers on ${skills || "elite fundamentals"}. The ability model balances performance traits with collectible readability rather than claiming live scouting accuracy.`;
}

function collectorTextFor(card){
  return `Collectors may value this card for name recognition, ${Rarity[card.rarity]?.label || card.rarity} scarcity, ${card.abilityStats?.marketHeat || 70} market heat and its ability to record event-driven upgrades. Risk remains tied to licensing, live-data verification and market volatility.`;
}

function officialSourcesFor(card){
  const links = VerifiedSocials[card.playerName] || {};
  const leagueProfile = socialUrl(links.leagueProfile);
  const teamProfile = socialUrl(links.teamProfile);
  const instagram = socialUrl(links.instagram);
  const x = socialUrl(links.x);
  return [
    {label:"League / team profile", url:leagueProfile || teamProfile || card.metadata?.sourceUrl || leagueHub(card.sport), status:leagueProfile || teamProfile ? "Verified Seed Link" : "Pending Official Verification"},
    {label:"Social accounts", url:instagram || x || "", status:instagram || x ? "Verified Seed Link" : "Pending Official Verification"},
    {label:"Data source status", url:"", status:card.sourceStatus || "demo; needs source verification"}
  ];
}

function marketDataFor(card){
  const heat = card.abilityStats?.marketHeat || 70;
  const socialCount = Object.values(card.socialLinks || {}).filter((entry) => socialUrl(entry)).length;
  return {
    primary:true,
    listingType:card.owner ? "secondary" : "primary",
    listed:false,
    askingPrice:Number((card.price * (Rarity[card.rarity]?.multiplier || 1)).toFixed(2)),
    floorPrice:Number((card.price * .82).toFixed(2)),
    lastSale:Number((card.price * .96).toFixed(2)),
    volume:Number((card.price * (3 + heat / 11)).toFixed(2)),
    owner:card.owner || "issuer",
    seller:"",
    creatorRoyalty:5,
    gasFee:Number((.002 + heat / 100000).toFixed(4)),
    marketHeat:heat,
    socialInfluence:clamp(50 + socialCount * 9 + (card.abilityStats?.ovr || 75) / 4, 35, 99),
    collectorDemand:clamp(55 + (Rarity[card.rarity]?.weight || 1) * 7 + heat / 6, 40, 99),
    watchlisted:false,
    offers:[],
    priceHistory:[]
  };
}

function ensureMarketData(card){
  const defaults = marketDataFor(card);
  const existing = card.marketData || {};
  return {
    ...defaults,
    ...existing,
    owner:existing.owner || card.owner || defaults.owner,
    seller:existing.seller || "",
    listingType:existing.listingType || (card.owner && card.owner !== "issuer" ? "secondary" : "primary"),
    askingPrice:Number(existing.askingPrice || defaults.askingPrice || card.price || 0),
    creatorRoyalty:Number(existing.creatorRoyalty ?? defaults.creatorRoyalty),
    gasFee:Number(existing.gasFee ?? defaults.gasFee),
    offers:Array.isArray(existing.offers) ? existing.offers : [],
    priceHistory:Array.isArray(existing.priceHistory) ? existing.priceHistory : []
  };
}

function playerEraFor(card){
  const legends = new Set(["Cristiano Ronaldo","Neymar Jr.","Kevin Durant","LeBron James","Stephen Curry"]);
  const retired = new Set([""]);
  if(retired.has(card.playerName)) return "Retired";
  if(legends.has(card.playerName)) return "Legend";
  return "Active";
}

function legacyStatsFor(card){
  const ovr = card.abilityStats?.ovr || 75;
  const heat = card.abilityStats?.marketHeat || 60;
  const bonus = card.playerEra === "Legend" ? 10 : card.playerEra === "Retired" ? 8 : 0;
  return {
    legacyScore:clamp(Math.round(ovr * .72 + bonus), 1, 99),
    historicalImpact:clamp(Math.round(ovr * .64 + bonus), 1, 99),
    culturalInfluence:clamp(Math.round(heat * .66 + bonus), 1, 99),
    collectorDemand:clamp(Math.round((card.marketData?.collectorDemand || heat) * .7 + bonus), 1, 99)
  };
}

const StarterCards = buildStarterCards();

function sortCards(cards, sortBy){
  const list = cards.slice();
  const key = sortBy || "marketHeat";
  list.sort((a,b) => {
    if(key === "priceAsc") return ValueModel.estimate(a) - ValueModel.estimate(b);
    if(key === "priceDesc") return ValueModel.estimate(b) - ValueModel.estimate(a);
    if(key === "ovr") return (b.abilityStats?.ovr || 0) - (a.abilityStats?.ovr || 0);
    if(key === "recent") return new Date(b.lastUpdate) - new Date(a.lastUpdate);
    if(key === "rarity") return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
    return (b.marketData?.marketHeat || b.abilityStats?.marketHeat || 0) - (a.marketData?.marketHeat || a.abilityStats?.marketHeat || 0);
  });
  return list;
}

function topCards(type, limit = 10, sport = "all"){
  const source = Store.state?.cards || StarterCards;
  const filtered = sport === "all" ? source : source.filter((card) => card.sport === sport);
  return filtered.slice().sort((a,b) => {
    if(type === "value") return ValueModel.estimate(b) - ValueModel.estimate(a);
    if(type === "social") return (b.marketData?.socialInfluence || 0) - (a.marketData?.socialInfluence || 0);
    if(type === "recent") return new Date(b.lastUpdate) - new Date(a.lastUpdate);
    if(type === "watchlist") return Number(Store.state?.watchlist?.includes(b.id) || 0) - Number(Store.state?.watchlist?.includes(a.id) || 0);
    return (b.marketData?.marketHeat || b.abilityStats?.marketHeat || 0) - (a.marketData?.marketHeat || a.abilityStats?.marketHeat || 0);
  }).slice(0, limit);
}

function undervaluedCards(limit = 10){
  const source = Store.state?.cards || StarterCards;
  return source.slice().sort((a,b) => undervaluedScore(b) - undervaluedScore(a)).slice(0, limit);
}

function undervaluedScore(card){
  return (card.abilityStats?.ovr || 70) + (card.marketData?.marketHeat || 50) - ValueModel.estimate(card) * 8;
}

function achievementList(){
  const owned = Store.ownedCards();
  const bySport = (sport) => owned.filter((card) => card.sport === sport).length;
  const hasRarity = (rarity) => owned.some((card) => card.rarity === rarity);
  return [
    {name:"Football Collector", desc:"收藏 3 張足球卡", done:bySport("soccer") >= 3},
    {name:"Basketball Collector", desc:"收藏 3 張籃球卡", done:bySport("basketball") >= 3},
    {name:"Baseball Collector", desc:"收藏 3 張棒球卡", done:bySport("baseball") >= 3},
    {name:"MVP Hunter", desc:"收藏 MVP / Champion 徽章", done:owned.some((card) => (card.badges || []).includes("MVP / Champion"))},
    {name:"Legendary Vault", desc:"擁有 Legendary 以上卡", done:owned.some((card) => rarityOrder.indexOf(card.rarity) >= rarityOrder.indexOf("legendary"))},
    {name:"GOAT Collection", desc:"收藏 5 張 OVR 90+ 卡", done:owned.filter((card) => (card.abilityStats?.ovr || 0) >= 90).length >= 5},
    {name:"Asia Icon Set", desc:"收藏亞洲球星卡", done:owned.some((card) => card.continent === "Asia")},
    {name:"Rookie Scout", desc:"使用 Card Studio 建立自訂卡", done:owned.some((card) => card.id.startsWith("custom_card"))},
    {name:"Market Trader", desc:"完成一筆二級市場交易", done:Store.state.txLog.some((tx) => tx.type === "SALE")},
    {name:"Oracle Master", desc:"觸發 3 次 Oracle 更新", done:Store.state.txLog.filter((tx) => tx.type === "ORACLE").length >= 3},
    {name:"One of One Hunter", desc:"收藏 One of One", done:hasRarity("oneOfOne")}
  ];
}

Object.assign(window.NFTPlayerCard, {
  buildStarterCards,
  enrichCards,
  makeGeneratedCard,
  enrichCard,
  rarityByRank,
  priceByRank,
  statsByRank,
  abilityFor,
  skillsFor,
  badgesFor,
  awardsFor,
  recordsFor,
  highlightsFor,
  summaryFor,
  biographyFor,
  playStyleFor,
  collectorTextFor,
  officialSourcesFor,
  marketDataFor,
  ensureMarketData,
  playerEraFor,
  legacyStatsFor,
  StarterCards,
  sortCards,
  topCards,
  undervaluedCards,
  undervaluedScore,
  achievementList
});
