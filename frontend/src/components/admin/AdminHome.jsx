export default function AdminHome() {
  return (
    <div className="container mt-5">
      <h3>User Management</h3>

      <table className="table table-dark table-striped mt-3">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>652ea...</td>
            <td>Admin</td>
            <td>admin@mail.com</td>
            <td>Admin</td>
            <td className="text-danger">DELETE</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
