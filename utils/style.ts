import type { ISourceOptions } from "tsparticles-engine";

// color.adobe.com, split complementary
export const tiffanyBlue = "#81D8D0";
export const darkPink = "#8C6362";
export const lightPink = "#D98F8D";
export const darkBrown = "#8C7046";
export const lightBrown = "#D9B277";

// Monochromatic
export const darkTiffanyBlue = "#365956";
export const lightTiffanyBlue = "#C9DfDD";
export const darkGrayTiffanyBlue = "#505958";
export const lightGrayTiffanyBlue = "#63A69F";

export const tsParticlesOptions: ISourceOptions = {
  fpsLimit: 120,
  particles: {
    color: {
      value: [tiffanyBlue, lightPink, lightBrown, darkPink, darkBrown],
    },
    move: {
      direction: "bottom",
      enable: true,
      outModes: {
        default: "out",
      },
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 300,
      },
      value: 5,
    },
    opacity: {
      value: 0.1,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 100 },
    },
  },
};
