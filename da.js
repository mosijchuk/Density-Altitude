//Get D/A
function getDA(temperature, pressure, humidity, altitude) {
  const calcDensity = function (vp, tempc) {
    const Rv = 461.4964;
    const Rd = 287.0531;
    const tk = tempc + 273.15;
    const pv = vp * 100;
    const w1 = 0.190263;
    const w2 = 8.417286e-5;
    const w3 = 6369e3;
    const hm = (w3 * altitude) / (w3 + altitude);
    const pressureHpa = Math.pow(Math.pow(pressure, w1) - w2 * hm, 1 / w1);
    const pd = (pressureHpa - vp) * 100;
    const density = pv / (Rv * tk) + pd / (Rd * tk);
    return density;
  };

  const calcDensityAltitude = function (density) {
    const g = 9.80665;
    const Po = 101325;
    const To = 288.15;
    const L = 6.5;
    const R = 8.31432;
    const M = 28.9644;
    const D = density * 1000;
    const ac = 6369e3;
    const p2 = ((L * R) / (g * M - L * R)) * Math.log((R * To * D) / (M * Po));
    const H = -(To / L) * (Math.exp(p2) - 1);
    const alt = H * 1000;
    return (ac * alt) / (ac - alt);
  };

  const tempDpc =
    (243.04 *
      (Math.log(humidity / 100) +
        (17.625 * temperature) / (243.04 + temperature))) /
    (17.625 -
      Math.log(humidity / 100) -
      (17.625 * temperature) / (243.04 + temperature));

  const calcVaporPressure = function (temp) {
    const psi = 6.1078;
    const q1 = 0.99999683;
    const q2 = -0.90826951e-2;
    const q3 = 0.78736169e-4;
    const q4 = -0.61117958e-6;
    const q5 = 0.43884187e-8;
    const q6 = -0.29883885e-10;
    const q7 = 0.21874425e-12;
    const q8 = -0.17892321e-14;
    const q9 = 0.11112018e-16;
    const q10 = -0.30994571e-19;
    const pl =
      q1 +
      temp *
        (q2 +
          temp *
            (q3 +
              temp *
                (q4 +
                  temp *
                    (q5 +
                      temp *
                        (q6 +
                          temp *
                            (q7 + temp * (q8 + temp * (q9 + temp * q10))))))));
    return psi / Math.pow(pl, 8);
  };

  const vp = calcVaporPressure(tempDpc);
  const density = calcDensity(vp, temperature);
  const da_m = calcDensityAltitude(density);

  return da_m.toFixed();
}

//Weather data
const weather = {
  temperature: 12.18, // C
  pressure: 1020, // hPa
  humidity: 89, // %
  altitude: 175, // m
};

//Result log
console.log(
  "D/A",
  getDA(
    weather.temperature,
    weather.pressure,
    weather.humidity,
    weather.altitude
  )
);
