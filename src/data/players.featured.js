"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const FeaturedProfiles = {
  "Lionel Messi":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Lionel Messi anchors the collection as a World Cup champion and one of football's defining creative forwards. This card focuses on the Inter Miami chapter while preserving the Barcelona, Argentina and global-icon context that gives his dynamic NFT unusually strong long-term collector gravity.",
    biography:"Lionel Messi grew from Rosario's youth football culture into Barcelona's La Masia system, where his balance, left-foot control and passing imagination became the base of a career that reshaped modern attacking play. His professional story spans an era-defining Barcelona run, a later European chapter at Paris Saint-Germain, the 2022 FIFA World Cup triumph with Argentina, and a high-visibility Inter Miami period that expanded Major League Soccer's global audience.\n\nAs a dynamic card, Messi is valuable because every new assist, trophy moment or special edition can update a profile already tied to football history. Collectors are not only holding a star-player card; they are holding a living metadata object connected to a player whose achievements, global following and cultural reach make each version meaningful.",
    careerHighlights:["Barcelona academy graduate and club icon","Argentina captain and 2022 FIFA World Cup winner","Inter Miami franchise-defining global signing","Multiple league, continental and international title runs"],
    majorAwards:["8x Ballon d'Or","FIFA World Cup champion","Copa America champion","UEFA Champions League champion"],
    records:["All-time elite goals and assists profile","Historic Ballon d'Or record","Argentina senior national-team scoring leader"],
    playStyle:"Low-center-of-gravity dribbler, elite final-ball creator, left-foot finisher and tempo controller who can decide matches as a scorer or playmaker.",
    collectorValue:"GOAT-tier cultural value, enormous social reach, rare career completeness and cross-market relevance make this a grail card for long-term collectors and showcase decks.",
    officialSources:[
      {label:"Team Profile", url:"https://www.intermiamicf.com/players/lionel-messi/", status:"Verified Seed Link"},
      {label:"League Profile", url:"https://www.mlssoccer.com/players/lionel-messi/", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/leomessi/", status:"Verified Seed Link"}
    ]
  },
  "Kylian Mbappe":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Kylian Mbappe represents the present-and-next era of football collecting: a World Cup winner, France captain and Real Madrid headline forward with speed, scoring volume and global brand power.",
    biography:"Kylian Mbappe's path runs from the Paris suburb of Bondy through Monaco's breakout title run, a trophy-heavy Paris Saint-Germain period, and a new Real Madrid chapter designed for the brightest club stage in football. He became a World Cup winner as a teenager and has carried France as both a scorer and captain-level figure.\n\nThe card's appeal sits in its forward momentum. Mbappe is already historically decorated, but his Real Madrid and France years still hold major metadata upside: Champions League nights, Golden Boot races, international tournaments and milestone goals can all become versioned card moments.",
    careerHighlights:["Monaco breakout star and Ligue 1 champion","Paris Saint-Germain attacking centerpiece","France World Cup winner and national-team leader","Real Madrid Galactico-era headline card"],
    majorAwards:["FIFA World Cup champion","Multiple Ligue 1 titles","World Cup Golden Boot","French Player of the Year level recognition"],
    records:["Elite Champions League scoring pace","World Cup final hat-trick milestone","High-volume national-team scoring trajectory"],
    playStyle:"Explosive acceleration, direct left-channel attacks, clinical finishing and transition dominance.",
    collectorValue:"A premium active-era card with rare future upside: proven historic moments plus ongoing Real Madrid and France event potential.",
    officialSources:[
      {label:"Team Profile", url:"https://www.realmadrid.com/en-US/football/first-team/players/kylian-mbappe", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/k.mbappe/", status:"Verified Seed Link"},
      {label:"X / Twitter", url:"https://x.com/KMbappe", status:"Verified Seed Link"}
    ]
  },
  "Erling Haaland":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Erling Haaland is the power-striker chase card: a Norwegian scoring machine whose Manchester City production, physical profile and record pace make his card event-heavy by design.",
    biography:"Erling Haaland developed through Bryne and Molde before becoming a continental headline scorer at Salzburg and Borussia Dortmund. At Manchester City, his finishing volume translated into Premier League and Champions League pressure moments, turning almost every major scoring run into a collectible metadata event.\n\nThis card is built for goals. Hat tricks, Golden Boot races, knockout-stage finishes and record-breaking scoring seasons can all trigger upgrades, making Haaland one of the cleanest examples of how sports performance can drive dynamic NFT rarity and value.",
    careerHighlights:["Salzburg and Dortmund breakout scoring runs","Manchester City treble-era focal striker","Premier League single-season scoring benchmark","Norway global football icon"],
    majorAwards:["UEFA Champions League champion","Premier League champion","European Golden Shoe level scoring honors","PFA / FWA player honors"],
    records:["Premier League single-season goals record","Fastest scoring milestones across major competitions"],
    playStyle:"Vertical power runner, box-dominant finisher, elite off-ball mover and left-foot scoring specialist.",
    collectorValue:"High-frequency scoring events give the card strong Oracle utility, while his age profile supports long-term performance upside.",
    officialSources:[
      {label:"Team Profile", url:"https://www.mancity.com/players/erling-haaland", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/erling/", status:"Verified Seed Link"},
      {label:"X / Twitter", url:"https://x.com/ErlingHaaland", status:"Verified Seed Link"}
    ]
  },
  "LeBron James":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"LeBron James is the basketball legacy card: an Akron-born all-time scorer, champion across eras, and Lakers star whose longevity turns every season update into sports-history metadata.",
    biography:"LeBron James entered the NBA directly from Akron's St. Vincent-St. Mary and became one of the league's most durable franchise-shaping players. His career includes Cleveland, Miami and Los Angeles chapters, championships in multiple contexts, deep playoff runs, and the all-time regular-season scoring record.\n\nFor collectors, LeBron's card is about breadth: scoring, playmaking, longevity, leadership, media influence and historical status. Oracle events can update late-career milestones, playoff moments and special-edition status while the underlying card remains rooted in one of basketball's most complete resumes.",
    careerHighlights:["Cleveland Cavaliers hometown title centerpiece","Miami Heat championship era leader","Los Angeles Lakers champion and global face","NBA all-time scoring leader"],
    majorAwards:["4x NBA champion","4x NBA MVP","4x Finals MVP","NBA All-Star / All-NBA historic selections"],
    records:["NBA all-time regular-season points leader","Historic playoff scoring and minutes milestones"],
    playStyle:"Point-forward engine with elite rim pressure, passing control, transition power and late-game matchup command.",
    collectorValue:"A museum-tier basketball card combining historic floor, global social influence and rare multi-era relevance.",
    officialSources:[
      {label:"NBA Profile", url:"https://www.nba.com/player/2544/lebron-james", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/kingjames/", status:"Verified Seed Link"},
      {label:"X / Twitter", url:"https://x.com/KingJames", status:"Verified Seed Link"}
    ]
  },
  "Stephen Curry":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Stephen Curry is the Deep Range signature card: the Warriors guard whose shooting changed NBA spacing and whose highlight profile maps naturally to animated card upgrades.",
    biography:"Stephen Curry moved from Davidson star to Golden State Warriors franchise icon, building a career around deep shooting, off-ball gravity and creative handle work. His championship era with Golden State did more than produce trophies; it altered how teams value spacing, pace and three-point volume.\n\nThis card is especially visual. Deep threes, clutch shots, scoring bursts and playoff moments can trigger light and range effects, while Curry's cultural imprint gives the card lasting appeal beyond standard box-score value.",
    careerHighlights:["Davidson NCAA breakout into NBA superstar path","Golden State Warriors dynasty lead guard","Three-point shooting revolution symbol","Multiple championship runs"],
    majorAwards:["4x NBA champion","2x NBA MVP","NBA Finals MVP","NBA three-point record holder"],
    records:["NBA all-time three-pointers made leader","Historic unanimous MVP season"],
    playStyle:"Deep-range shooter, off-ball movement engine, tight-handle creator and quick-release clutch scorer.",
    collectorValue:"High social influence, clear visual identity and era-changing skill profile make this a cornerstone basketball NFT card.",
    officialSources:[
      {label:"NBA Profile", url:"https://www.nba.com/player/201939/stephen-curry", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/stephencurry30/", status:"Verified Seed Link"},
      {label:"X / Twitter", url:"https://x.com/StephenCurry30", status:"Verified Seed Link"}
    ]
  },
  "Nikola Jokic":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Nikola Jokic is the Triple-Double Engine card: a Serbian center whose passing vision, MVP resume and Denver championship run make him one of the most distinctive modern NBA collectibles.",
    biography:"Nikola Jokic emerged from Sombor, Serbia into the Denver Nuggets' system and transformed the center position with half-court passing, touch, rebounding and decision-making. His MVP seasons and 2023 championship established him as both a statistical outlier and a team-architecture player.\n\nAs a dynamic card, Jokic rewards all-around events. Triple-doubles, assist milestones, postseason runs and MVP updates can improve OVR, Clutch, Potential and Market Heat, giving the card more ways to evolve than a pure scoring profile.",
    careerHighlights:["Denver Nuggets franchise centerpiece","2023 NBA champion and Finals MVP","Multiple MVP seasons","Serbia international basketball icon"],
    majorAwards:["NBA champion","NBA Finals MVP","Multiple NBA MVP awards","All-NBA First Team level honors"],
    records:["Historic center triple-double pace","Nuggets franchise playoff milestones"],
    playStyle:"Point-center orchestrator with elite passing angles, soft touch, rebounding control and low-post patience.",
    collectorValue:"Unique archetype, MVP validation and multi-stat Oracle upgrade paths make Jokic a strategic collector card.",
    officialSources:[
      {label:"NBA Profile", url:"https://www.nba.com/player/203999/nikola-jokic", status:"Verified Seed Link"}
    ]
  },
  "Shohei Ohtani":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Shohei Ohtani is the two-way icon card: a Japan-born global baseball star whose hitting, pitching identity and Dodgers chapter make him the strongest cross-market baseball collectible in the prototype.",
    biography:"Shohei Ohtani built his early professional legend in Japan before moving to Major League Baseball and proving that elite hitting and elite pitching could coexist in the modern game. His Angels years established the two-way phenomenon; his Dodgers chapter added a larger championship-stage market, new milestone potential and massive international attention.\n\nThis card is designed for dynamic rarity. Home runs, stolen-base milestones, MVP awards, pitching returns and postseason achievements can all update separate metadata categories, making Ohtani the clearest baseball example of a card that evolves across multiple performance lanes.",
    careerHighlights:["NPB-to-MLB two-way star path","Los Angeles Angels MVP seasons","Los Angeles Dodgers global marquee era","Historic power-speed and pitching identity"],
    majorAwards:["Multiple MLB MVP awards","Silver Slugger level hitting honors","Japan national-team global tournament icon"],
    records:["Modern two-way milestones","Historic power-speed season markers","International baseball visibility benchmark"],
    playStyle:"Left-handed power hitter with speed, plate damage and rare pitcher/DH two-way identity.",
    collectorValue:"Global fan base, rare skill profile and multiple Oracle event categories make Ohtani a top-tier dynamic NFT anchor.",
    officialSources:[
      {label:"MLB Profile", url:"https://www.mlb.com/player/shohei-ohtani-660271", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/shoheiohtani/", status:"Verified Seed Link"}
    ]
  },
  "Aaron Judge":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Aaron Judge is the Yankees captain power card: an imposing right-field slugger with record home-run moments and one of MLB's clearest modern franchise identities.",
    biography:"Aaron Judge developed into the face of the New York Yankees through size, patience, right-field defense and elite home-run power. His 62-home-run American League record season gave collectors a simple historic anchor, while his captaincy connects the card to one of baseball's most visible brands.\n\nIn this system, Judge is built for power-event upgrades. Home runs, MVP pushes, captain milestones and postseason swings can drive Market Heat, rarity effects and transaction history, making him an obvious chase card for baseball collectors who value both performance and team legacy.",
    careerHighlights:["New York Yankees captain","American League home-run record season","Franchise face and premium power profile","MVP-level offensive production"],
    majorAwards:["AL MVP","Silver Slugger honors","Rookie of the Year level early-career recognition"],
    records:["62 home runs in an American League season","Yankees single-season power benchmark"],
    playStyle:"Towering power hitter with elite strike-zone judgment, pull-side damage and strong outfield presence.",
    collectorValue:"Yankees brand power plus historic home-run records give this card strong long-term display and trade value.",
    officialSources:[
      {label:"MLB Profile", url:"https://www.mlb.com/player/aaron-judge-592450", status:"Verified Seed Link"},
      {label:"Instagram", url:"https://www.instagram.com/thejudge44/", status:"Verified Seed Link"},
      {label:"X / Twitter", url:"https://x.com/TheJudge44", status:"Verified Seed Link"}
    ]
  },
  "Juan Soto":{
    sourceStatus:"Verified Seed Link / Demo Use",
    careerSummary:"Juan Soto is the plate-discipline premium card: a Dominican outfielder known for elite approach, postseason maturity and a high-value New York market chapter.",
    biography:"Juan Soto reached the majors as a teenager and quickly became one of baseball's most advanced hitters, pairing patience, on-base skill and opposite-field power with postseason composure. His early championship moment with Washington gave him historic credibility, while later star-market moves placed his card in high-attention collector environments.\n\nSoto's dynamic value comes from approach-based dominance. Walks, on-base streaks, postseason swings, MVP races and contract-era market heat can all influence valuation, making him a strong fit for collectors who prefer elite offensive skill over pure highlight volatility.",
    careerHighlights:["Teenage MLB breakout hitter","Washington championship contributor","High-profile New York market star","Elite on-base and power profile"],
    majorAwards:["World Series champion","Silver Slugger honors","All-Star level selections"],
    records:["Historic young-player postseason production","Elite walk and on-base benchmarks"],
    playStyle:"Disciplined left-handed hitter with strike-zone mastery, patience, power and calm late-count decision-making.",
    collectorValue:"Rare batting approach, early career achievements and major-market visibility give Soto strong mid- and long-term collector demand.",
    officialSources:[
      {label:"MLB Profile", url:"https://www.mlb.com/player/juan-soto-665742", status:"Verified Seed Link"}
    ]
  }
};

const FeaturedCards = [
  {
    id:"card_soccer_messi", tokenId:"DSP-2026-SC-010", sport:"soccer", playerName:"Lionel Messi",
    team:"Inter Miami CF", teamCode:"MIA", league:"MLS", position:"Forward / Midfielder", jerseyNumber:"10",
    nationality:"Argentina", continent:"South America", rarity:"limited", price:2.35, owner:null,
    serial:"SC-010/500", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://a.espncdn.com/i/headshots/soccer/players/full/45843.png",
    logoUrl:"https://a.espncdn.com/i/teamlogos/soccer/500/20232.png",
    teamColors:["#f7b5cd","#1f1f1f"], badges:["World Champion","8x Ballon d'Or","MLS Icon"],
    stats:{goals:10, assists:8, appearances:13, shots:44, passPct:85.6, minutes:1035},
    metadata:{sourceUrl:"https://www.intermiamicf.com/players/lionel-messi/", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_soccer_messi"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"Official profile anchored demo card created."}],
    licenseNote:"Uses remote profile-style imagery for classroom demonstration only."
  },
  {
    id:"card_soccer_mbappe", tokenId:"DSP-2026-SC-007", sport:"soccer", playerName:"Kylian Mbappe",
    team:"Real Madrid", teamCode:"RMA", league:"La Liga", position:"Forward", jerseyNumber:"10",
    nationality:"France", continent:"Europe", rarity:"legendary", price:1.95, owner:null,
    serial:"SC-007/700", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://a.espncdn.com/i/headshots/soccer/players/full/231388.png",
    logoUrl:"https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
    teamColors:["#ffffff","#d5b45f"], badges:["Golden Boot Watch","UCL Threat","France Captain"],
    stats:{goals:41, assists:3, appearances:41, shots:149, passPct:86.1, minutes:3419},
    metadata:{sourceUrl:"https://www.realmadrid.com/en-US/football/first-team/players/kylian-mbappe", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_soccer_mbappe"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"Real Madrid official profile snapshot normalized for demo."}],
    licenseNote:"Team and player assets remain owned by their respective rights holders."
  },
  {
    id:"card_soccer_haaland", tokenId:"DSP-2026-SC-009", sport:"soccer", playerName:"Erling Haaland",
    team:"Manchester City", teamCode:"MCI", league:"Premier League", position:"Striker", jerseyNumber:"9",
    nationality:"Norway", continent:"Europe", rarity:"legendary", price:1.88, owner:null,
    serial:"SC-009/700", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://a.espncdn.com/i/headshots/soccer/players/full/253989.png",
    logoUrl:"https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
    teamColors:["#6cabdd","#1c2c5b"], badges:["Power Striker","City 2034","Golden Boot DNA"],
    stats:{goals:29, assists:5, appearances:33, shots:116, passPct:78.4, minutes:2780},
    metadata:{sourceUrl:"https://www.mancity.com/players/erling-haaland", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_soccer_haaland"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"Manchester City official profile anchored demo card created."}],
    licenseNote:"Classroom concept card; no commercial use implied."
  },
  {
    id:"card_basket_lebron", tokenId:"DSP-2026-BK-023", sport:"basketball", playerName:"LeBron James",
    team:"Los Angeles Lakers", teamCode:"LAL", league:"NBA", position:"Forward", jerseyNumber:"23",
    nationality:"United States", continent:"North America", rarity:"limited", price:2.15, owner:null,
    serial:"BK-023/500", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
    logoUrl:"https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
    teamColors:["#552583","#fdb927"], badges:["23rd Season","All-Time Scorer","Playoff Mode"],
    stats:{points:24.4, rebounds:7.8, assists:8.2, steals:1.0, blocks:.6, fgPct:51.3},
    metadata:{sourceUrl:"https://www.nba.com/player/2544/lebron-james", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_basket_lebron"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"NBA official profile anchored demo card created."}],
    licenseNote:"NBA imagery and marks are referenced for non-commercial prototype demonstration."
  },
  {
    id:"card_basket_curry", tokenId:"DSP-2026-BK-030", sport:"basketball", playerName:"Stephen Curry",
    team:"Golden State Warriors", teamCode:"GSW", league:"NBA", position:"Guard", jerseyNumber:"30",
    nationality:"United States", continent:"North America", rarity:"legendary", price:1.72, owner:null,
    serial:"BK-030/700", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
    logoUrl:"https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
    teamColors:["#1d428a","#ffc72c"], badges:["3PT King","Clutch Range","Bay Area"],
    stats:{points:26.6, rebounds:4.1, assists:6.0, steals:1.1, blocks:.4, fgPct:45.2},
    metadata:{sourceUrl:"https://www.nba.com/player/201939/stephen-curry", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_basket_curry"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"NBA official profile anchored demo card created."}],
    licenseNote:"Demo card uses remote imagery and does not claim official partnership."
  },
  {
    id:"card_basket_jokic", tokenId:"DSP-2026-BK-015", sport:"basketball", playerName:"Nikola Jokic",
    team:"Denver Nuggets", teamCode:"DEN", league:"NBA", position:"Center", jerseyNumber:"15",
    nationality:"Serbia", continent:"Europe", rarity:"legendary", price:1.82, owner:null,
    serial:"BK-015/700", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
    logoUrl:"https://a.espncdn.com/i/teamlogos/nba/500/den.png",
    teamColors:["#0e2240","#fec524"], badges:["Triple-Double Engine","MVP Finalist","Point Center"],
    stats:{points:27.7, rebounds:12.9, assists:10.7, steals:1.1, blocks:.7, fgPct:56.9},
    metadata:{sourceUrl:"https://www.nba.com/player/203999/nikola-jokic", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_basket_jokic"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"NBA official profile anchored demo card created."}],
    licenseNote:"For classroom demonstration; stats are normalized demo snapshots."
  },
  {
    id:"card_base_ohtani", tokenId:"DSP-2026-BB-017", sport:"baseball", playerName:"Shohei Ohtani",
    team:"Los Angeles Dodgers", teamCode:"LAD", league:"MLB", position:"DH / RHP", jerseyNumber:"17",
    nationality:"Japan", continent:"Asia", rarity:"limited", price:2.40, owner:null, mlbId:"660271",
    serial:"BB-017/500", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/660271/headshot/67/current",
    logoUrl:"https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
    teamColors:["#005a9c","#ef3e42"], badges:["Two-Way Icon","NL MVP DNA","Tokyo Series"],
    stats:{avg:.310, homeRuns:54, rbi:130, ops:1.036, stolenBases:59, strikeouts:0},
    metadata:{sourceUrl:"https://www.mlb.com/player/shohei-ohtani-660271", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_base_ohtani"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"MLB official profile anchored demo card created."}],
    licenseNote:"MLB player and club assets referenced only for non-commercial classroom prototype."
  },
  {
    id:"card_base_judge", tokenId:"DSP-2026-BB-099", sport:"baseball", playerName:"Aaron Judge",
    team:"New York Yankees", teamCode:"NYY", league:"MLB", position:"Right Field", jerseyNumber:"99",
    nationality:"United States", continent:"North America", rarity:"legendary", price:1.78, owner:null, mlbId:"592450",
    serial:"BB-099/700", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/592450/headshot/67/current",
    logoUrl:"https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
    teamColors:["#132448","#c4ced4"], badges:["Captain","Power Record","All Rise"],
    stats:{avg:.331, homeRuns:53, rbi:114, ops:1.145, stolenBases:12, strikeouts:0},
    metadata:{sourceUrl:"https://www.mlb.com/player/aaron-judge-592450", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_base_judge"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"MLB official profile snapshot normalized for demo."}],
    licenseNote:"Remote profile image and logo are used as prototype references."
  },
  {
    id:"card_base_soto", tokenId:"DSP-2026-BB-022", sport:"baseball", playerName:"Juan Soto",
    team:"New York Mets", teamCode:"NYM", league:"MLB", position:"Right Field", jerseyNumber:"22",
    nationality:"Dominican Republic", continent:"North America", rarity:"epic", price:1.45, owner:null, mlbId:"665742",
    serial:"BB-022/900", status:"Active", version:1, lastUpdate:"2026-05-20T00:00:00+08:00",
    imageUrl:"https://img.mlbstatic.com/mlb-photos/image/upload/v1/people/665742/headshot/67/current",
    logoUrl:"https://a.espncdn.com/i/teamlogos/mlb/500/nym.png",
    teamColors:["#002d72","#ff5910"], badges:["Plate Vision","Mets Era","Power Patience"],
    stats:{avg:.288, homeRuns:41, rbi:109, ops:.989, stolenBases:7, strikeouts:0},
    metadata:{sourceUrl:"https://www.mlb.com/player/juan-soto-665742", dataSource:SOURCE_NOTE, animationUrl:"dsp-player-card-v3.html#card_base_soto"},
    history:[{at:"2026-05-20T00:00:00+08:00", type:"SEED", note:"MLB official profile anchored demo card created."}],
    licenseNote:"Prototype reference card; not an official or commercial NFT."
  }
];

Object.assign(window.NFTPlayerCard, {
  FeaturedProfiles,
  FeaturedCards
});
