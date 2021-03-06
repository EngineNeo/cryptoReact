import './App.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './components/Coin';

// Features to add

// Sorting stablecoins

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]); // Setting the coins from API
  const [search, setSearch] = useState(''); // Getting the user input

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    }).catch(error => console.log('An error has occured'));
  }, []);

  // As the user adds input adds to react function
  const handleChange = e => {
    setSearch(e.target.value)
  }

  // Filters through coins as user types
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


  // Return from API to display
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search"
           className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return <Coin key={coin.id}
                rank={coin.market_cap_rank}
                name={coin.name} 
                image={coin.image}
                symbol={coin.symbol}
                volume={coin.total_volume}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                marketcap={coin.market_cap}
                />;
      })}
    </div>
  );
}

export default App;
