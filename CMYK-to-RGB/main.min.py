def rgb_to_cmyk(r,g,b,maximums):
    maximums["cmyk"]=getattr(maximums,'cmyk',{"c": 255,"m":255,"y":255,"k":255})
    maximums["rgb"]=getattr(maximums,'rgb',{"r":255,"g":255,"b":255})
    maximums["cmyk"]["c"]=getattr(maximums["cmyk"],"c",255)
    maximums["cmyk"]["m"]=getattr(maximums["cmyk"],"m",255)
    maximums["cmyk"]["y"]=getattr(maximums["cmyk"],"y",255)
    maximums["cmyk"]["k"]=getattr(maximums["cmyk"],"k",255)
    maximums["rgb"]["r"]=getattr(maximums["rgb"],"r",255)
    maximums["rgb"]["g"]=getattr(maximums["rgb"],"g",255)
    maximums["rgb"]["b"]=getattr(maximums["rgb"],"b",255)
    r_=r/maximums["rgb"]["r"]
    g_=g/maximums["rgb"]["g"]
    b_=b/maximums["rgb"]["b"]
    if r_<0 or r_>1 or g_<0 or g_>1 or b_<0 or b_>1:
        return None
    k_=1-max(r_,g_,b_)
    c_=(1-r_-k_)/(1-k_)
    m_=(1-g_-k_)/(1-k_)
    y_=(1-b_-k_)/(1-k_)
    return {"c":c_*maximums["cmyk"]["c"],"m":m_*maximums["cmyk"]["m"],"y":y_*maximums["cmyk"]["y"],"k":k_*maximums["cmyk"]["k"]}