from cmyk_rgb_pack import *

c = float(input("Enter the C value : "))
m = float(input("Enter the M value : "))
y = float(input("Enter the Y value : "))
k = float(input("Enter the K value : "))

print(f"\ncmyk({c}, {m}, {y}, {k}) = rgb({round(cmyk_to_rgb(c, m, y, k)["r"], 2)}, {round(cmyk_to_rgb(c, m, y, k)["g"], 2)}, {round(cmyk_to_rgb(c, m, y, k)["b"], 2)})\n\nAppuyez sur Entrée pour fermer cette fenetre...")
input()