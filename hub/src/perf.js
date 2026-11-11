// Low-power detection: phones and weak CPUs get fewer effects (no pulses, no ambient SVG loops).
export const LOW_POWER = Math.min(innerWidth, innerHeight) < 600 || innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 2;
export const MID_POWER = !LOW_POWER && ((navigator.hardwareConcurrency || 8) <= 4 || innerWidth < 1024);
if (LOW_POWER) document.documentElement.classList.add('lp');
