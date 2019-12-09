const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  const parsedBody = JSON.parse(body);
  return request(`https://ipvigilante.com/${parsedBody.ip}`);
};
const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`);
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP().then(function(body) {
    fetchCoordsByIP(body).then((body) => {
      fetchISSFlyOverTimes(body).then((body) => {
        callback(JSON.parse(body).response);
      });
    });
  });
};


module.exports = {nextISSTimesForMyLocation};