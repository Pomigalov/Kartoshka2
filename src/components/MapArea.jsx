import React, {useState, useRef, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { items } from '../data/items'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function LocateButton({onLocated}){
  const map = useMap()
  const handle = ()=>{
    map.locate().on('locationfound', function(e){ map.setView(e.latlng, 13); onLocated && onLocated(e.latlng) })
  }
  return <button style={{position:'absolute',right:10,top:10,zIndex:1000}} onClick={handle} className="btn">В моем районе</button>
}

export default function MapArea({onSelect, filter}){
  const defaultCenter = [55.7512,37.6184]
  const [center, setCenter] = useState(defaultCenter)
  const [mapRef, setMapRef] = useState(null)

  useEffect(()=>{
    // if filter has center coords, set center
    if(filter && filter.center){ setCenter([filter.center.lat, filter.center.lng]); if(mapRef) mapRef.setView([filter.center.lat, filter.center.lng], 13) }
  },[filter, mapRef])

  return (
    <div className="card">
      <div className="map-wrap">
        <MapContainer center={center} zoom={13} whenCreated={setMapRef} style={{height:'100%'}}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {items.filter(it=>{
            if(filter.type && filter.type!=='all' && it.type!==filter.type) return false
            if(filter.maxPrice && it.price>filter.maxPrice) return false
            if(filter.onlyAvailable && !it.available) return false
            // if center radius filtering applied
            if(filter.center && filter.radiusKm){
              const R = 6371; const toRad = v=>v*Math.PI/180
              const dLat = toRad(it.lat - filter.center.lat)
              const dLon = toRad(it.lng - filter.center.lng)
              const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(filter.center.lat))*Math.cos(toRad(it.lat))*Math.sin(dLon/2)*Math.sin(dLon/2)
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
              const d = R*c
              if(d>filter.radiusKm) return false
            }
            return true
          }).map(it=>(
            <Marker key={it.id} position={[it.lat,it.lng]} eventHandlers={{click:()=>onSelect(it)}}>
              <Popup>
                <div style={{minWidth:180}}>
                  <strong>{it.title}</strong><br/>
                  {it.address}<br/>
                  <b>{it.price} ₽/день</b>
                </div>
              </Popup>
              <Tooltip direction="top" offset={[0,-10]} opacity={0.9}>{it.title} — {it.price}₽</Tooltip>
            </Marker>
          ))}
          <LocateButton onLocated={(latlng)=>{ if(mapRef) mapRef.setView(latlng,13); /* bubble up via filter? handled externally */ }} />
        </MapContainer>
      </div>
    </div>
  )
}
