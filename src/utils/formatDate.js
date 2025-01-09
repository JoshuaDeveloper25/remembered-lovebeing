function formatDate(date, dateLanguage = "english") {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = new Date(date).toLocaleDateString(
    dateLanguage === "english" ? "en-GB" : "es-ES",
    options
  );

  return formattedDate;
}

export default formatDate;
