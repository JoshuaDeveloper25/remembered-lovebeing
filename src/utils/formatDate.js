function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Date(date).toLocaleDateString("en-GB", options);

  return formattedDate;
}

export default formatDate;
