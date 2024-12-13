function rgbToCmyk(r, g, b, maximums = {}) {
    /*
    The function rgbToCmyk() convert RGB colors in CMYK. You can choose the value ranges in the fourth argument.
    How to use :
    rgbToCmyk(r: number, g: number, b: number, {
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
    
    const r_ = r / maximums.rgb.r;
    const g_ = g / maximums.rgb.g;
    const b_ = b / maximums.rgb.b;

    if (r_ < 0 || r_ > 1 || g_ < 0 || g_ > 1 || b_ < 0 || b_ > 1) {
        return null;
    }

    const k_ = 1 - Math.max(r_, g_, b_)
    let c_ = (1 - r_ - k_) / (1 - k_)
    let m_ = (1 - g_ - k_) / (1 - k_)
    let y_ = (1 - b_ - k_) / (1 - k_)
    
    c_ = isNaN(c_) ? 0 : c_
    m_ = isNaN(m_) ? 0 : m_
    y_ = isNaN(y_) ? 0 : y_

    console.log(c_, m_, y_, k_)
    let result = {
        c: c_ * maximums.cmyk.c,
        m: m_ * maximums.cmyk.m,
        y: y_ * maximums.cmyk.y,
        k: k_ * maximums.cmyk.k,
    }

    return result
}