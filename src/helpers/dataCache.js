import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (value, key) => {
  try {
    console.log(`STORING DATA in ${key}`);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('DATA STORED');
  } catch (e) {
    console.error('Cache data store error: ', e);
    console.error(e);
  }
};

const getData = async (key) => {
  try {
    console.log(key);
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Cache data fetch error: ', e);
    clearAll();
    return null;
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.error('Cache clear error: ', e);
  }

  console.log('Done.');
};

// Generates a key based on the hour month day, which is unique enough to store an hours data
const generateKey = () => {
  const date = new Date();
  return `${date.getHours()}${date.getMonth()}${date.getDate()}`;
};

module.exports = {
  getData,
  storeData,
  generateKey,
  clearAll,
};
