const wHeight = $(window).height();
const wWidth = $(window).width();
const player = {locX: null, locY: null, xVector: 0, yVector: 0, score: 0};
let orbs = [];
let players = [];

let canvas = document.querySelector("#the-canvas");

const context = canvas.getContext("2d");
canvas.width = wWidth;
canvas.height = wHeight;

$(window).on("resize", (e) => {
  canvas.width = e.target.innerWidth;
  canvas.height = e.target.innerHeight;
})

$(window).on("load", () => {
  $("#loginModal").modal("show");
});

$(".name-form").on("submit", (e) => {
  e.preventDefault();

  player.name = $("#name-input").val();
  console.log(player);
  $("#loginModal").modal("hide");
  $("#spawnModal").modal("show");
  $(".player-name").html(player.name);
});


$(".start-game").on("click", () => {
  $(".modal").modal("hide");
  $(".hiddenOnStart").removeAttr("hidden");
  init();
})
