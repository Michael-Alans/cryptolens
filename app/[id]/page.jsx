import Image from "next/image";
import Link from "next/link";

export default async function CurrencyDetailPage({ params }) {
  const { id } = params;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
    { next: { revalidate: 60 } } // Revalidate every minute
  );
  const currency = await res.json();

  return (
    <div className="detail-container">
      {/* Header Section */}
      <div className="coin-header">
        <div className="coin-identity">
          <Image
            src={currency.image.large}
            alt={`${currency.name} logo`}
            width={64}
            height={64}
            className="coin-logo"
          />
          <div>
            <h1>{currency.name} <span>({currency.symbol.toUpperCase()})</span></h1>
            <p className="coin-rank">Rank #{currency.market_cap_rank}</p>
          </div>
        </div>
        <Link href="/" className="back-button">← Back to Market</Link>
      </div>

      {/* Price Section */}
      <div className="price-section">
        <div className="current-price">
          <h2>${currency.market_data.current_price.usd.toLocaleString()}</h2>
          <span className={`price-change ${currency.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
            {currency.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
          </span>
        </div>
        <div className="price-range">
          <span>24h Range: ${currency.market_data.low_24h.usd.toLocaleString()} - ${currency.market_data.high_24h.usd.toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Market Cap</h3>
          <p>${currency.market_data.market_cap.usd.toLocaleString()}</p>
          <p className="secondary-stat">
            {currency.market_data.market_cap_change_percentage_24h.toFixed(2)}% (24h)
          </p>
        </div>

        <div className="stat-card">
          <h3>Volume (24h)</h3>
          <p>${currency.market_data.total_volume.usd.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Circulating Supply</h3>
          <p>{currency.market_data.circulating_supply?.toLocaleString() || 'N/A'} {currency.symbol.toUpperCase()}</p>
        </div>

        <div className="stat-card">
          <h3>All-Time High</h3>
          <p>${currency.market_data.ath.usd.toLocaleString()}</p>
          <p className="secondary-stat">
            {currency.market_data.ath_change_percentage.usd.toFixed(2)}% from ATH
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="info-sections">
        <section className="description">
          <h3>About {currency.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: currency.description?.en || 'No description available.' }}></p>
        </section>

        <section className="links">
          <h3>Links</h3>
          <div className="links-grid">
            {currency.links.homepage.filter(Boolean).map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                Official Website {i > 0 ? i + 1 : ''}
              </a>
            ))}
            {currency.links.blockchain_site.filter(Boolean).map((link, i) => (
              <a key={`blockchain-${i}`} href={link} target="_blank" rel="noopener noreferrer">
                Blockchain Explorer {i + 1}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}