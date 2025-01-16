export const getLivedDays = (date1, date2, language) => {
  const spanishSelected = language === "es" ? "spanish" : "english";

  const diffTime = Math.abs(
    new Date(`${date1}T00:00:00Z`) - new Date(`${date2}T00:00:00Z`)
  );
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const days = diffDays % 365;

  let result = "";

  if (date1 === date2) {
    return `0 ${spanishSelected ? "días" : "dias"}`;
  }

  if (years > 0) {
    result += `${years} ${spanishSelected ? "año" : "year"}${
      years > 1 ? "s" : ""
    }`;
  }

  if (days > 0) {
    if (years > 0) {
      result += ` ${spanishSelected ? "y" : "and"} `;
    }
    result += `${days} ${spanishSelected ? "día" : "day"}${
      days > 1 ? "s" : ""
    }`;
  }

  return result;
};
