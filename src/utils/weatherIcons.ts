/**
 * Maps weather codes to corresponding weather icon file names
 * Based on the weather code chart provided and available icons in public/assets/images/
 */
export function getWeatherIcon(weatherCode: number): string {
  const iconMap: Record<number, string> = {
    // Clear sky
    0: '/assets/images/icon-sunny.webp',

    // Mainly clear, partly cloudy, and overcast
    1: '/assets/images/icon-sunny.webp', // Mainly clear
    2: '/assets/images/icon-partly-cloudy.webp', // Partly cloudy
    3: '/assets/images/icon-overcast.webp', // Overcast

    // Fog and depositing rime fog
    45: '/assets/images/icon-fog.webp',
    48: '/assets/images/icon-fog.webp',

    // Drizzle: Light, moderate, and dense intensity
    51: '/assets/images/icon-drizzle.webp',
    53: '/assets/images/icon-drizzle.webp',
    55: '/assets/images/icon-drizzle.webp',

    // Freezing Drizzle: Light and dense intensity
    56: '/assets/images/icon-drizzle.webp',
    57: '/assets/images/icon-drizzle.webp',

    // Rain: Slight, moderate and heavy intensity
    61: '/assets/images/icon-rain.webp',
    63: '/assets/images/icon-rain.webp',
    65: '/assets/images/icon-rain.webp',

    // Freezing Rain: Light and heavy intensity
    66: '/assets/images/icon-rain.webp',
    67: '/assets/images/icon-rain.webp',

    // Snow fall: Slight, moderate, and heavy intensity
    71: '/assets/images/icon-snow.webp',
    73: '/assets/images/icon-snow.webp',
    75: '/assets/images/icon-snow.webp',

    // Snow grains
    77: '/assets/images/icon-snow.webp',

    // Rain showers: Slight, moderate, and violent
    80: '/assets/images/icon-rain.webp',
    81: '/assets/images/icon-rain.webp',
    82: '/assets/images/icon-rain.webp',

    // Snow showers slight and heavy
    85: '/assets/images/icon-snow.webp',
    86: '/assets/images/icon-snow.webp',

    // Thunderstorm: Slight or moderate
    95: '/assets/images/icon-storm.webp',

    // Thunderstorm with slight and heavy hail
    96: '/assets/images/icon-storm.webp',
    99: '/assets/images/icon-storm.webp',
  };

  return iconMap[weatherCode] || '/assets/images/icon-sunny.webp'; // Default to sunny if code not found
}

/**
 * Gets weather description based on weather code
 */
export function getWeatherDescription(weatherCode: number): string {
  const descriptionMap: Record<number, string> = {
    0: 'Clear sky icon',
    1: 'Mainly clear icon',
    2: 'Partly cloudy icon',
    3: 'Overcast icon',
    45: 'Fog icon',
    48: 'Depositing rime fog icon',
    51: 'Light drizzle icon',
    53: 'Moderate drizzle icon',
    55: 'Dense drizzle icon',
    56: 'Light freezing drizzle icon',
    57: 'Dense freezing drizzle icon',
    61: 'Slight rain icon',
    63: 'Moderate rain icon',
    65: 'Heavy rain icon',
    66: 'Light freezing rain icon',
    67: 'Heavy freezing rain icon',
    71: 'Slight snow fall icon',
    73: 'Moderate snow fall icon',
    75: 'Heavy snow fall icon',
    77: 'Snow grains icon',
    80: 'Slight rain showers icon',
    81: 'Moderate rain showers icon',
    82: 'Violent rain showers icon',
    85: 'Slight snow showers icon',
    86: 'Heavy snow showers icon',
    95: 'Thunderstorm icon',
    96: 'Thunderstorm with slight hail icon',
    99: 'Thunderstorm with heavy hail icon',
  };

  return descriptionMap[weatherCode] || 'Unknown weather condition';
}
