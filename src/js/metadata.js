"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const Metadata = {
  forCard(card){
    const sport = Sports[card.sport] || Sports.soccer;
    const valuation = ValueModel.breakdown(card);
    const intro = card.introAnimation || getIntroAnimation(card);
    const rarityEffect = card.rarityEffect || rarityEffectFor(card);
    const attrs = [
      ["basic","sport", sport.label],
      ["basic","player_name", card.playerName],
      ["basic","team", card.team],
      ["basic","league", card.league],
      ["basic","position", card.position],
      ["basic","jersey_number", card.jerseyNumber],
      ["basic","nationality", card.nationality],
      ["rarity","rarity", Rarity[card.rarity]?.label || card.rarity],
      ["rarity","rarity_drop_rate", Rarity[card.rarity]?.drop || "-"],
      ["rarity","rarity_market", Rarity[card.rarity]?.market || "-"],
      ["history","status", card.status],
      ["history","player_era", card.playerEra || "Active"],
      ["history","version", `v${card.version}`],
      ["market","estimated_value_eth", money(valuation.estimatedValue)]
    ].map(([category, trait_type, value]) => ({category, trait_type, value}));
    Object.entries(card.stats || {}).forEach(([key, value]) => attrs.push({category:"stats", trait_type:StatLabels[key] || key, value:formatStat(key, value)}));
    Object.entries(card.abilityStats || {}).forEach(([key, value]) => attrs.push({category:"abilityStats", trait_type:key, value}));
    (card.skills || []).forEach((skill) => attrs.push({category:"skills", trait_type:"skill", value:skill}));
    (card.badges || []).forEach((badge) => attrs.push({category:"history", trait_type:"badge", value:badge}));
    Object.entries(card.legacyStats || {}).forEach(([key, value]) => attrs.push({category:"legacy", trait_type:key, value}));
    Object.entries(card.socialLinks || {}).filter(([, value]) => socialUrl(value)).forEach(([key, value]) => attrs.push({category:"social", trait_type:key, value:socialUrl(value)}));
    return {
      token_id:card.tokenId,
      name:`${card.playerName} Dynamic Player Card`,
      description:`A classroom Dynamic NFT prototype card for ${card.playerName}. Manual oracle events update stats, rarity, badges and card metadata.`,
      image:card.imageUrl,
      animation_url:card.metadata?.animationUrl || `dsp-player-card-v3.html#${card.id}`,
      external_url:card.metadata?.sourceUrl || "",
      tokenURI:card.metadata?.tokenURI || `ipfs://demo/dynamic-player-card/${card.tokenId}`,
      sport:sport.label,
      player_name:card.playerName,
      team:card.team,
      league:card.league,
      owner:card.owner || "unminted",
      nationality:card.nationality,
      rarity:Rarity[card.rarity]?.label || card.rarity,
      playerEra:card.playerEra || "Active",
      era:card.era || {},
      legacyStats:card.legacyStats || {},
      season:"2025-26 / demo snapshot",
      attributes:attrs,
      skills:card.skills || [],
      abilityStats:card.abilityStats || {},
      socialLinks:card.socialLinks || emptySocialLinks(),
      marketData:card.marketData || {},
      image_source_status:card.imageSourceStatus || (card.imageUrl ? "official image seed / demo use" : "fallback generated card art"),
      mlb_id:card.mlbId || "pending verification",
      asset_status:card.assetStatus || {
        playerImage:card.imageUrl ? "available" : "fallback",
        teamLogo:card.logoUrl ? "available" : "fallback",
        license:"classroom demo only; commercial use requires formal authorization"
      },
      last_update:card.lastUpdate,
      data_source:card.metadata?.dataSource || SOURCE_NOTE,
      transaction_history:card.history || [],
      metadata_versions:card.metadataVersions || [],
      source_status:card.sourceStatus || "demo; pending official verification",
      intro_animation:intro,
      rarity_effect:rarityEffect,
      visual_motifs:intro.motifs || [],
      animation_enabled_by_default:Store.state?.animationEnabled !== false,
      replayable_intro:true,
      player_signature_theme:intro.theme || rarityEffect.shader,
      license_note:card.licenseNote
    };
  }
};

Object.assign(window.NFTPlayerCard, {
  Metadata
});
