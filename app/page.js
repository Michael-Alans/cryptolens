import Homepage from "./components/Homepage";

export default async function Page() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true", {
  cache: 'no-store'
});


  const currencies = await res.json();

  return <Homepage currencies={currencies} />;
}
