import React, {useState} from 'react'
import Header from './components/Header'
import MapArea from './components/MapArea'
import Sidebar from './components/Sidebar'
import DetailModal from './components/DetailModal'

export default function App(){
  const [filter, setFilter] = useState({type:'all', maxPrice:null, onlyAvailable:false, center:null, radiusKm: null})
  const [selected, setSelected] = useState(null)

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="hero card">
          <h1>Найдите технику рядом с вами</h1>
          <p>Арендуйте или сдайте технику соседям — быстро и просто.</p>
          <div className="role-buttons">
            <a href="#map" className="btn btn-rent">Я арендую</a>
            <a href="#add" className="btn btn-lend">Я сдаю</a>
          </div>
        </div>

        <div className="grid" id="map">
          <div>
            <MapArea onSelect={setSelected} filter={filter} />
            <div className="footer-note">Тестовые данные. В будущем подключим авторизацию и оплату.</div>
          </div>
          <div>
            <Sidebar onChangeFilter={setFilter} filter={filter} />
            <div className="card" style={{marginTop:12}}>
              <h4>Список техники</h4>
              <div>
                {/* list derived from map filtering for quick browse */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailModal item={selected} onClose={()=>setSelected(null)} />
    </div>
  )
}
