const bodyOutPut = (code, msg, data) => {
  if (data) {
    return {
      code,
      msg,
      data,
    };
  } else {
    return {
      code,
      msg,
    };
  }
};

module.exports = {
  bodyOutPut,
};
