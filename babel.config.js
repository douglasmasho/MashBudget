/**
 * This code handles the babel configuration which makes sure all the packages work as intended
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin"
    ]
  };
};
