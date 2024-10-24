'use strict';

class JumpPlayer {
    constructor() {
        this.pos = vec2(0, 0);
        this.accel = vec2(0, 0);

        this.size = vec2(16, 16).scale(2);

        this.frames = [
            Sprite.Jump.JumpPlayer0,
            Sprite.Jump.JumpPlayer1,
            Sprite.Jump.JumpPlayer2,
            Sprite.Jump.JumpPlayer3
        ];
        this.currFrame = this.frames[0]
    }

    update() {

    }

    render() {
        drawTile(
            this.pos,
            this.size,
            this.currFrame
        )
    }


}

class Game {
    constructor() { }

    update() {
        throw new Error("Game.update is abstract!");
    }

    render() {
        throw new Error("Game.render is abstract!");
    }
}

class JumpGame extends Game {
    constructor() {
        super();

        this.player = new JumpPlayer();
    }

    update() {
        
    }

    render() {
        this.player.render();
        GameClass.Font.Pixel.drawTextScreen("JUMP GAME", vec2(765, 125), 2, new Color(1, 1, 1));
    }
}

class BallGame extends Game {
    constructor() {
        super();

    }

    update() {

    }

    render() {
        GameClass.Font.Pixel.drawTextScreen("BALL GAME", vec2(765, 125), 2, new Color(1, 1, 1));
    }
}

class RacerGame extends Game {
    constructor() {
        super();

    }

    update() {

    }

    render() {
        GameClass.Font.Pixel.drawTextScreen("RACER GAME", vec2(765, 125), 2, new Color(1, 1, 1));
    }
}

class BeatzGame extends Game {
    constructor() {
        super();

    }

    update() {

    }

    render() {
        GameClass.Font.Pixel.drawTextScreen("BEATZ GAME", vec2(765, 125), 2, new Color(1, 1, 1));
    }
}


class GamePair {
    constructor(menu, game) {
        this.Menu = menu;
        this.Game = game;
    }
}

class Orchestrator {
    constructor(gamePairList, startPos=0) {
        this.gamePairList = gamePairList;
        this.activePair = startPos;

        this.paused = true;
    }

    isPaused() {
        return this.paused;
    }

    togglePause() {
        if (this.paused) {
            Audio.Effect.Unpause.play();
        }
        else {
            Audio.Effect.Pause.play();
        }

        this.paused = !this.paused;
    }

    getActiveMenu() {
        return this.gamePairList[this.activePair].Menu
    }

    getActiveGame() {
        return this.gamePairList[this.activePair].Game
    }

    goNextGame() {
        this.activePair = (this.activePair + 1) % this.gamePairList.length;
        Audio.Effect.Scroll.play();
    }

    goPreviousGame() {
        this.activePair = (this.activePair + this.gamePairList.length - 1) % this.gamePairList.length;
        Audio.Effect.Scroll.play();
    }

    render() {
        
        if (this.paused) {
            this.getActiveGame().render();
            this.getActiveMenu().render();
        }
        else {
            this.getActiveGame().update();
            this.getActiveGame().render();
        };
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game

    // Game/Backdrop Setup
    setCanvasFixedSize(vec2(GameConst.Screen.Width, GameConst.Screen.Height));
    setCameraScale(1);
    
    mainCanvas.style.background = rgb(0, 0, 0);
    document.body.classList.add("stripes");
    document.body.style = '';

    // Initialize Assets
    var gameFontSprite = new Image();
    gameFontSprite.src = `${GameConst.Directory.Font}/game.png`;
    GameClass.Font.Pixel = new FontImage(gameFontSprite, vec2(10, 10), vec2(-2, 0), mainCanvas.getContext("2d"));

    // Initialize Games
    var jumpMenu = new JumpMenu();
    var jumpGame = new JumpGame();

    var ballGame = new BallGame();
    var ballMenu = new BallMenu();

    var racerMenu = new RacerMenu();
    var racerGame = new RacerGame();
    
    var beatzMenu = new BeatzMenu();
    var beatzGame = new BeatzGame();

    var gamePairs = [
        new GamePair(jumpMenu, jumpGame),
        new GamePair(ballMenu, ballGame),
        new GamePair(racerMenu, racerGame),
        new GamePair(beatzMenu, beatzGame)
    ];

    GameClass.Orch = new Orchestrator(gamePairs);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state

    // Handle Pause Menu Logic
    if (GameClass.Orch.isPaused()) {
        if (keyWasReleased("ArrowLeft")) {
            GameClass.Orch.goPreviousGame();
        }
    
        if (keyWasReleased("ArrowRight")) {
            GameClass.Orch.goNextGame();
        }

        if (keyWasReleased("Enter")) {
            GameClass.Orch.togglePause();
        }

        return;
    }


    // Handle Game Logic
    if (keyWasReleased("Enter")) {
        GameClass.Orch.togglePause();
    }


}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
    GameClass.Orch.render();
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, Sprite.Path);