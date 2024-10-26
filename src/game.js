'use strict';

class JumpPlayer {
    constructor() {
        this.playAreaOffset = vec2(-50, 0);
        this.barrierXLeft = -290;
        this.barrierXRight = 190;

        this.size = vec2(16, 16).scale(2);

        this.frames = [
            Sprite.Jump.JumpPlayer0,
            Sprite.Jump.JumpPlayer2,
            Sprite.Jump.JumpPlayer3,
            Sprite.Jump.JumpPlayer4,
        ];

        this.currFrame = 0;
        this.tickCounter = 0;
    
        this.jumpFrameTime = 11;
        this.jumpFadeColor = new Color(0.855, 0.102, 0.004);
        this.jumpFlashColor = new Color(0.831, 0.604, 0.027);
        this.jumpStartFadeOffset = 33;
        this.jumpFadeSpeed = 22;
        this.jumpFlashOffset = 26;
        this.jumpFlashInterval = 4;

        this.heldTimer = 0;
        this.overlayColor = new Color(0, 0, 0, 0);
        this.unwindSpeed = 1;
        this.unwind = true;

        this.pos = vec2(this.playAreaOffset, 250);
        this.velocity = vec2(0, -1);

        this.gravityStrength = -0.20;
        this.heldVelocityMultiplier = 0.20;
        this.heldMinVelocityApplied = 10;

        this.xVelocityMax = 5;
        this.xArrowVelStrength = 0.10;
        this.yNegVelocityMax = 4;
        this.slideVelocityDecay = 0.992;

        this.isGrounded = false;
        this.hasTouchedGround = false;

        this.useSparkle0 = true;
        this.sparkleTileTime = 10;

        this.jellyPower = {
            EffectActive: false,
            EffectTime: 600,
            TimeRemaining: 0
        }

        this.starfishPower = {
            EffectActive: false,
            EffectTime: 600,
            TimeRemaining: 0
        }

        this.gameTickResetAfter = 120;
        this.gameTick = 0;
    }

    activateJelly() {
        this.jellyPower.EffectActive = true;
        this.jellyPower.TimeRemaining = this.jellyPower.EffectTime;
        this.hasTouchedGround = true;
    }

    activateStarfish() {
        this.starfishPower.EffectActive = true;
        this.starfishPower.TimeRemaining = this.starfishPower.EffectTime;
    }

    updatePhysics() {
        this.gameTick = (this.gameTick + 1) % this.gameTickResetAfter;

        // Update Gravity
        this.velocity = this.velocity.add(vec2(0, this.gravityStrength));
        if (this.velocity.y < 0) {
            this.velocity.set(
                this.velocity.x,
                clamp(this.velocity.y, -this.yNegVelocityMax)
            );
        }
        
        // Adjust Player-Input Velocity
        var powerJump = this.jellyPower.EffectActive && this.hasTouchedGround;
        if (keyWasReleased("Space") && (this.isGrounded || powerJump)) {
            if (!this.isGrounded) {
                this.hasTouchedGround = false;
            }

            this.velocity = vec2(
                this.velocity.x,
                clamp(
                    this.heldTimer,
                    this.heldMinVelocityApplied,
                    this.jumpStartFadeOffset + this.jumpFlashOffset
                ) * this.heldVelocityMultiplier
            );
            Audio.Effect.JumpJump.play();
        }

        if (this.isGrounded && this.velocity.x != 0) {
            this.velocity = vec2(this.velocity.x * this.slideVelocityDecay, this.velocity.y);
        }

        if (keyIsDown("ArrowLeft") && !this.isGrounded) {
            this.velocity = this.velocity.add(vec2(-this.xArrowVelStrength, 0));
        }
        
        if (keyIsDown("ArrowRight") && !this.isGrounded) {
            this.velocity = this.velocity.add(vec2(this.xArrowVelStrength, 0));
        }

        this.velocity = vec2(
            clamp(this.velocity.x, -this.xVelocityMax, this.xVelocityMax),
            this.velocity.y
        );

        this.pos = this.pos.add(this.velocity)

        if (this.pos.x < this.barrierXLeft) {
            this.pos.set(this.barrierXRight, this.pos.y);
        }
        else if (this.pos.x > this.barrierXRight) {
            this.pos.set(this.barrierXLeft, this.pos.y);
        }

        var powerUps = [this.jellyPower, this.starfishPower]
        powerUps.forEach((element) => {
            if (element.EffectActive) {
                element.TimeRemaining -= 1;
                if (element.TimeRemaining <= 0) {
                    element.EffectActive = false;
                }
            }
        });

        this.isGrounded = false;
    }

    updateAnim() {
        this.tickCounter = (this.tickCounter + 1) % 120;

        if (keyIsDown("Space")) {
            this.heldTimer += 1;
            this.unwind = false;
        }

        if (keyWasReleased("Space")) {
            this.heldTimer = 0;
            this.unwind = true;
        }

        if (this.unwind && this.currFrame > 0 && this.tickCounter % this.unwindSpeed == 0) {
            this.currFrame -= 1;
        }

        if (!this.unwind) {
            this.currFrame = 0;
        }
        if (this.heldTimer > 0){
            if (this.heldTimer < this.jumpFrameTime + 1) {
                this.currFrame = 1;
            }
            else if (this.heldTimer < (this.jumpFrameTime * 2) - 1) {
                this.currFrame = 2;
            }
            else {
                this.currFrame = this.frames.length - 1;
            }
        }

        this.overlayColor.set(
            this.jumpFadeColor.r,
            this.jumpFadeColor.g,
            this.jumpFadeColor.b,
            clamp((this.heldTimer - this.jumpStartFadeOffset), 0, this.jumpFadeSpeed) / this.jumpFadeSpeed
        );

        var firstFlashOffset = this.jumpStartFadeOffset + this.jumpFlashOffset;
        if (this.heldTimer >= firstFlashOffset) {
            if ((this.heldTimer - firstFlashOffset) % (this.jumpFlashInterval * 2) < this.jumpFlashInterval) {
                this.overlayColor = this.jumpFlashColor.copy();
            }
        }
        
        if (this.gameTick % this.sparkleTileTime == 0) {
            this.useSparkle0 = !this.useSparkle0;
        }
    }

    update() {
        this.updatePhysics();
        this.updateAnim();
    }

    render() {
        drawTile(
            this.pos,
            this.size,
            this.frames[this.currFrame]
        )
        drawTile(
            this.pos,
            this.size,
            this.frames[this.currFrame],
            this.overlayColor
        )
        if (this.jellyPower.EffectActive || this.starfishPower.EffectActive) {
            var sparkle = Sprite.Jump.Sparkle0;
            if (!this.useSparkle0) {
                sparkle = Sprite.Jump.Sparkle1;
            }

            drawTile(
                this.pos,
                this.size,
                sparkle
            )
        }
    }
}

class JumpBackdrop {
    constructor() {
        this.playAreaOffset = vec2(-50, 0);

        this.levelColors = [new Color(0.188, 0.188, 0.4), new Color(0, 0.294, 0.294)]
        this.gameBackdrop = new UIBlock(
            "GameBackdrop",
            this.playAreaOffset,
            vec2(480, 480),
            this.levelColors[0]
        );

        this.borderRight = new UIBlock(
            "GameBorderRight",
            vec2(200, 0),
            vec2(20, 480),
            new Color(0, 0, 0)
        )
        this.borderLeft = new UIBlock(
            "GameBorderLeft",
            vec2(-360, 0),
            vec2(140, 480),
            new Color(0, 0, 0)
        )

        this.snowColors = [new Color(0.518, 0.298, 0.659), new Color(0.255, 0.573, 0.227)];
        this.snowImageSize = 240;
        this.snowImageScale = 2;
        this.snowFallSpeed = 6
        this.snowOffset = 0;
        this.snowTiltTimer = 0;
        this.snowTiltRange = 6;
        this.snowTiltSpeed = 0.015;
        this.snowTiltReach = 0.5;
        this.snowGoingOut = true;
        this.snowPos = [
            vec2(0, (-this.snowImageSize * this.snowImageScale)),
            vec2(0, 0),
            vec2(0, (this.snowImageSize * this.snowImageScale)),
            vec2(0, ((this.snowImageSize * 2) * this.snowImageScale))
        ];
    }

    updateSnow() {
        this.snowOffset = (this.snowOffset + 1) % (this.snowImageSize * this.snowImageScale * this.snowFallSpeed);

        if (this.goingOut) {
            this.snowTiltTimer += 3 * this.snowTiltSpeed;

            if (this.snowTiltTimer >= this.snowTiltRange) {
                this.goingOut = false;
            }
        }
        else {
            this.snowTiltTimer -= 4 * this.snowTiltSpeed;
            
            if (this.snowTiltTimer <= 0) {
                this.goingOut = true;
            }
        }
    }

    drawSnow() {
        var actualSize = this.snowImageSize * this.snowImageScale;
        var camAdjust = Math.floor(cameraPos.y / actualSize) * (actualSize); 
        
        this.snowPos.forEach(element => {
            drawTile(
                this.playAreaOffset
                    .add(element)
                    .subtract(vec2(0, Math.floor(this.snowOffset / this.snowFallSpeed)))
                    .add(vec2(0, camAdjust))
                    .subtract(vec2(this.snowTiltTimer * this.snowTiltReach, 0)),
                vec2(this.snowImageSize).scale(this.snowImageScale),
                Sprite.Common.Snow,
                this.snowColors[0]
            )
        });
    }

    update() {
        this.updateSnow();
    }

    renderBack() {
        this.gameBackdrop.render();
        this.drawSnow();
    }

    renderFront() {
        this.borderRight.render();
        this.borderLeft.render();
    }
}

class HitboxObject {
    constructor(cBoxX, cBoxY) {
        this.cBoxX = cBoxX;
        this.cBoxY = cBoxY;
    }

    isTouching(ogPosition, player) {
        throw new Error("Solid.isTouching is abstract!");
    }
}

class JumpPlatform extends HitboxObject{
    constructor(start, length, tile, tileSize=8, tileScale=2) {
        super(tileSize * tileScale * length, tileSize * tileScale);
        
        this.tileSize = tileSize;
        this.tileScale = tileScale;

        this.start = start;
        this.length = length;
        this.tile = tile;
    }

    playerEffect(player) {
        player.hasTouchedGround = true;
    }

    isTouching(ogPosition, player) {
        if (ogPosition.y - player.pos.y < 0) {
            return false;
        }

        if (player.pos.x < this.start.x || player.pos.x > this.start.x + this.cBoxX) {
            return false;
        }

        var centerCompensation = (player.size.y / 2) + (this.cBoxY * 0.5);

        if (player.pos.y - centerCompensation <= this.start.y && this.start.y <= ogPosition.y) {
            return true;
        }

        return false;
    }

    update() {

    }

    render() {
        for (let i = 0; i < this.length; i++) {
            drawTile(
                this.start.add(vec2(this.tileSize * i * this.tileScale, 0)),
                vec2(this.tileSize).scale(this.tileScale),
                this.tile
            )
        }
    }
}

class NormalFloor extends JumpPlatform {
    constructor(start, length) {
        super(start, length, Sprite.Jump.NormalFloor)
    }

    playerEffect(player) {
        super.playerEffect(player);

        var centerCompensation = (player.size.y / 2) + (this.cBoxY * 0.5);

        player.pos.set(player.pos.x, this.start.y + centerCompensation);
        player.velocity = vec2(0, 0);
        player.isGrounded = true;
    }
}

class SlipFloor extends JumpPlatform {
    constructor(start, length) {
        super(start, length, Sprite.Jump.SlipFloor)
    }

    playerEffect(player) {
        super.playerEffect(player);
        
        var centerCompensation = (player.size.y / 2) + (this.cBoxY * 0.5);

        player.pos.set(player.pos.x, this.start.y + centerCompensation);
        player.velocity = vec2(player.velocity.x, 0);
        player.isGrounded = true;
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

        this.solidObjs = [
            new SlipFloor(vec2(-300, -150), 32, Sprite.Jump.NormalFloor)
        ]

        this.playAreaOffset = vec2(-50, 0);
        this.textColor = new Color(1, 1, 1);

        this.player = new JumpPlayer();
        this.backdrop = new JumpBackdrop();

        this.score = 0;
        this.highScore = 0;

        this.lives = 3;

        this.stage = 1;
        this.timer = 0;

        this.cameraTargetY = -100;
        this.posClampSpeed = 0.05;
        this.negClampSpeed = 1;
    }

    drawTime() {
        var minute = Math.floor(this.timer / 60);
        var second = Math.floor((this.timer % 60));
        var millisecond = Math.floor((this.timer * 100) % 100);
        GameClass.Font.Pixel.drawTextScreen(
            `${minute}:${String(second).padStart(2,'0')}:${String(millisecond).padStart(2,'0')}`,
            vec2(707, 250),
            2,
            new Color(1, 1, 1)
        );
    }

    drawLives() {
        for (let i = 0; i < this.lives - 1; i++) {
            drawTile(
                cameraPos
                    .add(vec2(270, 37))
                    .add(vec2(16 * i, 0)),
                vec2(8, 8).scale(1.75),
                Sprite.Common.LivesIcon
            )
        }
    }

    update() {
        this.timer += timeDelta;
        this.backdrop.update();

        var playerPosBefore = this.player.pos;
        this.player.update();

        this.solidObjs.forEach(element => {
            element.update();
            
            if (element.isTouching(playerPosBefore, this.player)) {
                element.playerEffect(this.player);
            }
        });

        // Camera Clamping
        var targetLoc = cameraPos.add(this.playAreaOffset).add(vec2(0, this.cameraTargetY));
        var distance = this.player.pos.subtract(targetLoc).y;

        if (distance > 0) {
            cameraPos = cameraPos.add(vec2(0, distance * this.posClampSpeed));
        }
        else {
            cameraPos = cameraPos.add(vec2(0, distance * this.negClampSpeed))
        }
    }

    render() {
        this.backdrop.renderBack();

        this.solidObjs.forEach(element => {
            element.render();
        });

        this.player.render();
        this.backdrop.renderFront();
        
        this.drawTime();
        this.drawLives();
        GameClass.Font.Pixel.drawTextScreen("HI SCORE", vec2(715, 45), 2, this.textColor);
        GameClass.Font.Pixel.drawTextScreen(this.highScore, vec2(707, 65), 2, this.textColor);
        GameClass.Font.Pixel.drawTextScreen("SCORE", vec2(707, 97), 2, this.textColor);
        GameClass.Font.Pixel.drawTextScreen(this.score, vec2(707, 117), 2, this.textColor);
        GameClass.Font.Pixel.drawTextScreen(`STAGE ${this.stage}`, vec2(707, 162), 2, this.textColor);

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

        this.paused = false;
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

    update() {
        if (!this.paused) {
            this.getActiveGame().update();
        }
    }

    render() {
        this.getActiveGame().render();
        
        if (this.paused) {
            this.getActiveMenu().render();
        }
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

    GameClass.Orch.update();
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