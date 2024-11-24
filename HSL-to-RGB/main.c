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

// Structure pour les couleurs RGB
typedef struct {
    int r;
    int g;
    int b;
} RGB;

// Fonction pour convertir les valeurs HSL en RGB
RGB hslToRgb(double h, double s, double l, Maximums maximums) {
    RGB rgb;
    
    double h_ = h / maximums.hsl.h * 360.0;
    double s_ = s / maximums.hsl.s;
    double l_ = l / maximums.hsl.l;
    
    if (h_ < 0 || h_ > 360) {
        rgb.r = rgb.g = rgb.b = -1; // Indicateur d'erreur
        return rgb;
    }
    if (h_ == 360) {
        h_ = 0;
    }

    double c = (1 - fabs(2 * l_ - 1)) * s_;
    double x = c * (1 - fabs(fmod(h_ / 60.0, 2) - 1));
    double m = l_ - c / 2;

    double r_, g_, b_;
    if (h_ < 60) {
        r_ = c;
        g_ = x;
        b_ = 0;
    } else if (h_ < 120) {
        r_ = x;
        g_ = c;
        b_ = 0;
    } else if (h_ < 180) {
        r_ = 0;
        g_ = c;
        b_ = x;
    } else if (h_ < 240) {
        r_ = 0;
        g_ = x;
        b_ = c;
    } else if (h_ < 300) {
        r_ = x;
        g_ = 0;
        b_ = c;
    } else if (h_ < 360) {
        r_ = c;
        g_ = 0;
        b_ = x;
    } else {
        r_ = g_ = b_ = 0;
    }

    rgb.r = (r_ + m) * maximums.rgb.r;
    rgb.g = (g_ + m) * maximums.rgb.g;
    rgb.b = (b_ + m) * maximums.rgb.b;

    return rgb;
}

int main() {
    // Appeler la fonction de conversion avec les valeurs directement
    RGB result = hslToRgb(200, 0.5, 0.4, (Maximums){{360, 100, 100}, {255, 255, 255}});
    
    // Vérifier et afficher les résultats
    if (result.r == -1 && result.g == -1 && result.b == -1) {
        printf("Erreur dans la conversion HSL vers RGB\n");
    } else {
        printf("RGB: R = %d, G = %d, B = %d\n", result.r, result.g, result.b);
    }

    return 0;
}
