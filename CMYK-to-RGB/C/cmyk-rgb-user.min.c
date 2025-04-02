#include <stdio.h>
#include <conio.h>
#include <math.h>
#include "cmyk-rgb-head.min.h"
int main(void){int c,m,y,k;printf("Enter the C value : ");scanf("%d",&c);printf("Enter the M value : ");scanf("%d",&m);printf("Enter the Y value : ");scanf("%d",&y);printf("Enter the K value : ");scanf("%d",&k);RGB_Max rgb_max={r:255,g:255,b:255};CMYK_Max cmyk_max={c:255,m:255,y:255,k:255};Maximums maximums={cmyk:cmyk_max,rgb:rgb_max};printf("\ncmyk(%d, %d, %d, %d) = rgb(%d, %d, %d)\n\nAppuyez sur une touche pour fermer cette fenetre...\n",c,m,y,k,cmyk_to_rgb(c,m,y,k,maximums).r,cmyk_to_rgb(c,m,y,k,maximums).g,cmyk_to_rgb(c,m,y,k,maximums).b);getch();return 0;}