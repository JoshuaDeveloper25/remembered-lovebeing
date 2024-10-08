export const getLivedDays = (date1, date2) => {
  const diffTime = Math.abs(new Date(`${date1}T00:00:00Z`) - new Date(`${date2}T00:00:00Z`));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const days = diffDays % 365;

  let result = "";

  if (date1 === date2) {
    return `0 days`;
  }

  if (years > 0) {
    result += `${years} year${years > 1 ? "s" : ""}`;
  }

  if (days > 0) {
    if (years > 0) {
      result += " and ";
    }
    result += `${days} day${days > 1 ? "s" : ""}`;
  }

  return result;
};