#include <stdio.h>
#include <math.h>
#include <conio.h>

// Structures for maximum CMYK and RGB values
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

// Structure for the RGB values
typedef struct {
    int r;
    int g;
    int b;
} RGB;

RGB cmyk_to_rgb(double c, double m, double y, double k, Maximums maximums) {
    /**
    The function cmyk_to_rgb() convert CMYK colors into RGB. You can choose the value ranges in the fifth argument.
    How to use :
    RGB cmykToRgb(double c, double m, double y, double k, Maximums maximums = {
        rgb: {
            double r;
            double g;
            double b;
        },
        cmyk: {
            double c;
            double m;
            double y;
            double k;
        }        
    })
    */
    RGB rgb;
    
    double c_ = c / maximums.cmyk.c;
    double m_ = m / maximums.cmyk.m;
    double y_ = y / maximums.cmyk.y;
    double k_ = k / maximums.cmyk.k;
    
    if (c_ < 0 || c_ > 1 || m_ < 0 || m_ > 1 || y_ < 0 || y_ > 1 || k_ < 0 || k_ > 1    ) {
        rgb.r = -1;
        rgb.g = -1;
        rgb.b = -1;
        return rgb;
    }

    double r_ = (1 - c_) * (1 - k_);
    double g_ = (1 - m_) * (1 - k_);
    double b_ = (1 - y_) * (1 - k_);

    int r = round(maximums.rgb.r * r_);
    int g = round(maximums.rgb.g * g_);
    int b = round(maximums.rgb.b * b_);

    rgb.r = r;
    rgb.g = g;
    rgb.b = b;

    return rgb;
}

