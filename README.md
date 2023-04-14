# Density Altitude

This function will calculate the Density Altitude (DA) from the given weather conditions for your drag racing runs.

### Usage:

Input weather data example:

```
const weather = {
  temperature: 12.18, // C
  pressure: 1020, // hPa
  humidity: 89, // %
  altitude: 175, // m
};
```

Result:

```
getDA(weather.temperature, weather.pressure, weather.humidity, weather.altitude); //94
```
