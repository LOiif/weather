export default function formValidator(city: string): boolean {
  return city !== '' && city.trim() !== '';
}
