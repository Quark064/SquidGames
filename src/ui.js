class UIElement {
    constructor() { }

    render() {
        throw new Error("UIElement.Render is an abstract method!")
    }
}

class UIBlock extends UIElement {
    constructor(name, pos, size, color, layer) {
        super();
        this.name = name;

        this.pos = pos;
        this.size = size;
        this.color = color;
        this.layer = layer;
    }

    render() {
        drawTile(
            this.pos,
            this.size,
            undefined,
            this.color
        )
    }
}

class UIImage extends UIElement {
    constructor(name, pos, size, tileInfo, layer, mirror=undefined, colorOver=undefined) {
        super();

        this.name = name;

        this.pos = pos;
        this.size = size;
        this.tileInfo = tileInfo;
        this.layer = layer;
        this.mirror = mirror;
        this.colorOver = colorOver;
    }

    render() {
        drawTile(
            this.pos,
            this.size,
            this.tileInfo,
            this.colorOver,
            undefined,
            this.mirror
        );
    }
}

class UIText extends UIElement {
    constructor(text, pos, size, color, font, layer) {
        super();

        this.text = text;
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.font = font;
        this.layer = layer;
    }

    render() {
        drawTextScreen(
            this.text,
            this.pos,
            this.size,
            this.color,
            0,
            undefined,
            undefined,
            this.font
        );
    }
}
