  const getRelativeLuminance = (color) => {
    const sRGB = (value) => {
      value /= 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
  
    const r = sRGB(color.r);
    const g = sRGB(color.g);
    const b = sRGB(color.b);
  
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  
  export const getContrastRatio = (color1, color2) => {
    const luminance1 = getRelativeLuminance(color1);
    const luminance2 = getRelativeLuminance(color2);
  
    const lightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
  
    return (lightest + 0.05) / (darkest + 0.05);
  }
  
  export const parseColor = (colorCode) => {
    const hex = colorCode.slice(1); // Remove the leading '#'
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }

  export const rgbToHex = (rgb) => {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
  
    const hex = (x) => {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    };
  
    return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
  };