import { getCorpusAnalytics } from "@egyptian-law/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const analytics = await getCorpusAnalytics();

  return (
    <main className="admin-main">
      <h1>Egyptian Law — Admin</h1>

      <p>Minimal HITL dashboard for corpus management.</p>

      <div className="stats-grid">
        <Stat label="Laws" value={analytics.lawCount} />

        <Stat label="Articles" value={analytics.chunkCount} />

        <Stat label="Embeddings" value={analytics.embeddingCount} />

        <Stat label="Unembedded" value={analytics.unembeddedChunks} />
      </div>

      <h2>Corpus</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th align="left">Law</th>
            <th align="left">Number</th>
            <th align="left">Year</th>
            <th align="right">Articles</th>
          </tr>
        </thead>

        <tbody>
          {analytics.laws.map((law) => (
            <tr key={law.id}>
              <td>{law.lawName}</td>
              <td>{law.lawNumber ?? "-"}</td>
              <td>{law.year ?? "-"}</td>
              <td align="right">{law._count.chunks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>

      <div className="stat-value">{value}</div>
    </div>
  );
}
