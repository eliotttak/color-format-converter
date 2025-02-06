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
    int h;
    int s;
    int l;
} HSL;

double mod(double a, double n) {
    return (a - n * (a / n));
}

// Fonction pour convertir les valeurs RGB en HSL
HSL rgb_to_hsl(double r, double g, double b, Maximums maximums) {
    HSL hsl;

    double r_ = r / maximums.rgb.r;
    double g_ = g / maximums.rgb.g;
    double b_ = b / maximums.rgb.b;

    if (r_ < 0 || r_ > 1 || g_ < 0 || g_ > 1 || b_ < 0 || b_ > 1) {
        hsl.h = -1;
        hsl.s = -1;
        hsl.l = -1;
        return hsl;
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
    else if (c_max == b_) {
        h_ = 60 * (((r_ - g_) / delta) + 4);
    }
    else if (c_max == g_) {
        h_ = 60 * (((b_ - r_) / delta) + 2);
    }
    else if (c_max == r_) {
        h_ = 60 * mod(((g_ - b_) / delta), 6);
    }

    if (h_ < 0) {
        h_ += 360;
    }

    l_ = (c_max + c_min) / 2;

    if (delta == 0) {
        s_ = 0;
    }
    else {
        s_ = delta / (1 - fabs(2 * l_ - 1));
    }

    hsl.h = (h_ / 360) * maximums.hsl.h;
    hsl.s = s_ * maximums.hsl.s;
    hsl.l = l_ * maximums.hsl.l;

    return hsl;
}

void main (void) {
    int r;
    printf("Enter the R value : ");
    scanf("%d", &r);
    int g;
    printf("Enter the G value : ");
    scanf("%d", &g);
    int b;
    printf("Enter the B value : ");
    scanf("%d", &b);
    RGB_Max rgb_max = {
        r: 255,
        g: 255,
        b: 255
    };
    HSL_Max hsl_max = {
        h: 360,
        s: 100,
        l: 100
    };
    Maximums maximums = {
        rgb: rgb_max,
        hsl: hsl_max
    };
    printf("rgb(%d, %d, %d) = hsl(%ddeg %d%% %d%%)\n", r, g, b, rgb_to_hsl(r, g, b, maximums).h, rgb_to_hsl(r, g, b, maximums).s, rgb_to_hsl(r, g, b, maximums).l);

}
