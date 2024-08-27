export function createDate(): string {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString().slice(-2); // 年の下2桁
  const month = (`0${currentDate.getMonth() + 1}`).slice(-2); // 月は0から始まるので +1
  const day = (`0${currentDate.getDate()}`).slice(-2);

  return `${year}${month}${day}`;
}
