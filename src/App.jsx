import { useEffect, useState } from 'react';
import {
  HashRouter,
  NavLink,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const malayaliNames = [
  'Aadhya Nair',
  'Arjun Menon',
  'Devika Pillai',
  'Adithyan Kurup',
  'Meera Warrier',
  'Nikhil Varma',
  'Anjali Kumar',
  'Vivek Namboothiri',
  'Lakshmi Das',
  'Rohan Mathew',
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark app-navbar">
      <div className="container nav-inner">
        <NavLink to="/" className="navbar-brand brand">
          <span className="brand-mark" aria-hidden="true">EP</span>
          <span>Employee Portal</span>
        </NavLink>
        <div className="navbar-nav ms-auto flex-row">
          <NavLink to="/" end className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }>
            Home
          </NavLink>
          <NavLink to="/employee-form" className={({ isActive }) =>
            `nav-link ${isActive ? 'active' : ''}`
          }>
            Employee Form
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Could not load employee data.');
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load employees. Check your internet connection and try again.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadEmployees();
    return () => controller.abort();
  }, []);

  return (
    <main className="container page-container">
      <div className="page-heading">
        <p className="eyebrow">WELCOME TO</p>
        <h1>Employee Dashboard</h1>
        <p className="page-subtitle">
          View the list of employees fetched from an external API.
        </p>
      </div>

      <section className="content-card" aria-label="Employee list">
        <div className="section-topline">
          <div>
            <h2 className="section-title">All employees</h2>
            <p className="section-note">Employee information from JSONPlaceholder</p>
          </div>
          {!loading && !error && (
            <span className="count-pill">{employees.length} employees</span>
          )}
        </div>

        {loading && (
          <div className="state-message">
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            Loading employees…
          </div>
        )}

        {error && (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
            <button
              type="button"
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table employee-table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col" className="id-column">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="id-cell">{employee.id.toString().padStart(2, '0')}</td>
                    <td>
                      <div className="employee-name">
                        {malayaliNames[employee.id - 1] ?? employee.name}
                      </div>
                    </td>
                    <td className="email-cell">{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className="page-footnote">A simple overview of your people, all in one place.</p>
    </main>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Assignment requirement: do not send form data to an API.
    setSubmitted(true);
    setForm({ name: '', designation: '', location: '', salary: '' });
  }

  return (
    <main className="container page-container form-page">
      <div className="form-intro">
        <p className="eyebrow">ADD NEW</p>
        <h1>Employee Form</h1>
        <p className="page-subtitle">Enter the employee details below.</p>
        <div className="mini-stat">
          <span className="mini-stat-dot" />
          <span>Employee information</span>
        </div>
      </div>

      <section className="content-card form-card">
        <div className="section-topline form-card-heading">
          <div>
            <h2 className="section-title">Employee details</h2>
            <p className="section-note">All fields are required.</p>
          </div>
          <span className="form-icon" aria-hidden="true">＋</span>
        </div>

        {submitted && (
          <div className="alert alert-success success-message" role="status">
            Form submitted successfully. No data was sent to a server.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              className="form-control"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter employee name"
              autoComplete="name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="designation" className="form-label">Designation</label>
            <input
              id="designation"
              className="form-control"
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="e.g. Software Developer"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              className="form-control"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Kochi, Kerala"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="form-label">Salary (₹)</label>
            <input
              id="salary"
              className="form-control"
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              min="0"
              step="0.01"
              required
            />
          </div>

          <button className="btn submit-button w-100" type="submit">
            Submit details <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="app-footer">
          <span>Employee Portal</span>
          <span>Simple. Clear. Organized.</span>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
