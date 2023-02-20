const arrayString = (arr) => {
  if (arr.length !== 0) {
    if (arr.length === 1) {
      return `"${arr[0]}"`;
    } else {
      let str = "";
      arr.forEach((item) => {
        str += `"${item}",`;
      });
      return str.slice(0, -1);
    }
  } else {
    return "";
  }
};

const firstIndexfromstring = ([first]) => first.toLowerCase();

module.exports = { firstIndexfromstring, arrayString };
