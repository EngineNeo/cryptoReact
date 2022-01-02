import './App.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './components/Coin';

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(error => alert('An error occured'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().uncludes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search"
           className="coin-input" />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return <Coin key={coin.id} 
                name={coin.name} 
                image={coin.image}
                symbol={coin.symbol}
                volume={coin.market_cap}
                price={coin.price}
                />;
      })}
    </div>
  );
}

export default App;
