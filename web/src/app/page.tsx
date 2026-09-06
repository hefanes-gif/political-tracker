"use client";
import { useState, useEffect } from "react";
const API = "https://political-tracker-hbsy.onrender.com";
export default function Home() {
  const [politician, setPolitician] = useState("ruto");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/metrics?politician=${politician}`);
      setData(await res.json());
    } catch (e) { alert("Engine waking up, wait 40s and Refresh"); }
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🇰🇪 Political Risk Tracker - LIVE</h1>
      <div className="flex gap-2 mb-6 flex-wrap">
        {["ruto","raila","gachagua","kalonzo"].map((p) => (
          <button key={p} onClick={() => { setPolitician(p); setTimeout(fetchData,100); }} className={`px-4 py-2 rounded capitalize ${politician===p ? "bg-white text-black" : "bg-zinc-800"}`}>{p}</button>
        ))}
        <button onClick={fetchData} className="ml-auto bg-blue-600 px-4 py-2 rounded">{loading ? "Loading..." : "Refresh"}</button>
      </div>
      {!data ? <p>Loading from {API}...</p> : (
        <div className="grid gap-4">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl">Risk Score: {data.risk_score}%</h2>
                <p className="text-sm text-zinc-400">Sentiment: {(data.sentiment*100).toFixed(0)}% | Buzz: {data.total_mentions}</p>
              </div>
              <a href={`${API}/report/${politician}`} target="_blank" className="bg-white text-black px-4 py-2 rounded font-bold">Download PDF</a>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {Object.entries(data.platforms||{}).map(([k,v]:any) => (<div key={k} className="bg-zinc-800 px-3 py-2 rounded text-sm">{k}: {v as string}</div>))}
            </div>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Headlines</h3>
            <ul className="text-sm text-zinc-300 list-disc ml-5">{data.headlines?.slice(0,5).map((h:string,i:number)=><li key={i}>{h}</li>)}</ul>
          </div>
        </div>
      )}
    </main>
  );
}