#include <stdio.h>
#include <math.h>

// Structure pour les valeurs maximums de HSL et RGB
typedef struct {
    double h;
    double s;
    double l;
} HSL_Max;

typedef struct {
    double r;
    double g;
    double b;
} RGB_Max;

typedef struct {
    HSL_Max hsl;
    RGB_Max rgb;
} Maximums;

// Structure pour les couleurs HSL
typedef struct {
    int r;
    int g;
    int b;
} HSL;

// Fonction pour convertir les valeurs RGB en HSL
HSL rgb_to_hsl(double r, double g, double b, Maximums maximums) {
    HSL hsl;
    
    double r_ = r / maximums.rgb.r;
    double g_ = g / maximums.rgb.g;
    double b_ = b / maximums.rgb.b;
    
    if (r_ < 0 || r_ > 1 || g_ < 0 || g_ > 1 || b_ < 0 || b_ > 1) {
        return {-1, -1, -1};
    }

    double c_max = (r_ > g_) ? 
                    (
                        (r_ > b_) ? 
                        r_ :
                        b_
                    ) : 
                    (
                        (g_ > b_) ?
                        g_ :
                        b_
                    );
    double c_min = (r_ < g_) ? 
                    (
                        (r_ < b_) ? 
                        r_ :
                        b_
                    ) : 
                    (
                        (g_ < b_) ?
                        g_ :
                        b_
                    );
    double delta = c_max - c_min;

    double h_, s_, l_;
    if (delta == 0) {
        h_ = 0;
    }
    else if (c_max == r_) {
        h_ = 60 * ((g_ - b_) / delta) % 6;
    }
    else if (c_max == g_) {
        h_ = 60 * ((b_ - r_) / delta) + 2;
    }
    else if (c_max == b_) {
        h_ = 60 * ((r_ - g_) / delta) + 4;
    }

    if (delta == 0) {
        s_ = 0;
    }
    else {
        s_ = delta / (1 - fabs(2 * l_ - 1));
    }

    l_ = (c_max + c_min) / 2;

    hsl.h = (h_ / 360) * maximums.hsl.h;
    hsl.s = s_ * maximums.hsl.s;
    hsl.l = l_ * maximums.hsl.l;

    return hsl;
}