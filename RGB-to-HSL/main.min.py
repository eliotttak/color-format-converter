def mod(a,n):
    return ((a%n)+n)%n
def rgb_to_hsl(r,g,b,maximums):
    maximums["hsl"]=getattr(maximums,'hsl',{"h":360,"s":100,"l":100})
    maximums["rgb"]=getattr(maximums,'rgb',{"r":255,"g":255,"b":255})
    maximums["hsl"]["h"]=getattr(maximums["hsl"],"h",360)
    maximums["hsl"]["s"]=getattr(maximums["hsl"],"s",100)
    maximums["hsl"]["l"]=getattr(maximums["hsl"],"l",100)
    maximums["rgb"]["r"]=getattr(maximums["rgb"],"r",255)
    maximums["rgb"]["g"]=getattr(maximums["rgb"],"g",255)
    maximums["rgb"]["b"]=getattr(maximums["rgb"],"b",255)
    r_=r/maximums["rgb"]["r"]
    g_=g/maximums["rgb"]["g"]
    b_=b/maximums["rgb"]["b"]
    if r_<0 or r_>1 or g_<0 or g_>1 or b_<0 or b_>1:
        return None    
    c_max=max(r_,g_,b_)
    c_min=min(r_,g_,b_)
    delta=c_max-c_min
    if delta==0:
        h_=0
    elif c_max==b_:
        h_=60*(((r_-g_)/delta)+4)
    elif c_max==g_:
        h_=60*(((b_-r_)/delta)+2)
    elif c_max==r_:
        h_=60*mod(((g_-b_)/delta),6)
    if h_<0:
        h_+=360
    l_=(c_max+c_min)/2
    if delta==0:
        s_=0
    else:
        s_=delta/(1-abs(2*l_-1))
    return {"h":(h_/360)*maximums["hsl"]["h"],"s":s_*maximums["hsl"]["s"],"l":l_*maximums["hsl"]["l"]}