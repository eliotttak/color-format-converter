def hslToRgb(h,s,l,maximums):
    maximums["hsl"]=getattr(maximums,'hsl',{"h":360,"s":100,"l":100})
    maximums["rgb"]=getattr(maximums,'rgb',{"r":255,"g": 255,"b": 255})
    maximums["hsl"]["h"]=getattr(maximums["hsl"],"h",360)
    maximums["hsl"]["s"]=getattr(maximums["hsl"],"s",100)
    maximums["hsl"]["l"]=getattr(maximums["hsl"],"l",100)
    maximums["rgb"]["r"]=getattr(maximums["rgb"],"r",255)
    maximums["rgb"]["g"]=getattr(maximums["rgb"],"g",255)
    maximums["rgb"]["b"]=getattr(maximums["rgb"],"b",255)
    h_=h/maximums["hsl"]["h"]*360
    s_=s/maximums["hsl"]["s"]
    l_=l/maximums["hsl"]["l"]
    if h_<0 or h_>360:
        return None
    elif h==360:
        h_=0
    c=(1-abs(2*l_-1))*s_
    x=c*(1-abs((h_/60)%2-1))
    m=l_-c/2
    r_=None,g_=None,b_=None
    if h_<60:
        r_=c
        g_=x
        b_=0
    elif h_<120:
        r_=x
        g_=c
        b_=0
    elif h_<180:
        r_=0
        g_=c
        b_=x
    elif h_<240:
        r_=0
        g_=x
        b_=c
    elif h_<300:
        r_=x
        g_=0
        b_=c
    elif h_<360:
        r_=c
        g_=0
        b_=x
    return {"r":(r_+m)*maximums["rgb"]["r"],"g":(g_+m)*maximums["rgb"]["g"],"b":(b_+m)*maximums["rgb"]["b"]}