const nodeimu = require("nodeimu");
const IMU = new nodeimu.IMU();
const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

async function getData() {
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
    data.tiltHeading = headingToDegree(
      headingCorrection(data.tiltHeading, Math.PI / 2)
    );
    return data;
  } catch (error) {
    return error;
  }
}

(async () => {
  try {
    let sensorData = [];
    for (let i = 0; i < 501; i++) {
      setTimeout(async () => {
        const newData = await getData();
        sensorData.push(newData);
        if (i === 500) {
          console.log("writing to file...");
          await writeFile("data.json", JSON.stringify(sensorData));
        }
      }, 10 * i);
    }
  } catch (error) {
    console.log(error);
  }
})();

