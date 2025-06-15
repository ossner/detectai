import CubicSpline from "cubic-spline";


export function AI(t, W_max = 3e12, k_W = 2.1, t_W = 2025.5, E_floor = 0.5, E_start = 0.8, r_E = 0.02, t_R = 2028, r_T = 0.01, T_floor = 0.6) {
    return (W_max / (1 + Math.exp(-k_W * (t - t_W)))) * Math.max(E_floor, E_start - r_E * (t - 2023)) * Math.max(T_floor, 1 - r_T * Math.max(0, t - t_R));
}

export function E(t, E_max = 0.33, k_E = 0.014, t_E = 2016) {
    return E_max / (1 + Math.exp(-k_E * (t - t_E))) + 0.005;
}

export function G(t, G_max = 1600, k_G = 0.06, t_G = 1985, ai_start_year = 2023, ai_dampening_rate = 0.005) {
    const sigmoid = G_max / (1 + Math.exp(-k_G * (t - t_G))) + 15;
    const years_since_ai = Math.max(0, t - ai_start_year);
    const dampening_factor = Math.pow(1 - ai_dampening_rate, years_since_ai);
    return sigmoid * dampening_factor;
}
