import React, { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [tenants, setTenants] = useState([
    { id: 1, name: "Tenant A", plan: "Premium" },
    { id: 2, name: "Tenant B", plan: "Basic" }
  ]);

  const [users] = useState([
    { id: 1, name: "John Doe", role: "Admin", tenant: "Tenant A" },
    { id: 2, name: "Jane Smith", role: "User", tenant: "Tenant B" }
  ]);

  const [newTenant, setNewTenant] = useState({
    name: "",
    plan: "Basic"
  });

  const addTenant = () => {
    if (!newTenant.name) return;
    setTenants([
      ...tenants,
      { id: tenants.length + 1, ...newTenant }
    ]);
    setNewTenant({ name: "", plan: "Basic" });
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("tenants")}>Tenants</li>
          <li onClick={() => setActivePage("users")}>Users</li>
        </ul>
      </aside>

      <main className="content">
        {activePage === "dashboard" && (
          <div>
            <h1>Admin Dashboard</h1>
            <div className="stats">
              <div className="card">
                <h3>Total Tenants</h3>
                <p>{tenants.length}</p>
              </div>
              <div className="card">
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
            </div>
          </div>
        )}

        {activePage === "tenants" && (
          <div>
            <h1>Manage Tenants</h1>

            <div className="form">
              <input
                type="text"
                placeholder="Tenant Name"
                value={newTenant.name}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, name: e.target.value })
                }
              />
              <select
                value={newTenant.plan}
                onChange={(e) =>
                  setNewTenant({ ...newTenant, plan: e.target.value })
                }
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
              <button onClick={addTenant}>Add Tenant</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Plan</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td>{tenant.id}</td>
                    <td>{tenant.name}</td>
                    <td>{tenant.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activePage === "users" && (
          <div>
            <h1>Users</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Tenant</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.tenant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;