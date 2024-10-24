const GameConst = {
    Screen: {
        Width:  854,
        Height: 480
    },

    Menu: {
        TabBarWidth: 70
    },

    Directory: {
        AudioEffect: "../assets/audio",
        Font:        "../assets/fonts",
        Sprite:      "../assets/sprites"
    },

    MenuLayer: {
        Highest: 9,
        High:    8,
        Low:     7,
        Lowest:  6
    }
}

const Sprite = {
    Path: [
        `${GameConst.Directory.Sprite}/menu.png`,
        `${GameConst.Directory.Sprite}/controls.png`,
        `${GameConst.Directory.Sprite}/jump.png`
    ],
    Menu: {
        JumpMenuImage:   new TileInfo(vec2(0, 0), vec2(420, 256), 0),
        BallMenuImage:   new TileInfo(vec2(0, 256), vec2(420, 256), 0),
        RacerMenuImage:  new TileInfo(vec2(420, 0), vec2(420, 256), 0),
        BeatzMenuImage:  new TileInfo(vec2(420, 256), vec2(420, 256), 0),
    
        ControlFrame:    new TileInfo(vec2(0, 0), vec2(36, 72), 1),
        ArrowIcon:       new TileInfo(vec2(36, 0), vec2(24, 24), 1),
        ShiftKey:        new TileInfo(vec2(36, 24), vec2(25, 25), 1),
        EnterKey:        new TileInfo(vec2(36, 49), vec2(25, 25), 1),
        WASDKeys:        new TileInfo(vec2(61, 50), vec2(25, 25), 1),
        ArrowKeys:       new TileInfo(vec2(61, 0), vec2(25, 25), 1),
        SpaceKey:        new TileInfo(vec2(61, 25), vec2(25, 25), 1),
    },

    Jump: {
        Crab:             new TileInfo(vec2(0, 0), vec2(16, 16), 2),
        Starfish:         new TileInfo(vec2(16, 0), vec2(16, 16), 2),
        Jellyfish:        new TileInfo(vec2(32, 0), vec2(16, 16), 2),
        Manbow:           new TileInfo(vec2(48, 0), vec2(16, 16), 2),
        Zapfish:          new TileInfo(vec2(0, 16), vec2(16, 16), 2),
        SmallZapfish:     new TileInfo(vec2(16, 16), vec2(8, 8), 2),
        RedFish:          new TileInfo(vec2(24, 16), vec2(16, 16), 2),
        Scallop:          new TileInfo(vec2(40, 16), vec2(16, 16), 2),
        LivesIcon:        new TileInfo(vec2(56, 32), vec2(8, 8), 0),

        MoveFloor:        new TileInfo(vec2(56, 16), vec2(8, 8), 2),
        NeedleFloor:      new TileInfo(vec2(16, 24), vec2(8, 8), 2),
        NeedleFill:       new TileInfo(vec2(56, 24), vec2(8, 8), 0),
        NormalFloor:      new TileInfo(vec2(0, 32), vec2(8, 8), 0),
        BeltFloor:        new TileInfo(vec2(0, 40), vec2(8, 8), 0),
        SlipFloor:        new TileInfo(vec2(56, 40), vec2(8, 8), 0),

        JumpPlayer0:      new TileInfo(vec2(8, 32), vec2(16, 16), 0),
        JumpPlayer1:      new TileInfo(vec2(24, 32), vec2(16, 16), 0),
        JumpPlayer2:      new TileInfo(vec2(40, 32), vec2(16, 16), 0),
        JumpPlayer3:      new TileInfo(vec2(16, 48), vec2(16, 16), 0),
        JumpPlayer4:      new TileInfo(vec2(48, 48), vec2(16, 16), 0),
        JumpPlayerNoDot2: new TileInfo(vec2(0, 48), vec2(16, 16), 0),
        JumpPlayerNoDot3: new TileInfo(vec2(32, 48), vec2(16, 16), 0),

        Sparkle0:         new TileInfo(vec2(64, 0), vec2(16, 16), 0),
        Sparkle1:         new TileInfo(vec2(64, 16), vec2(16, 16), 0)
    }
}

const Audio = {
    Effect: {
        Pause:      new SoundWave(`${GameConst.Directory.AudioEffect}/Pause.mp3`),
        Unpause:    new SoundWave(`${GameConst.Directory.AudioEffect}/Unpause.mp3`),
        Scroll:     new SoundWave(`${GameConst.Directory.AudioEffect}/ScrollClick.mp3`),

        StageClear: new SoundWave(`${GameConst.Directory.AudioEffect}/MGClear00.mp3`),
        StageFail:  new SoundWave(`${GameConst.Directory.AudioEffect}/MGMiss00.mp3`)

    }
};

var GameClass = {
    Orch: null,

    Font: {
        Pixel: null
    }
}
