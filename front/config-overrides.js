const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@app": path.resolve(__dirname, "src/app"),
    "@shared": path.resolve(__dirname, "src/shared"),
    "@entities": path.resolve(__dirname, "src/entities"),
    "@features": path.resolve(__dirname, "src/features"),
    "@widgets": path.resolve(__dirname, "src/widgets"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@styles": path.resolve(__dirname, "src/styles"),
  };

  return config;
};
