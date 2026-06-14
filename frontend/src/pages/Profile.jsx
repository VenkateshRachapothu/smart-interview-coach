import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import Card from "../components/Card";
import theme from "../styles/theme";

function Profile() {
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    best: 0,
  });

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <PageShell
      title="My Profile"
      subtitle="Manage your account information"
    >
      <Card>
        <h2
          style={{
            marginBottom: "20px",
            color: theme.text,
          }}
        >
          Profile Information
        </h2>

        <p>
          <strong>Name:</strong>{" "}
          {user.name || "N/A"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email || "N/A"}
        </p>
      </Card>

      <Card>
        <h2
          style={{
            marginBottom: "20px",
            color: theme.text,
          }}
        >
          Interview Statistics
        </h2>

        <p>
          <strong>Total Interviews:</strong>{" "}
          {stats.total}
        </p>

        <p>
          <strong>Average Score:</strong>{" "}
          {stats.average}
        </p>

        <p>
          <strong>Best Score:</strong>{" "}
          {stats.best}
        </p>
      </Card>
    </PageShell>
  );
}

export default Profile;