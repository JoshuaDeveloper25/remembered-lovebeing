export const getHowLongDied = (deathDate) => {
  const death = new Date(deathDate);
  const today = new Date();
  let years = today.getFullYear() - death.getFullYear();
  const deathMonthDay = `${death.getMonth()}-${death.getDate()}`;
  const todayMonthDay = `${today.getMonth()}-${today.getDate()}`;

  if (todayMonthDay < deathMonthDay) {
    years -= 1;
  }

  return years;
};
