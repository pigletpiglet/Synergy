import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const api_base_url = 'http://localhost:8082';
interface GoogleOauthResponse {
  credential?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginGoogleSuccess = (response: GoogleOauthResponse) => {
    console.log('response google success:', response);

    // TODO: integrate with backend to save user google credential
    // If user is valid, save the token and redirect to home page
  };


  return (
    <div className='grid grid-cols-6'>
      <div className='col-span-4'>
        <img src="" alt="Empty Image" />
      </div>
      <div className='col-span-2 m-auto'>
        <img src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' className='w-[60px] pt-8'>
        </img>
        <p className='text-2xl font-bold py-8'>Welcome Admin BCR</p>

        <form>
          <p>
            Email :
          </p>
          <input
            className='my-2'
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
            placeholder='Masukkan email'
          />
          <br></br>
          <br></br>
          <p>
            Password :
          </p>
          <input
            className='my-2'

            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            type='password'
            placeholder='Masukkan password'
          />
          <br></br>
          <br></br>

          <button
            className='text-center text-white bg-blue-800 w-100 px-10'
            onClick={async (e) => {
              e.preventDefault();

              const payload = {
                email: email,
                password: password,
              };

              const response = await fetch(
                api_base_url + '/api/auth/login',
                {
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                }
              );

              const responseJson = await response.json();

              if (response.status !== 200) {
                alert('error: ' + responseJson.message);
              }

              localStorage.setItem(
                'access_token',
                responseJson.data.access_token
              );

              // If login succeed, redirect ke home
              navigate('/dashboard');
            }}
          >
            Login
          </button>
        </form>
        <GoogleOAuthProvider clientId="123659816620-04dnj8n1aqk9sj1aktka339djvtj5mtq.apps.googleusercontent.com" >
          <GoogleLogin onSuccess={handleLoginGoogleSuccess} />;

        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
