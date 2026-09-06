"use client";
import { useState, useEffect } from "react";
const API = "https://political-tracker-hbsy.onrender.com";
export default function Home() {
  const [politician, setPolitician] = useState("ruto");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try { const r = await fetch(`${API}/metrics?politician=${politician}`); setData(await r.json()); } catch {}
    setLoading(false);
  };
  useEffect(()=>{ fetchData(); },[]);
  return (
    <main className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🇰🇪 Political Tracker LIVE</h1>
      <div className="flex gap-2 mb-4">
        {["ruto","raila","gachagua","kalonzo"].map(p=><button key={p} onClick={()=>{setPolitician(p); setTimeout(fetchData,100)}} className={`px-3 py-1 rounded capitalize ${politician===p?'bg-white text-black':'bg-zinc-800'}`}>{p}</button>)}
        <button onClick={fetchData} className="ml-auto bg-blue-600 px-3 py-1 rounded">{loading?'...':'Refresh'}</button>
      </div>
      {!data ? <p>Connecting to {API}...</p> : <div className="bg-zinc-900 p-4 rounded"><p>Risk: {data.risk_score}%</p><p>Sentiment: {data.sentiment}</p><a href={`${API}/report/${politician}`} target="_blank" className="underline text-blue-400">Download PDF</a></div>}
    </main>
  );
}