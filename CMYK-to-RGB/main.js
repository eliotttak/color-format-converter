function cmykToRgb(c, m, y, k, maximums = {}) {
    /*
    The function cmykToRgb() convert CMYK colors in RGB. You can choose the value ranges in the fourth argument.
    How to use :
    cmykToRgb(c: number, m: number, y: number, k: number, {
        rgb: {
            r: number = 255,
            g: number = 255,
            b: number = 255
        },
        cmyk: {
            c: number = 255,
            m: number = 255,
            y: number = 255,
            k: number = 255
        }        
    })
    */
    maximums.cmyk = maximums.cmyk || {
        c: 255,
        m: 255,
        y: 255,
        k: 255
    };

    maximums.rgb = maximums.rgb || {
        r: 255,
        g: 255,
        b: 255
    };

    maximums.cmyk.c = maximums.cmyk.c || 255;
    maximums.cmyk.m = maximums.cmyk.m || 255;
    maximums.cmyk.y = maximums.cmyk.y || 255;
    maximums.cmyk.y = maximums.cmyk.k || 255;
    maximums.rgb.r = maximums.rgb.r || 255;
    maximums.rgb.g = maximums.rgb.g || 255;
    maximums.rgb.b = maximums.rgb.b || 255;
    
    const c_ = c / maximums.cmyk.c
    const m_ = m / maximums.cmyk.m
    const y_ = y / maximums.cmyk.y
    const k_ = k / maximums.cmyk.k

    if (c_ < 0 || c_ > 255 || m_ < 0 || m_ > 255 || y_ < 0 || y_ > 255 || k_ < 0 || k_ > 255) {
        return null;
    }

    const r_ = maximums.rgb.r * (1 - c_) * (1 - k_)
    const g_ = maximums.rgb.g * (1 - m_) * (1 - k_)
    const b_ = maximums.rgb.b * (1 - y_) * (1 - k_)

    const result = {
        r: r_,
        g: g_,
        b: b_
    }

    return result
}