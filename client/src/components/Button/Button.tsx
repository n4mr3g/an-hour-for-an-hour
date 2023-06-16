import "./Button.css";
export default function Button({ value }: { value: string }) {
  return <button className="connect-btn">{value}</button>;
}
