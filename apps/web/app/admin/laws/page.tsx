import Link from "next/link";
import { listLawDocuments } from "@egyptian-law/db";

export const dynamic = "force-dynamic";

export default async function LawsPage() {
  const laws = await listLawDocuments();

  return (
    <main style={{ padding: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Laws</h1>

        <Link href="/admin/laws/new">+ Add Law</Link>
      </div>

      <table
        style={{
          width: "100%",
          marginTop: 24,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Law</th>
            <th align="left">Number</th>
            <th align="left">Year</th>
            <th align="right">Articles</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {laws.map((law) => (
            <tr key={law.id}>
              <td>{law.lawName}</td>
              <td>{law.lawNumber ?? "-"}</td>
              <td>{law.year ?? "-"}</td>

              <td align="right">{law._count.chunks}</td>

              <td align="right">
                <Link href={`/admin/laws/${law.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
