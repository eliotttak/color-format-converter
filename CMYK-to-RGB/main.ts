type Maximums = {
    cmyk?: {
        c?: number
        m?: number
        y?: number
        k?: number
    }
    rgb?: {
        r?: number
        g?: number
        b?: number
    }
}

type RGB = {
    r: number
    g: number
    b: number
}


/**
    The function cmykToRgb() convert CMYK colors into RGB. You can choose the value ranges in the fifth argument.
    How to use :
    cmykToRgb(r: number, g: number, b: number, maximums: Maximums = {
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
    }): RGB | null
*/
function cmykToRgb(c: number, m: number, y: number, k: number, maximums: Maximums = {}): RGB | null {
    
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
    maximums.cmyk.k = maximums.cmyk.k || 255;
    maximums.rgb.r = maximums.rgb.r || 255;
    maximums.rgb.g = maximums.rgb.g || 255;
    maximums.rgb.b = maximums.rgb.b || 255;
    
    const c_: number = c / maximums.cmyk.c
    const m_: number = m / maximums.cmyk.m
    const y_: number = y / maximums.cmyk.y
    const k_: number = k / maximums.cmyk.k

    if (c_ < 0 || c_ > 255 || m_ < 0 || m_ > 255 || y_ < 0 || y_ > 255 || k_ < 0 || k_ > 255) {
        return null;
    }

    const r_: number = maximums.rgb.r * (1 - c_) * (1 - k_)
    const g_: number = maximums.rgb.g * (1 - m_) * (1 - k_)
    const b_: number = maximums.rgb.b * (1 - y_) * (1 - k_)

    const result: RGB = {
        r: r_,
        g: g_,
        b: b_
    }

    return result
}

let c, m, y, k: number
