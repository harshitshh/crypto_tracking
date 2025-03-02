import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCryptoPrices = async () => {
  console.log("Fetching new data...");
  const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,cardano,solana&vs_currencies=usd");
  console.log("New Data:", data);
  return data;
};


export default function Home() {
  const { data, error, isLoading, refetch } = useQuery("cryptoPrices", fetchCryptoPrices);
  const [search, setSearch] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  const filteredData = Object.keys(data).filter(coin => coin.includes(search.toLowerCase()));

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Crypto Price Tracker</h1>
      <input
        type="text"
        placeholder="Search crypto..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      <button onClick={refetch} style={{ marginLeft: "10px", padding: "5px" }}>
        Refresh
      </button>
      <ul>
        {filteredData.map((coin) => (
          <li key={coin} style={{ listStyle: "none", margin: "10px 0" }}>
            <strong>{coin.toUpperCase()}</strong>: ${data[coin].usd}
          </li>
        ))}
      </ul>
    </div>
  );
}
