import { getCorpusAnalytics } from "@egyptian-law/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const analytics = await getCorpusAnalytics();

  return (
    <main style={{ padding: 32 }}>
      <h1>Egyptian Law — Admin</h1>

      <p>Minimal HITL dashboard for corpus management.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginTop: 24,
          marginBottom: 32,
        }}
      >
        <Stat label="Laws" value={analytics.lawCount} />

        <Stat label="Articles" value={analytics.chunkCount} />

        <Stat label="Embeddings" value={analytics.embeddingCount} />

        <Stat label="Unembedded" value={analytics.unembeddedChunks} />
      </div>

      <h2>Corpus</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 16,
        }}
      >
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
    <div
      style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <div style={{ fontSize: 13, opacity: 0.7 }}>{label}</div>

      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginTop: 8,
        }}
      >
        {value}
      </div>
    </div>
  );
}
