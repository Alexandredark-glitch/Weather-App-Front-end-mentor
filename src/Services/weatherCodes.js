
import Drizzle from "../../assets/images/icon-drizzle.webp";
import Rain from "../../assets/images/icon-rain.webp";
import Snow from "../../assets/images/icon-snow.webp";
import Storm from "../../assets/images/icon-storm.webp";
import Sunny from "../../assets/images/icon-sunny.webp";
import Fog from "../../assets/images/icon-fog.webp";
import Overcast from "../../assets/images/icon-overcast.webp";
import PartlyCloudy from "../../assets/images/icon-partly-cloudy.webp";

export const getWeatherIcon = (code) => {
  switch (code) {
    case 0:
      return Sunny;
    case 1:
      return Sunny;
    case 2:
      return PartlyCloudy;
    case 3:
      return Overcast;
    case 45:
    case 48:
      return Fog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return Drizzle;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return Rain;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return Snow;
    case 95:
    case 96:
    case 99:
      return Storm;
    default:
      return PartlyCloudy; // Safe fallback
  }
};