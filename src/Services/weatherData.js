export const getWeather = async (query, isSelectedDegree, isSelectedWind, isSelectedPrecipitation, signal) => {
  try {
    const cleanQuery = query.trim();

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1`, { signal }
    );
    if (!geoRes.ok) throw new Error("Failed to reach the location service");

    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`No results found`);
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,relative_humidity_2m,weather_code` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=auto` +
      `&temperature_unit=${isSelectedDegree ? "celsius" : "fahrenheit"}` +
      `&wind_speed_unit=${isSelectedWind ? "kmh" : "mph"}` +
      `&precipitation_unit=${isSelectedPrecipitation ? "mm" : "inch"}`, { signal }
    );
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data");

    const weather = await weatherRes.json();
    return { name, country, ...weather };
  }
  catch (err) {
    // Network failures throw TypeError with no useful message
    if (err instanceof TypeError) {
      throw new Error("Network error — please check your connection");
    }
    throw err;
  }
};

export const searchPlaces = async (query) => {
  if (!query || query.trim().length < 3) return [];
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`
    );
    if (!geoRes.ok) return [];
    const geoData = await geoRes.json();
    return geoData.results || [];
  } catch {
    return [];
  }
};
