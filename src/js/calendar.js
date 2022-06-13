function calendar(year, month) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 100 === 0 && year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) days[1] = 29;
    const date = new Date(`${year}-${month}-01`);
    const lastMonth = month === 1 ? 12 : month - 1;
    const countDay = days[month - 1];
    const countLastDay = days[lastMonth - 1];
    const calendarArr = [['日', '一', '二', '三', '四', '五', '六']];
    const weekDay = date.getDay();
    let count = 0;
    let nextCount = 1;
    for (let i = 1; i < 6; i++) {
        calendarArr[i] ??= [];
        for (let j = 0; j < 7; j++) {
            if (i === 1 && j < weekDay) {
                calendarArr[i][j] = countLastDay - weekDay + j + 1 + '';
            } else if (count < countDay) {
                count++;
                calendarArr[i][j] = count < 10 ? '0' + count : count + '';
            } else {
                calendarArr[i][j] = nextCount < 10 ? '0' + nextCount : nextCount + '';
                nextCount++;
            }
        }
        if (count === countDay) break;
    }
    return calendarArr;
}

console.log(calendar(2022, 6));
[
    ['日', '一', '二', '三', '四', '五', '六'],
    ['29', '30', '31', '01', '02', '03', '04'],
    ['05', '06', '07', '08', '09', '10', '11'],
    ['12', '13', '14', '15', '16', '17', '18'],
    ['19', '20', '21', '22', '23', '24', '25'],
    ['26', '27', '28', '29', '30', '01', '02']
];
