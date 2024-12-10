import React from 'react';

export default function MainSidebar() {
    return (
        <div className="main-sidebar" style={{ height: '75px', display: 'flex', alignItems: 'center', backgroundColor: '#0F292F' }}>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, justifyContent: 'space-between', alignItems: 'center', width: '100%', marginLeft: '100px', marginRight: '100px' }}>
                <li><img src='/log.png' alt='Logo' style={{height: '50px'}}></img></li>
                <li style={{ marginRight: 'auto', fontWeight: 'bold', fontSize: '36px' }}>
                    RUSH
                    <span style={{ color: '#A49FEF' }}>C</span>
                </li>
                <li style={{ marginLeft: 'auto', marginRight: '20px', fontSize: '16px', border: '3px solid #A49FEF', padding: '5px', borderRadius: '20px' }}>Вход</li>
                <li style={{ marginLeft: '20px', fontSize: '16px', backgroundColor: '#A49FEF', color: 'black', padding: '5px', borderRadius: '20px' }}>Регистрация</li>
                <li><img src='/default-icon.png' alt='Logo' style={{height: '44px'}}></img></li>
            </ul>
        </div>
    );
}
