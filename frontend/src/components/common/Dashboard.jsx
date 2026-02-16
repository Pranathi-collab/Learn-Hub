export default function Dashboard() {
  const role = localStorage.getItem("role");
  return <h2>{role} Dashboard</h2>;
}
