export default function numberFormatter(value: number) {
  return new Intl.NumberFormat("ru").format(value);
}
