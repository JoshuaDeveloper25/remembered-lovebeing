function formatDateJourney(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!inputDate) {
    return "Unknown date";
  }

  const [year, month, day] = inputDate.split("-");

  // --> conver the month to name of it and set the index
  const monthName = months[parseInt(month) - 1];

  // obtain the correct sufix of the day
  const daySuffix = (day) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${monthName} ${parseInt(day)}${daySuffix(parseInt(day))}, ${year}`;
}

export default formatDateJourney;
