function hslToRgb(h: number, s: number, l: number, maximums: any = {}): {r: number, g: number, b:number} | null {
    /*
    The function hslToRgb() convert HSL colors in RGB. You can choose the value ranges in the fourth argument.
    How to use :
    hslToRgb(h: number, s: number, l: number, {
        hsl: {
            h: number = 360,
            s: number = 100,
            l: number = 100
        },
        rgb: {
            r: number = 255,
            g: number = 255,
            b: number = 255
        }
    })
    */
    maximums.hsl = maximums.hsl || {
        h: 360,
        s: 100,
        l: 100
    };

    maximums.rgb = maximums.rgb || {
        r: 255,
        g: 255,
        b: 255
    };

    maximums.hsl.h = maximums.hsl.h || 360;
    maximums.hsl.s = maximums.hsl.s || 100;
    maximums.hsl.l = maximums.hsl.l || 100;
    maximums.rgb.r = maximums.rgb.r || 255;
    maximums.rgb.g = maximums.rgb.g || 255;
    maximums.rgb.b = maximums.rgb.b || 255;
    
    let h_ = h / maximums.hsl.h * 360;
    const s_ = s / maximums.hsl.s;
    const l_ = l / maximums.hsl.l;
    if (h_ < 0 || h_ > 360) {
        return null;
    }
    else if (h_ == 360) {
        h_ = 0;
    }

    const c = (1 - Math.abs(2 * l_ - 1)) * s_;
    const x = c * (1 - Math.abs((h_ / 60) % 2 - 1));
    const m = l_ - c / 2;
    
    let r_, g_, b_;
    if (h_ < 60){
        r_ = c;
        g_ = x;
        b_ = 0;
    }
    else if (h_ < 120) {
        r_ = x;
        g_ = c;
        b_ = 0;
    }
    else if (h_ < 180) {
        r_ = 0;
        g_ = c;
        b_ = x;
    }
    else if (h_ < 240) {
        r_ = 0;
        g_ = x;
        b_ = c;
    }
    else if (h_ < 300) {
        r_ = x;
        g_ = 0;
        b_ = c;
    }
    else if (h_ < 360) {
        r_ = c;
        g_ = 0;
        b_ = x;
    }
    
    return {
        r: (r_ + m) * maximums.rgb.r,
        g: (g_ + m) * maximums.rgb.g,
        b: (b_ + m) * maximums.rgb.b
    };
}