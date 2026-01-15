import math

def get_milky_way_plane_points(n_points=120):
    # Матрица перехода из Галактической системы в Экваториальную (J2000)
    # Источник: Gaia DR1 / Hipparcos
    M = [
        [-0.054876,  0.494109, -0.867666],
        [-0.873437, -0.444830, -0.198076],
        [-0.483835,  0.746982,  0.455984]
    ]

    points = []
    for i in range(n_points):
        # 1. Точка на круге в плоскости Галактики (Z_gal = 0)
        theta = 2 * math.pi * i / n_points
        x_gal = math.cos(theta)
        y_gal = math.sin(theta)
        z_gal = 0.0

        # 2. Поворот вектора в экваториальную систему (X_eq, Y_eq, Z_eq)
        x_eq = M[0][0]*x_gal + M[0][1]*y_gal + M[0][2]*z_gal
        y_eq = M[1][0]*x_gal + M[1][1]*y_gal + M[1][2]*z_gal
        z_eq = M[2][0]*x_gal + M[2][1]*y_gal + M[2][2]*z_gal

        # 3. Перевод из декартовых координат в RA и Dec
        # Расстояние r для единичной сферы = 1.0
        r = math.sqrt(x_eq**2 + y_eq**2 + z_eq**2)
        
        # Склонение (Dec)
        dec = math.degrees(math.asin(z_eq / r))
        
        # Прямое восхождение (RA)
        ra = math.degrees(math.atan2(y_eq, x_eq))
        if ra < 0: ra += 360.0

        points.append((round(ra, 4), round(dec, 4), 1.0))
    
    return points

# Генерация и вывод
points = get_milky_way_plane_points(60)
print("RA (deg), Dec (deg), Distance")
for p in points:
    print(f"{p[0]}, {p[1]}, {p[2]}")
