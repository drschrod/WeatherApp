import { PermissionsAndroid } from "react-native";
const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Access to User's location",
          message:
            "Required for fetching accurate weather data",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location access granted");
      } else {
        console.log("Location access denied");
      }
    } catch (err) {
      console.warn(err);
    }
};

module.exports = {
    requestLocationPermission
  };