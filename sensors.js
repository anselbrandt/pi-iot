const nodeimu = require("nodeimu");
const IMU = new nodeimu.IMU();

(async function main() {
  try {
    function getSensorData() {
      return new Promise(function(resolve, reject) {
        IMU.getValue(function(err, data) {
          if (err !== null) reject(err);
          else resolve(data);
        });
      });
    }
    const data = await getSensorData();
    const headingToDegree = heading => {
      return (heading * 180) / Math.PI;
    };
    const headingCorrection = (heading, offset) => {
      if (typeof offset === "undefined") offset = 0;
      const declinationAngle = -14.14;
      heading += declinationAngle + offset;
      if (heading < 0) heading += 2 * Math.PI;
      if (heading > 2 * Math.PI) heading -= 2 * Math.PI;
      return heading;
    };
    data.tiltHeading = headingCorrection(data.tiltHeading, Math.PI / 2);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();

