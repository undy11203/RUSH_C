import Link from "next/link";

export default function Home() {
  return (
    <div style={{display: 'flex', padding: '40px'}}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '20px', paddingTop: '100px'}}>
        <p style={{ 
          textAlign: 'left',
          fontSize: '48px', 
          alignSelf: 'flex-start',
          lineHeight: '58.09px',
          marginLeft: '20px'
        }}>
          C для всех — начни свой путь к программированию
        </p>

        <br />
        <p style={{ 
          textAlign: 'right', 
          width: '100%', 
          fontSize: '28px', 
          color: '#7D7B9B',
          maxWidth: '460px',
          alignSelf: 'flex-end',
          marginRight: '20px',
          lineHeight: '40px',
          marginBottom: '20px'
        }}>
          Изучайте модули,<br />
          практикуйтесь и становитесь <br />
          профессионалом.
        </p>
        <Link href="/catalog" style={{ 
          width: '460px', 
          height: '104px', 
          color: 'white', 
          fontSize: '38px', 
          padding: '5px', 
          borderRadius: '50px', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
          border: '3px solid #A49FEF',
          alignSelf: 'flex-end',
          marginRight: '20px'
        }}>
          Начать обучение
        </Link>
      </div>
      <div style={{ flex: 1 }}>
        <img src="/computer.png" style={{height: '612px'}} alt="Computer" />
      </div>
    </div>
  );
}