function rgbToHsl(r: number, g: number, b: number, maximums: any): {h: number, s: number, l: number} | null {
    /*
    The function rgbToHsl() convert RGB colors in HSL. You can choose the value ranges in the fourth argument.
    How to use :
    rgbToHsl(r: number, g: number, b: number, {
        rgb: {
            r: number = 255,
            g: number = 255,
            b: number = 255
        },
        hsl: {
            h: number = 360,
            s: number = 100,
            l: number = 100
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
    
    let r_ = r / maximums.rgb.r;
    let g_ = g / maximums.rgb.g;
    let b_ = b / maximums.rgb.b;

    if (r_ < 0 || r_ > 1 || g_ < 0 || g_ > 1 || b_ < 0 || b_ > 1) {
        return null;
    }

    let cMax = Math.max(r_, g_, b_);
    let cMin = Math.min(r_, g_, b_);
    let delta = cMax - cMin;

    let h_, s_, l_;
    if (delta == 0) {
        h_ = 0;
    }
    else if (cMax == r_) {
        h_ = 60 * ((g_ - b_) / delta) % 6;
    }
    else if (cMax == g_) {
        h_ = 60 * ((b_ - r_) / delta) + 2;
    }
    else if (cMax == b_) {
        h_ = 60 * ((r_ - g_) / delta) + 4;
    }

    if (delta == 0) {
        s_ = 0;
    }
    else {
        s_ = delta / (1 - Math.abs(2 * l_ - 1));
    }

    l_ = (cMax + cMin) / 2;

    return {
        h: (h_ / 360) * maximums.hsl.h,
        s: s_ * maximums.hsl.s,
        l: l_ * maximums.hsl.l
    }
}