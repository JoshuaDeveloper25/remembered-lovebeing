const getDaysInMonth = (month, year) => {
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  switch (month) {
    case "January":
    case "March":
    case "May":
    case "July":
    case "August":
    case "October":
    case "December":
      return 31;
    case "April":
    case "June":
    case "September":
    case "November":
      return 30;
    case "February":
      return isLeapYear(year) ? 29 : 28;
    default:
      return 30;
  }
};

export default getDaysInMonth;
