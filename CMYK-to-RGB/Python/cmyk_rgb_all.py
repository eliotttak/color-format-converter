def cmyk_to_rgb(c, m, y, k, maximums = {}):
    """
    The function cmyk_to_rgb() convert CMYK colors in RGB. You can choose the value ranges in the fifth argument.
    How to use :
    cmyk_to_rgb(c: number, m: number, y: number, k: number, maximums = {
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
    """
    maximums["cmyk"] = getattr(maximums, 'cmyk', {
        "c": 255,
        "m": 255,
        "y": 255,
        "k": 255
    })
    
    maximums["rgb"] = getattr(maximums, 'rgb', {
        "r": 255,
        "g": 255,
        "b": 255
    })
    
    maximums["cmyk"]["c"] = getattr(maximums["cmyk"], "c", 255)
    maximums["cmyk"]["m"] = getattr(maximums["cmyk"], "m", 255)
    maximums["cmyk"]["y"] = getattr(maximums["cmyk"], "y", 255)
    maximums["cmyk"]["k"] = getattr(maximums["cmyk"], "k", 255)
    maximums["rgb"]["r"] = getattr(maximums["rgb"], "r", 255)
    maximums["rgb"]["g"] = getattr(maximums["rgb"], "g", 255)
    maximums["rgb"]["b"] = getattr(maximums["rgb"], "b", 255)

    c_ = c / maximums["cmyk"]["c"]
    m_ = m / maximums["cmyk"]["m"]
    y_ = y / maximums["cmyk"]["y"]
    k_ = k / maximums["cmyk"]["k"]

    if c_ < 0 or c_ > 255 or m_ < 0 or m_ > 255 or y_ < 0 or y_ > 255 or k_ < 0 or k_ > 255 :
        return None
    
    r_ = (1 - c_) * (1 - k_)
    g_ = (1 - m_) * (1 - k_)
    b_ = (1 - y_) * (1 - k_)

    rgb = {
        "r": r_ * maximums["rgb"]["r"],
        "g": g_ * maximums["rgb"]["g"],
        "b": b_ * maximums["rgb"]["b"]
    }

    return rgb


c = float(input("Enter the C value : "))
m = float(input("Enter the M value : "))
y = float(input("Enter the Y value : "))
k = float(input("Enter the K value : "))

print(f"\ncmyk({c}, {m}, {y}, {k}) = rgb({round(cmyk_to_rgb(c, m, y, k)["r"], 2)}, {round(cmyk_to_rgb(c, m, y, k)["g"], 2)}, {round(cmyk_to_rgb(c, m, y, k)["b"], 2)})\n\nAppuyez sur Entrée pour fermer cette fenetre...")
input()