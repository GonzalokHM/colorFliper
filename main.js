import './style.css'
import { getContrastRatio,parseColor, rgbToHex } from './components/color_funcion';


const COLOR_PALETTES = [
  {
    name: 'palette_odisei',
    colors: {
      '#335c67ff': 'dark-slate-gray',
      '#fff3b0ff': 'vanilla',
      '#e09f3eff': 'hunyadi-yellow',
      '#9e2a2bff': 'auburn',
      '#540b0eff': 'chocolate-cosmos',
    },
  },
  {
    name: 'palette_cosmos',
    colors: {
      '#03071e': 'Rich black',
      '#370617': 'Chocolate cosmos',
      '#6a040f': 'Rosewood',
      '#9d0208': 'Penn red',
      '#d00000': 'Engineering orange',
      '#dc2f02': 'Sinopia',
      '#e85d04': 'Persimmon',
      '#f48c06': 'Princeton orange',
      '#faa307': 'Orange',
      '#ffba08': 'Selective yellow',
    },
  },
  {
    name: 'palette_cherry',
    colors: {
      '#d8e2dcff': 'platinum',
      '#ffe5d9ff': 'champagne-pink',
      '#ffcad4ff': 'pink',
      '#f4acb7ff': 'cherry-blossom-pink',
      '#9d8189ff': 'mountbatten-pink',
    },
  },
];
const addOptionsToColorPicker = () => {
  const colorPickerSelect = document.querySelector("#color-picker");

  COLOR_PALETTES.forEach((palette) => {
    const option = document.createElement("option");
    option.value = palette.name;
    option.innerText = palette.name;
    colorPickerSelect.appendChild(option);
  });
};

const addEventListenerToColorPicker = () => {
  const colorPickerSelect = document.querySelector("#color-picker");
  const colorBoxes = document.querySelectorAll(".color-box");

  // Set up event listener for each color box in color-design
  colorBoxes.forEach((colorBox) => {
    colorBox.addEventListener("click", (event) => {
      const colorCode = event.target.dataset.colorCode;
      const colorName = event.target.dataset.colorName;
      if (colorCode && colorName) {
        setColorAndText(colorCode, colorName);
      }
    });
  });

  colorPickerSelect.addEventListener("change", (event) => {
    const newColor = event.target.value;
    const selectedPalette = COLOR_PALETTES.find(palette => palette.name === newColor);
    if (selectedPalette) {
      const colorsToShow = Object.keys(selectedPalette.colors);

      // Show the appropriate number of color boxes and set their colors
      colorBoxes.forEach((colorBox, index) => {
        if (index < colorsToShow.length) {
          const colorCode = colorsToShow[index];
          const colorName = selectedPalette.colors[colorCode];
          colorBox.style.backgroundColor = colorCode;
          colorBox.style.display = "block"; // Show the box
          colorBox.dataset.colorCode = colorCode; // Store the color code as data attribute
          colorBox.dataset.colorName = colorName; // Store the color name as data attribute
        } else {
          colorBox.style.display = "none"; // Hide the box
        }
      });

      // Clear the text of #color-name when a palette is selected
      const colorName = document.querySelector("#color-name");
      colorName.innerText = "-";
    } else {
      // If the selected color is not found in any palette, clear the color boxes
      colorBoxes.forEach(colorBox => {
        colorBox.style.backgroundColor = "transparent";
        colorBox.style.display = "none"; // Hide the box
        colorBox.removeAttribute("data-color-code"); // Remove the data attribute
        colorBox.removeAttribute("data-color-name"); // Remove the data attribute
      });

      // Clear the text of #color-name
      const colorName = document.querySelector("#color-name");
      colorName.innerText = "-";
    }
  });
};

const setColorAndText = (colorCode, colorName) => {
  let bgColor = colorCode; // El color de fondo inicial es el color seleccionado

  document.body.style.backgroundColor = bgColor;
  const colorNameElement = document.querySelector("#color-name");
  colorNameElement.innerHTML = `<span style="color: ${colorCode};">${colorName}</span> || <span style="color: ${colorCode};">${colorCode}</span>`;

  // Obtén el color de fondo del contenedor .block
  const blockElement = document.querySelector(".block");
  const blockComputedStyle = getComputedStyle(blockElement);
  const blockBgColorHex = rgbToHex(blockComputedStyle.backgroundColor);

  // Comprueba el contraste entre el color del texto y el fondo del contenedor .block
  const contrastRatio = getContrastRatio(parseColor(colorCode), parseColor(blockBgColorHex));

  if (contrastRatio < 2.5) {
    // Si el contraste es insuficiente, agrega la clase CSS para cambiar el color de fondo del contenedor #color-name
    colorNameElement.classList.add('low-contrast');
  } else {
    // Si el contraste es suficiente, remueve la clase CSS si existiera
    colorNameElement.classList.remove('low-contrast');
  }
};

addOptionsToColorPicker();
addEventListenerToColorPicker();