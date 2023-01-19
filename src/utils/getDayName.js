const getDayName = (date = new Date()) => {
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export default getDayName;
