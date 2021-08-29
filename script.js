// Find the Invisible Seagull
let game = {
  moiSpeed: 0
};
let sfx = {};

// Main functions
function preload() {
  this.load.image("seagull", "seagull.png");
  this.load.audio("moi", "moi.mp3");
}
function create() {
  // Seagull sprite
  game.seagull = this.add.sprite(600, 500, "seagull").setScale(0.2).setInteractive();
  game.seagull.visible = false;
  game.seagull.moiSpeed = Phaser.Math.Distance.Between(this.input.x, this.input.y, game.seagull.x, game.seagull.y) / 3;
  game.seagull.counter = 0;

  // Sounds
  sfx.moi = this.sound.add("moi");

  // Win
  game.seagull.on("pointerdown", () => {
    sfx.moi.play();
    game.seagull.visible = true;
  });
}
function update() {
  game.seagull.moiSpeed = Phaser.Math.Distance.Between(this.input.x, this.input.y, game.seagull.x, game.seagull.y) / 3;
  game.seagull.counter++;
  if (game.seagull.counter >= game.seagull.moiSpeed) {
    sfx.moi.play();
    game.seagull.counter = 0;
  }
}

// Phaser config
const config = {
  // Type
  type: Phaser.AUTO,

  // Scaling
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.RESIZE
  },

  // Rendering options
  render: {
    pixelArt: true
  },

  // Color of sky
  backgroundColor: 0xffffff,

  // Physics
  physics: {
    // Default
    default: "arcade",

    // Arcade
    arcade: {
      // Gravity
      gravity: {
        y: 1500
      },

      // Options
      enableBody: true,
      debug: true
    }
  },

  // Scenes
  scene: {
    preload,
    create,
    update
  }
};

// Phaser game
const phaserGame = new Phaser.Game(config);
