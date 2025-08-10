import React from 'react'
export default function Header(){ return (
  <header className="header">
    <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div className="brand"><div className="logo">К</div><div><div style={{fontWeight:700}}>Картошка</div><div style={{fontSize:12,color:'#666'}}>Аренда дачной техники между соседями</div></div></div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}><a className="btn" href="#">О нас</a></div>
    </div>
  </header>
)}