import type { DashboardMetrics, ActivityEvent } from "@/lib/supabase";

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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function ActivityFeedItem({ event }: { event: ActivityEvent }) {
  const iconMap = {
    visitor: "👤",
    contact: "📧",
    question: "❓"
  };

  return (
    <li style={{ paddingBottom: "12px", borderBottom: "1px solid #e0e0e0" }}>
      <span>{iconMap[event.type]}</span>
      <div>
        <p style={{ margin: "0 0 4px 0", fontWeight: "500" }}>{event.title}</p>
        <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>{formatDate(event.timestamp)}</p>
      </div>
    </li>
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

      {/* Visitor Overview */}
      <section className="metrics-grid" aria-label="Visitor metrics">
        <MetricTile
          label="Total Visitors"
          value={metrics.totalVisitors.toString()}
          detail="All-time visitor count"
        />
        <MetricTile
          label="Today"
          value={metrics.todayVisitors.toString()}
          detail="Visitors today"
        />
        <MetricTile
          label="This Week"
          value={metrics.weekVisitors.toString()}
          detail="Last 7 days"
        />
        <MetricTile
          label="This Month"
          value={metrics.monthVisitors.toString()}
          detail="Last 30 days"
        />
      </section>

      {/* Contact Form Metrics */}
      <section className="metrics-grid" aria-label="Contact form metrics">
        <MetricTile
          label="Total Messages"
          value={metrics.totalMessages.toString()}
          detail="All contact submissions"
        />
        <MetricTile
          label="Unread"
          value={metrics.unreadMessages.toString()}
          detail="Messages requiring attention"
        />
        <MetricTile
          label="AI Questions"
          value={metrics.totalInteractions.toString()}
          detail="Mission Control interactions"
        />
      </section>

      {/* Latest Message */}
      {metrics.latestMessage && (
        <section className="dashboard-panel">
          <h2>Latest Message</h2>
          <article style={{ backgroundColor: "#f9f9f9", padding: "16px", borderRadius: "4px" }}>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>From:</strong> {metrics.latestMessage.name} ({metrics.latestMessage.email})
            </p>
            <p style={{ margin: "0 0 8px 0" }}>
              <strong>Subject:</strong> {metrics.latestMessage.subject}
            </p>
            <p style={{ margin: "0", whiteSpace: "pre-wrap", color: "#666" }}>
              {metrics.latestMessage.message.substring(0, 200)}
              {metrics.latestMessage.message.length > 200 ? "..." : ""}
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#999" }}>
              {formatDate(metrics.latestMessage.createdAt)}
            </p>
          </article>
        </section>
      )}

      {/* Geography */}
      <section className="dashboard-columns">
        <article className="dashboard-panel">
          <h2>Top Countries</h2>
          {metrics.topCountries.length > 0 ? (
            <div className="ranking-list">
              {metrics.topCountries.map((item) => (
                <div key={item.country} className="ranking-row">
                  <span>{item.country}</span>
                  <div>
                    <span style={{ width: `${(item.count / (metrics.topCountries[0]?.count || 1)) * 100}%` }} />
                  </div>
                  <span style={{ marginLeft: "8px", fontSize: "12px", color: "#666" }}>{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#999" }}>No geographic data available</p>
          )}
        </article>

        <article className="dashboard-panel">
          <h2>Top Cities</h2>
          {metrics.topCities.length > 0 ? (
            <div className="ranking-list">
              {metrics.topCities.map((item) => (
                <div key={item.city} className="ranking-row">
                  <span>{item.city}</span>
                  <div>
                    <span style={{ width: `${(item.count / (metrics.topCities[0]?.count || 1)) * 100}%` }} />
                  </div>
                  <span style={{ marginLeft: "8px", fontSize: "12px", color: "#666" }}>{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#999" }}>No city data available</p>
          )}
        </article>
      </section>

      {/* Recent Activity Feed */}
      <section className="dashboard-panel">
        <h2>Recent Activity</h2>
        {metrics.recentActivity.length > 0 ? (
          <ul className="event-list" style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {metrics.recentActivity.map((event) => (
              <ActivityFeedItem key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <p style={{ color: "#999" }}>No recent activity</p>
        )}
      </section>

      {/* Recent Questions */}
      {metrics.recentInteractions.length > 0 && (
        <section className="dashboard-panel">
          <h2>Recent AI Questions</h2>
          <ul className="event-list">
            {metrics.recentInteractions.map((item, idx) => (
              <li key={idx}>
                <strong>Q:</strong> {item.question}
                <p style={{ fontSize: "12px", color: "#999", margin: "4px 0 0 0" }}>
                  {formatDate(item.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
