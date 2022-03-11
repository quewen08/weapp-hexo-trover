import Taro from '@tarojs/taro';

export const setStorageSync = (key, value) => {
  try {
    Taro.setStorageSync(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const setStorageItem = (key, item) => {
  const arr = getStorageSync(key) || [];
  if (arr.indexOf(item) < 0) {
    arr.push(item);
    setStorageSync(key, arr);
  }
};

export const removeStorageSync = (key) => {
  try {
    Taro.removeStorageSync(key);
  } catch (e) {
    console.error(e);
  }
};

export const getStorageSync = (key) => {
  try {
    const value = Taro.getStorageSync(key);
    if (value) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};
