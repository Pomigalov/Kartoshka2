export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Kartoshka — аренда дачной техники</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="/rent" style={btnStyle}>Я арендую</a>
        <a href="/lend" style={btnStyle}>Я сдаю</a>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '1rem 2rem',
  background: '#ff7f50',
  color: 'white',
  borderRadius: '10px',
  textDecoration: 'none',
  fontSize: '1.2rem',
  fontWeight: 'bold'
};
