import React from 'react'
export default function Sidebar({onChangeFilter, filter}){
  const types = ['all','Газонокосилка','Триммер','Мотоблок','Лестница','Генератор']
  return (
    <div className="card">
      <h3>Фильтры</h3>
      <div className="filters">
        <select className="select" value={filter.type} onChange={e=>onChangeFilter({...filter,type:e.target.value})}>
          {types.map(t=>(<option key={t} value={t}>{t}</option>))}
        </select>
        <input type="number" placeholder="Макс цена" value={filter.maxPrice||''} onChange={e=>onChangeFilter({...filter,maxPrice: e.target.value? Number(e.target.value): null})} />
      </div>
      <div style={{marginTop:8}}>
        <label><input type="checkbox" checked={filter.onlyAvailable||false} onChange={e=>onChangeFilter({...filter, onlyAvailable: e.target.checked})} /> Только доступные</label>
      </div>
      <div style={{marginTop:12}}>
        <label>Радиус (км)<br/><input type="number" value={filter.radiusKm||''} onChange={e=>onChangeFilter({...filter, radiusKm: e.target.value? Number(e.target.value): null})} /></label>
      </div>
      <div style={{marginTop:12}}>
        <button className="btn" onClick={()=>onChangeFilter({...filter, center:null})}>Сбросить радиус</button>
      </div>
    </div>
  )
}
