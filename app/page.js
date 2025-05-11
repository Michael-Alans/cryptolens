import Image from "next/image";
import Link from "next/link";


export default async function Homepage() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true");
  const currencies = await res.json();

  const currencyElm = currencies.map(currency => (
    <Link href={currency.id} key={currency.id}>
      <div className="crypto-card" >
      <div className="card-header">
        <Image 
          src={currency.image} 
          alt={`${currency.name} logo`}
          width={48}
          height={48}
          className="coin-logo"
        />
        <div className="coin-titles">
          <h3 className="coin-name">{currency.name}</h3>
          <span className="coin-symbol">{currency.symbol.toUpperCase()}</span>
        </div>
        <span className={`price-change ${currency.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
          {currency.price_change_percentage_24h >= 0 ? '↑' : '↓'} {Math.abs(currency.price_change_percentage_24h).toFixed(2)}%
        </span>
      </div>

      <div className="card-body">
        <div className="price-section">
          <span className="current-price">${currency.current_price.toLocaleString()}</span>
          <div className="market-stats">
            <span>MCap: ${(currency.market_cap / 1000000000).toFixed(2)}B</span>
            <span>Vol: ${(currency.total_volume / 1000000).toFixed(2)}M</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  ));

  return (
    <main className="crypto-dashboard">
      <h1 className="dashboard-title">Cryptocurrency Market</h1>
      <div className="cards-grid">
        {currencyElm}
      </div>
    </main>
  );
}