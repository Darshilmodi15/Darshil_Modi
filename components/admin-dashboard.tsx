import type { DashboardMetrics } from "@/lib/supabase";
import RecentMessages from "@/components/recent-messages";

/* ── Helpers ──────────────────────────────────────────── */

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

/* ── Bar Chart ────────────────────────────────────────── */

function BarChart({
  items,
  labelKey,
  countKey
}: {
  items: { [key: string]: any }[];
  labelKey: string;
  countKey: string;
}) {
  if (items.length === 0) {
    return <p className="no-data">No data available</p>;
  }

  const max = items[0]?.[countKey] || 1;

  return (
    <div className="bar-chart">
      {items.map((item) => (
        <div key={item[labelKey]} className="bar-row">
          <span className="bar-label" title={item[labelKey]}>
            {item[labelKey]}
          </span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${(item[countKey] / max) * 100}%` }}
            />
          </div>
          <span className="bar-count">{item[countKey]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Trend Chart (Today / Week / Month) ───────────────── */

function TrendChart({
  today,
  week,
  month
}: {
  today: number;
  week: number;
  month: number;
}) {
  const max = Math.max(today, week, month, 1);
  const rows = [
    { label: "Today", value: today },
    { label: "7 days", value: week },
    { label: "30 days", value: month }
  ];

  return (
    <div className="trend-bars">
      {rows.map((row) => (
        <div key={row.label} className="trend-row">
          <span className="trend-label">{row.label}</span>
          <div className="trend-track">
            <div
              className="trend-fill"
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
          <span className="trend-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main Dashboard ───────────────────────────────────── */

export function AdminDashboard({ metrics }: { metrics: DashboardMetrics }) {
  return (
    <main className="dashboard-shell">
      {/* Header */}
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Mission Control</p>
          <h1>Private dashboard</h1>
        </div>
        <a className="dashboard-home" href="/">
          ← View Site
        </a>
      </section>

      {/* Visitor Stats */}
      <section className="metrics-grid" aria-label="Visitor metrics">
        <MetricTile
          label="Total Visitors"
          value={metrics.totalVisitors.toLocaleString()}
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

      {/* Secondary Stats */}
      <section className="metrics-grid" aria-label="Contact metrics">
        <MetricTile
          label="Countries Reached"
          value={metrics.countriesReached.toString()}
          detail="Unique countries"
        />
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
      </section>

      {/* Latest Message + Visitor Trend */}
      <section className="dashboard-columns">
        <article className="dashboard-panel">
          <h2>Latest Message</h2>
          {metrics.latestMessage ? (
            <div className="latest-msg">
              <p className="latest-msg-meta">
                <strong>From:</strong> {metrics.latestMessage.name} ({metrics.latestMessage.email})
              </p>
              {metrics.latestMessage.subject && (
                <p className="latest-msg-meta">
                  <strong>Subject:</strong> {metrics.latestMessage.subject}
                </p>
              )}
              <p className="latest-msg-body">
                {metrics.latestMessage.message.substring(0, 200)}
                {metrics.latestMessage.message.length > 200 ? "..." : ""}
              </p>
              <p className="latest-msg-time">
                {formatDate(metrics.latestMessage.createdAt)}
              </p>
            </div>
          ) : (
            <p className="no-data">No messages yet</p>
          )}
        </article>

        <article className="dashboard-panel">
          <h2>Visitor Trend</h2>
          <TrendChart
            today={metrics.todayVisitors}
            week={metrics.weekVisitors}
            month={metrics.monthVisitors}
          />
        </article>
      </section>

      {/* Geography Charts */}
      <section className="dashboard-columns">
        <article className="dashboard-panel">
          <h2>Top Countries</h2>
          <BarChart
            items={metrics.topCountries}
            labelKey="country"
            countKey="count"
          />
        </article>

        <article className="dashboard-panel">
          <h2>Top Cities</h2>
          <BarChart
            items={metrics.topCities}
            labelKey="city"
            countKey="count"
          />
        </article>
      </section>

      {/* Recent Messages */}
      <section className="dashboard-panel">
        <h2>Recent Messages</h2>
        <RecentMessages initialMessages={metrics.recentMessages} />
      </section>
    </main>
  );
}
