"use strict";

window.NFTPlayerCard = window.NFTPlayerCard || {};

const TopRosters = {
  soccer: TopSoccerPlayers,
  basketball: TopBasketballPlayers,
  baseball: TopBaseballPlayers
};

Object.assign(window.NFTPlayerCard, {
  TopRosters
});
