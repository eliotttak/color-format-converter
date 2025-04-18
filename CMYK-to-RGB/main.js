/**
 * @description A set of RGB values
 * @typedef {object} RGB
 * @property {number} r The Red value
 * @property {number} g The Green value
 * @property {number} b The Blue value
 */

/**
 * @description This function cmykToRgb() convert CMYK colors into RGB.
 * @param {number} c The part of Cyan in the color to convert
 * @param {number} m The part of Magenta in the color to convert
 * @param {number} y The part of Yellow in the color to convert
 * @param {number} k The part of black (K for Key, to avoid confusion with Blue) in the color to convert
 * @param {object} [maximums] The input (CMYK) and output (RGB) maximum values
 * @param {object} [maximums.cmyk] The input (CMYK) maximum values
 * @param {number} [maximums.cmyk.c=255] The Cyan maximum value
 * @param {number} [maximums.cmyk.m=255] The Magenta maximum value
 * @param {number} [maximums.cmyk.y=255] The Yellow maximum value
 * @param {number} [maximums.cmyk.k=255] The Key maximum value
 * @param {object} [maximums.rgb] The output (RGB) maximum values
 * @param {number} [maximums.rgb.r=255] The Red maximum value
 * @param {number} [maximums.rgb.g=255] The Green maximum value
 * @param {number} [maximums.rgb.b=255] The Blue maximum value
 * 
 * 
 * @returns {RGB|null} The RGB converted color
 */
function cmykToRgb(c, m, y, k, maximums = {}) {
    maximums.cmyk = maximums.cmyk || {
        c: 255,
        m: 255,
        y: 255,
        k: 255
    }

    maximums.rgb = maximums.rgb || {
        r: 255,
        g: 255,
        b: 255
    }

    maximums.cmyk.c = maximums.cmyk.c || 255
    maximums.cmyk.m = maximums.cmyk.m || 255
    maximums.cmyk.y = maximums.cmyk.y || 255
    maximums.cmyk.y = maximums.cmyk.k || 255
    maximums.rgb.r = maximums.rgb.r || 255
    maximums.rgb.g = maximums.rgb.g || 255
    maximums.rgb.b = maximums.rgb.b || 255
    
    const c_ = c / maximums.cmyk.c
    const m_ = m / maximums.cmyk.m
    const y_ = y / maximums.cmyk.y
    const k_ = k / maximums.cmyk.k

    if (c_ < 0 || c_ > 255 || m_ < 0 || m_ > 255 || y_ < 0 || y_ > 255 || k_ < 0 || k_ > 255) {
        return null
    }

    const r_ = (1 - c_) * (1 - k_)
    const g_ = (1 - m_) * (1 - k_)
    const b_ = (1 - y_) * (1 - k_)


    const result = {
        r: r_ * maximums.rgb.r,
        g: g_ * maximums.rgb.g,
        b: b_ * maximums.rgb.b
    }

    return result
}