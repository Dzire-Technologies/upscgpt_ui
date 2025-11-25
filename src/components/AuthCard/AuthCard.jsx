import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input/Input'
import style from './AuthCard.module.css'
import googleLogo from 'src/assets/logo/googleLogo.svg'
import { startGoogleLogin } from "src/services/Auth";
const AuthCard = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      await startGoogleLogin(); // will redirect (so this function doesn't return)
    } catch (err) {
      console.error("Google login start failed:", err);
      toast.error(err?.message || "Failed to start Google login");
      setLoading(false);
    }
  };

   return (
    <div className={style.AuthCardWrap}>
      {/* Keep any local email/password UI if present */}
      <div style={{ marginBottom: 12 }}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>
      <div style={{ marginBottom: 12 }}>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </div>

      <Button onClick={() => { /* keep existing email/password flow if needed */ }}>
        {isSignUp ? "Sign up" : "Sign in"}
      </Button>

      <div className={style.IdpDivider}>
        <p> or </p>
      </div>

      <div className={style.LoginGoogle} onClick={handleGoogleClick} role="button" tabIndex={0}>
        <img src={googleLogo} alt={"google logo"} />
        <span>Login with Google</span>
      </div>
    </div>
  );
};

// const AuthCard = () => {
//   const [isSignUp, setIsSignUp] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleAuth = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/`
//           }
//         })
        
//         if (error) {
//           console.error('Sign up error:', error)
//           toast.error(error.message)
//         } else {
//           toast.success('Check your email for confirmation link!')
//         }
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password
//         })
        
//         if (error) {
//           console.error('Sign in error:', error)
//           toast.error(error.message)
//         } else {
//           toast.success('Welcome back!')
//         }
//       }
//     } catch (error) {
//       console.error('Authentication error:', error)
//       toast.error('An error occurred during authentication')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const IdpLoginService = async () => {

//     const provider = 'google'
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider,
//       options: {
//         redirectTo: `${window.location.origin}/`,
//       },
//     })
    
//   }

//   return (
//     <div className={style.AuthCard}>
//       <div className={style.AuthCardHeader}>
//         <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
//         <p>{isSignUp ? 'Create your account' : 'Welcome back'}</p>
//       </div>
      
//       <form onSubmit={handleAuth} className={style.AuthForm}>
//         <div className={style.FormGroup}>
//           <Input
//             type="email"
//             label="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className={style.FormGroup}>
//           <Input
//             type="password"
//             label="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className={style.FormGroup}>
//           <Button
//             type="submit"
//             buttonType="submit"
//             disabled={loading}
//             className={style.AuthButton}
//           >
//             {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
//           </Button>
//         </div>
//       </form>
      
//       <div className={style.AuthToggle}>
//         <p>
//           {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
//           <button
//             type="button"
//             onClick={() => setIsSignUp(!isSignUp)}
//             className={style.ToggleButton}
//           >
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </button>
//         </p>
//       </div>

//       <div className={style.IdpDivider}>
//         <p> or </p>
//       </div>

//       <div className={style.LoginGoogle} onClick={() => IdpLoginService()}>
//                     <img src={googleLogo} alt={'google logo'} />
//                     <span>Login with Google</span>
//       </div>
//     </div>
//   )
// }

export default AuthCard;
