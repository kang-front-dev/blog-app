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
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const currentDate = `${day}/${month}/${date.getFullYear()}`;
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
