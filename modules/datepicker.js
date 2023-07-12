export function initializeDatepicker() {
  const field = document.getElementById("datepicker");
  const picker = new Pikaday({
    minDate: new Date(1923, 12, 31),
    maxDate: new Date(),
    field: field,
    toString(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
  });
}
