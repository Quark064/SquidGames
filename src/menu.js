class Menu {
    constructor(name, iconTile, tabColor) {
        this.name = name;
        this.iconTile = iconTile;
        this.tabColor = tabColor;

        this.elements = [];
        this.elements.push(
            new UIBlock(
                "TranslucentOverlay",
                cameraPos,
                vec2(GameConst.Screen.Width, GameConst.Screen.Height),
                new Color(0.26, 0.26, 0.26, 0.81),
                GameConst.MenuLayer.Lowest
            ),
            new UIBlock(
                "TopControlTab",
                cameraPos.add(vec2(0, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(GameConst.Screen.Width, GameConst.Menu.TabBarWidth),
                new Color(0, 0, 0, 1.0),
                GameConst.MenuLayer.Low
            ),
            new UIText(
                this.name,
                cameraPos.add(vec2(430, 85)),
                13,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "GameMenuIcon",
                cameraPos.add(vec2(0, 15)),
                vec2(420, 256),
                this.iconTile,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "NextGameArrowLeft",
                cameraPos.add(vec2(-250, 15)),
                vec2(24, 24).scale(2),
                Sprite.Menu.ArrowIcon,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "NextGameArrowRight",
                cameraPos.add(vec2(250, 15)),
                vec2(24, 24).scale(2),
                Sprite.Menu.ArrowIcon,
                GameConst.MenuLayer.Highest,
                true
            ),
            new UIText(
                "START",
                cameraPos.add(vec2(470, 387)),
                35,
                new Color(1, 1, 1),
                "Gambit",
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "StartGameKey",
                cameraPos.add(vec2(-65, -150)),
                vec2(25, 25).scale(3),
                Sprite.Menu.EnterKey,
                GameConst.MenuLayer.Highest
            )
        );
    }

    render() {
        this.elements.sort((x, y) => x.layer - y.layer)
        this.elements.forEach(element => {
            element.render();
        });
    }

}

class JumpMenu extends Menu {
    constructor() {
        super("Squid Jump", Sprite.Menu.JumpMenuImage, new Color(0.71, 0.318, 0.071));
        
        this.elements.push(
            new UIImage(
                "MoveControlBackdropLeft",
                cameraPos.add(vec2(-405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "MoveControlBackdropCenter",
                cameraPos.add(vec2(-320, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(175, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "MoveControlBackdropRight",
                cameraPos.add(vec2(-220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "JumpControlBackdropLeft",
                cameraPos.add(vec2(220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "JumpControlBackdropCenter",
                cameraPos.add(vec2(320, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(175, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "JumpControlBackdropRight",
                cameraPos.add(vec2(405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "MoveControlIcon",
                cameraPos.add(vec2(-380, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.ArrowKeys,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "JumpControlIcon",
                cameraPos.add(vec2(242, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.SpaceKey,
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Move",
                cameraPos.add(vec2(105, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Jump",
                cameraPos.add(vec2(725, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            )
        );
    }
}

class BallMenu extends Menu {
    constructor() {
        super("Squidball", Sprite.Menu.BallMenuImage, new Color(0.294, 0.239, 0.706));
        
        this.elements.push(
            new UIImage(
                "MoveControlBackdropLeft",
                cameraPos.add(vec2(-405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "MoveControlBackdropCenter",
                cameraPos.add(vec2(-220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(360, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "MoveControlBackdropRight",
                cameraPos.add(vec2(-30, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "JumpControlBackdropLeft",
                cameraPos.add(vec2(30, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "JumpControlBackdropCenter",
                cameraPos.add(vec2(220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(360, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "JumpControlBackdropRight",
                cameraPos.add(vec2(405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "MoveControlIcon",
                cameraPos.add(vec2(-380, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.ArrowKeys,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "JumpControlIcon",
                cameraPos.add(vec2(50, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.SpaceKey,
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Move/Aim",
                cameraPos.add(vec2(127, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Jump/Spike",
                cameraPos.add(vec2(565, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            )
        );
    }
}

class RacerMenu extends Menu {
    constructor() {
        super("Squid Racer", Sprite.Menu.RacerMenuImage, new Color(0.537, 0.506, 0.506));
        
        this.elements.push(
            new UIImage(
                "SteerControlBackdropLeft",
                cameraPos.add(vec2(-405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "SteerControlBackdropCenter",
                cameraPos.add(vec2(-320, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(175, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "SteerControlBackdropRight",
                cameraPos.add(vec2(-220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "DriveControlBackdropLeft",
                cameraPos.add(vec2(-188, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "DriveControlBackdropCenter",
                cameraPos.add(vec2(5, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(365, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "DriveControlBackdropRight",
                cameraPos.add(vec2(190, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "SteerControlIcon",
                cameraPos.add(vec2(-380, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.ArrowKeys,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "DriftControlIcon",
                cameraPos.add(vec2(-155, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.SpaceKey,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "AccelerateControlIcon",
                cameraPos.add(vec2(25, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.ShiftKey,
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Steer",
                cameraPos.add(vec2(105, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Drift",
                cameraPos.add(vec2(325, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Accelerate",
                cameraPos.add(vec2(535, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            )
        );
    }
}

class BeatzMenu extends Menu {
    constructor() {
        super("Squid Beatz", Sprite.Menu.BeatzMenuImage, new Color(0.808, 0.294, 0.898));
        
        this.elements.push(
            new UIImage(
                "TrackControlBackdropLeft",
                cameraPos.add(vec2(-405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "TrackControlBackdropCenter",
                cameraPos.add(vec2(-320, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(175, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "TrackControlBackdropRight",
                cameraPos.add(vec2(-220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "PlaybackControlBackdropLeft",
                cameraPos.add(vec2(-188, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "PlaybackControlBackdropCenter",
                cameraPos.add(vec2(5, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(365, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "PlaybackControlBackdropRight",
                cameraPos.add(vec2(190, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "BeatzControlBackdropLeft",
                cameraPos.add(vec2(220, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                false,
                this.tabColor
            ),
            new UIBlock(
                "BeatzControlBackdropCenter",
                cameraPos.add(vec2(320, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(175, 50),
                this.tabColor,
                GameConst.MenuLayer.High
            ),
            new UIImage(
                "BeatzControlBackdropRight",
                cameraPos.add(vec2(405, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(36, 72).scale(0.7),
                Sprite.Menu.ControlFrame,
                GameConst.MenuLayer.High,
                true,
                this.tabColor
            ),
            new UIImage(
                "TrackControlIcon",
                cameraPos.add(vec2(-380, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.ArrowKeys,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "ModeControlIcon",
                cameraPos.add(vec2(-155, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.SpaceKey,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "PlayPauseControlIcon",
                cameraPos.add(vec2(25, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.ShiftKey,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "BeatzControlIcon",
                cameraPos.add(vec2(242, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.SpaceKey,
                GameConst.MenuLayer.Highest
            ),
            new UIImage(
                "BeatzSecondControlIcon",
                cameraPos.add(vec2(290, (GameConst.Screen.Height / 2) - (GameConst.Menu.TabBarWidth / 2))),
                vec2(25, 25).scale(2),
                Sprite.Menu.SpaceKey,
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Track",
                cameraPos.add(vec2(105, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Mode",
                cameraPos.add(vec2(325, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Play/Pause",
                cameraPos.add(vec2(535, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            ),
            new UIText(
                "Beatz",
                cameraPos.add(vec2(770, 37)),
                17,
                new Color(1, 1, 1),
                "Message",
                GameConst.MenuLayer.Highest
            )
        );
    }
}
