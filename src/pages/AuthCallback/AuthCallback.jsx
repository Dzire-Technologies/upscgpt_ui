import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForUser, getBackendToken } from 'src/services/Auth';
import { storeToken } from 'src/store/authStore';


const AuthCallback = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        (async () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            if (!code) throw new Error('No code provided by Google');
            const userInfo = await exchangeCodeForUser(code);
            const token = userInfo.data.x_token;
            // const email = userInfo.email || userInfo.data?.email;
            // const name = userInfo.name || userInfo.data?.name;
            // const profile_pic = userInfo.picture || userInfo.profile_pic || userInfo.data?.picture;


            // const { token } = await getBackendToken({ email, name, profile_pic });
            // if (!token) throw new Error('Token not returned from backend /login');


            // persist in zustand + localStorage (compat with existing code)
            storeToken(token);
            localStorage.setItem('x_token', token);


            navigate('/preview'); // kicks to PreviewRedirect -> /preview/:uuid/chat
        } catch (err) {
        console.error(err);
            setError(err.message || String(err));
        } finally {
            setLoading(false);
        }
        })();
    }, [navigate]);


    if (loading) return <div style={{padding:20}}>Signing in…</div>;
    if (error) return <div style={{padding:20,color:'red'}}>Sign-in failed: {error}</div>;
    return null;
};


export default AuthCallback;

