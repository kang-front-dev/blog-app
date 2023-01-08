import { IComment } from "../components/classes/ReviewClass";

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
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const currentDate = `${day}/${month}/${date.getFullYear()}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return {
    time: {
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    },
    dayMonthYear: currentDate,
  };
}

export function getTimeWeight(timeProps: ITime) {
  const time = timeProps.time;
  const dayMonthYear = timeProps.dayMonthYear.split('/');
  const day = Number(dayMonthYear[0]);
  const month = Number(dayMonthYear[1]);
  const year = Number(dayMonthYear[2]);

  const isLeap = year % 4 === 0 ? true : false;
  let days: number = 0;
  days += day;
  const monthsHave31 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let i = 0; i < year; i++) {
    if (i % 4 === 0) {
      days += 366;
    } else {
      days += 365;
    }
  }
  for (let i = 0; i < month - 1; i++) {
    if (!isLeap) {
      days += monthsHave31[i];
    } else {
      if (i === 1) {
        days += 29;
      }
    }
  }
  const timeWeight =
    days * 24 * 60 * 60 +
    Number(time.hours) * 60 * 60 +
    Number(time.minutes) * 60 +
    Number(time.seconds);
  return timeWeight;
}

export function checkCommentDate(commentInfo:IComment){
  const currentDate = getToday();
  const currentDayWeight =
    Number(currentDate.time.hours) * 60 * 60 +
    Number(currentDate.time.minutes) * 60 +
    Number(currentDate.time.seconds);

  const currentDateWeight = getTimeWeight(currentDate);
  const commentDateWeight = getTimeWeight(commentInfo.date);
  let resultDate =
    currentDateWeight - commentDateWeight < currentDayWeight
      ? 'today'
      : 'yesterday';
  if (
    currentDateWeight - commentDateWeight >
    currentDayWeight * 2
  ) {
    resultDate = commentInfo.date.dayMonthYear;
  }
  return resultDate
}