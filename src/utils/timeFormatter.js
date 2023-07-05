const timeFormatter = {
  getString: (time) => {
    const date = new Date(time * 1000).toISOString().slice(14, 19);
    return date;
  },
  getSeconds: (str) => {
    if (!str) return 0;
    const [mm, ss] = str.split(":");
    const time = Number(mm) * 60 + Number(ss);
    return time;
  },
};

export default timeFormatter;
