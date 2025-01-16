function formatDateJourney(inputDate, language) {
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

  const monthsSpanish = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  if (!inputDate) {
    return language === "es" ? "Fecha desconocida" : "Unknown date";
  }

  const [year, month, day] = inputDate.split("-");

  // Obtén el nombre del mes dependiendo del idioma
  const monthName =
    language === "es"
      ? monthsSpanish[parseInt(month) - 1]
      : months[parseInt(month) - 1];

  // Devuelve la fecha en el formato deseado
  if (language === "es") {
    return `${parseInt(day)} de ${monthName} de ${year}`;
  }

  // Para otros idiomas, usa el formato tradicional en inglés
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
