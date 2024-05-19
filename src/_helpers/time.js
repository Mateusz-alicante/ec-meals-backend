const TIMEZONE_CONSTANT = -4;

export const getNextUpdateTime = () => {
  const nextUpdateTime = new Date();
  const currUTC = new Date();
  let disabledDayIndex;

  nextUpdateTime.setUTCHours(
    process.env.UPDATE_TIME.slice(0, 2) - TIMEZONE_CONSTANT
  );
  nextUpdateTime.setUTCMinutes(process.env.UPDATE_TIME.slice(2));
  nextUpdateTime.setUTCSeconds(0);
  nextUpdateTime.setUTCMilliseconds(0);

  if (nextUpdateTime.getTime() > currUTC.getTime()) {
    disabledDayIndex = currUTC.getDay() - 1;
  } else {
    disabledDayIndex = currUTC.getDay() - 2;
  }

  if (disabledDayIndex < 0) {
    disabledDayIndex = 6;
  }

  disabledDayIndex = disabledDayIndex % 7;

  console.log(disabledDayIndex);

  return [nextUpdateTime, disabledDayIndex];
};

export const todayDate = () => {
  const today = new Date();
  const newHour = today.getHours() + TIMEZONE_CONSTANT;

  if (newHour < 0) {
    today.setDate(today.getDate() - 1);
  } else {
    today.setHours(newHour);
  }

  let dayIndex = (today.getDay() - 1) % 7;

  if (dayIndex < 0) {
    dayIndex = 6;
  }

  return [today, dayIndex];
};

export const tomorrowDate = () => {
  const [tomorrow, tomorrowIndex] = todayDate();

  tomorrow.setDate(tomorrow.getDate() + 1);
  let dayIndex = (tomorrowIndex + 1) % 7;

  return [tomorrow, dayIndex];
};

export const dayString = (date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
