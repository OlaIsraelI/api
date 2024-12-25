const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 9000);
};

module.exports = generateOtp; 