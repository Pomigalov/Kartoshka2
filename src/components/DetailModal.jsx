import React from 'react'
export default function DetailModal({item,onClose}){
  if(!item) return null
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>{item.title}</h3>
        <div className="detail-photos">{item.images.map((src,i)=>(<img key={i} src={src} alt="" />))}</div>
        <p><b>Цена:</b> {item.price} ₽/день</p>
        <p><b>Адрес:</b> {item.address}</p>
        <p>{item.available? 'Доступно' : 'Сейчас занято'}</p>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="btn btn-rent" onClick={()=>{ alert('Заявка на бронирование (заглушка)') }}>Забронировать</button>
          <button className="btn" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}
