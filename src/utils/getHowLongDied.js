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


// export const getLivedDays = (date1, date2) => {
//   const diffTime = Math.abs(new Date(`${date1}T00:00:00Z`) - new Date(`${date2}T00:00:00Z`));
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   const years = Math.floor(diffDays / 365);
//   const days = diffDays % 365;

//   let result = "";

//   if (date1 === date2) {
//     return `0 days ago`;
//   }

//   if (years > 0) {
//     result += `${years} year${years > 1 ? "s" : ""}`;
//   }

//   if (days > 0) {
//     if (years > 0) {
//       result += " and ";
//     }
//     result += `${days} day${days > 1 ? "s" : ""}`;
//   }

//   result += " ago";

//   return result;
// };