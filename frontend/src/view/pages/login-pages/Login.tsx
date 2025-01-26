import React from 'react'

const Login = () => {
  return (
    <div>
        <button onClick={() => {
            window.location.replace('http://localhost:3000/api/auth/google');
        }} type="button" className='add-user-btn'>Google Login</button>
    </div>
  )
}

export default Login