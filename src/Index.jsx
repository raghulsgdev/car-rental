import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Index() {

    const navigate = useNavigate()

    return (
        <div className='landingPage'>
            <main className='landingSection'>
                <button className='adminBtn' onClick={() => navigate('/adminlogin')}>
                    <span class="material-symbols-outlined">
                        shield_person
                    </span>
                    ADMIN
                </button>
                <button className='userBtn' onClick={() => navigate('/userlogin')}>
                    <span class="material-symbols-outlined">
                        groups
                    </span>
                    USER
                </button>
            </main>
        </div>
    )
}

export default Index