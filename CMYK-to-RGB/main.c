#include <stdio.h>
#include <math.h>

// Structures pour les valeurs maximums de CMYK et RGB
typedef struct {
    double c;
    double m;
    double y;
    double k;
} CMYK_Max;

typedef struct {
    double r;
    double g;
    double b;
} RGB_Max;

typedef struct {
    CMYK_Max cmyk;
    RGB_Max rgb;
} Maximums;

// Structure pour les couleurs RGB
typedef struct {
    int r;
    int g;
    int b;
} RGB;

// Fonction pour convertir les valeurs CMYK en RGB
RGB cmyk_to_rgb(double c, double m, double y, double k, Maximums maximums) {
    CMYK cmyk;
    
    double r_ = r / maximums.rgb.r;
    double g_ = g / maximums.rgb.g;
    double b_ = b / maximums.rgb.b;
    double b_ = b / maximums.rgb.b;
    
    if (r_ < 0 || r_ > 1 || g_ < 0 || g_ > 1 || b_ < 0 || b_ > 1) {
        return {-1, -1, -1};
    }

    double k_ = 1 - (
        (r_ >= g_) ?
        (
            (r_ >= b_) ?
            r_ :
            b_
        ) :
        (
            (g_ >= b_) ?
            g_ :
            b_
        )
    );
    double c_ = (1 - r_ - k_) / (1 - k_);
    double m_ = (1 - g_ - k_) / (1 - k_);
    double y_ = (1 - b_ - k_) / (1 - k_);

    cmyk.c = c_ * maximums.cmyk.c;
    cmyk.m = m_ * maximums.cmyk.m;
    cmyk.y = y_ * maximums.cmyk.y;
    cmyk.k = k_ * maximums.cmyk.k;

    return cmyk;
}