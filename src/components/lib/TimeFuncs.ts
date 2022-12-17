export interface ITime {
  time: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  dayMonthYear: string;
}

export function getToday() {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();

  return {
    time: {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    },
    dayMonthYear: currentDate,
  };
}