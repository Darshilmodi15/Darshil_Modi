import { dashboardStaticData, missions } from "@/lib/portfolio-data";
import type { DashboardMetrics } from "@/lib/supabase";

function MetricTile({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

export function AdminDashboard({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Mission Control</p>
          <h1>Private dashboard</h1>
        </div>
        <a className="dashboard-home" href="/">
          View Site
        </a>
      </section>

      <section className="metrics-grid" aria-label="Dashboard metrics">
        <MetricTile
          label="Visitors"
          value={metrics.visitors.toString()}
          detail="Live visitor count from Supabase."
        />
        <MetricTile
          label="Countries"
          value={metrics.countries.length.toString()}
          detail={metrics.countries.length ? metrics.countries.join(", ") : "No country data available."}
        />
        <MetricTile
          label="Contact Messages"
          value={metrics.contactMessages.toString()}
          detail="Live contact form submissions stored in Supabase."
        />
        <MetricTile
          label="AI Interactions"
          value={metrics.aiInteractions.toString()}
          detail="Recent Mission Control question events."
        />
      </section>

      <section className="dashboard-columns">
        <article className="dashboard-panel">
          <h2>Traffic</h2>
          <div className="traffic-chart">
            {dashboardStaticData.traffic.map((item) => (
              <div key={item.label} className="traffic-bar">
                <span style={{ height: `${item.value}%` }} />
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2>Popular Missions</h2>
          <div className="ranking-list">
            {dashboardStaticData.popularProjects.map((item) => (
              <div key={item.label} className="ranking-row">
                <span>{item.label}</span>
                <div>
                  <span style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-columns">
        <article className="dashboard-panel">
          <h2>Assistant Interactions</h2>
          <ul className="event-list">
            {metrics.recentInteractions.length > 0 ? (
              metrics.recentInteractions.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>No recent AI interactions recorded.</li>
            )}
          </ul>
        </article>

        <article className="dashboard-panel">
          <h2>Research Log Analytics</h2>
          <ul className="analytics-list">
            {dashboardStaticData.blogAnalytics.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="dashboard-panel">
        <h2>Mission Inventory</h2>
        <div className="inventory-grid">
          {missions.map((mission) => (
            <article key={mission.slug}>
              <span>{mission.number}</span>
              <strong>{mission.title}</strong>
              <p>{mission.status}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
