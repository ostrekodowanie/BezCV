import { Route, Routes, useLocation } from "react-router"
import Home from "./pages/Home"
import Header from "./components/Header"
import Login, { User } from "./pages/Login"
import SignUp from "./pages/SignUp"
import Footer from "./components/Footer"
import PublicRoute from "./utils/PublicRoute"
import PrivateRoute from "./utils/PrivateRoute"
import Profile from "./pages/Profile"
import Verify from "./pages/signup/Verify"
import { ReactElement, useLayoutEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "./main"
import { login, logout } from "./reducers/login"
import jwtDecode from 'jwt-decode'
import Offers from "./pages/Offers"
import Contact from "./pages/Contact"
import axios from "axios"
import Loader from "./components/Loader"
import AdminRoute from "./utils/AdminRoute"
import AdminPanel from "./pages/AdminPanel"
import Points from "./pages/Points"
import getUserInfo from "./utils/getUserInfo"

const loginString: string | null = localStorage.getItem('user')
const loginFromLocalStorage = loginString && JSON.parse(loginString)

export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const timer = useRef<any>(null)
  const auth = useAppSelector(state => state.login)
  const { logged } = auth
  const { refresh } = auth.tokens

  const getUser = async () => {
    if(loginFromLocalStorage) {
      await updateToken(loginFromLocalStorage.refresh)
      return setLoading(false)
    }
    setLoading(false)
    return dispatch(logout())
  }

  const updateToken = async (token: string) => {
    await axios.post('/api/token/refresh', JSON.stringify({ refresh: token }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      let tokens = res.data
      let { id }: User = jwtDecode(tokens.access)
      localStorage.setItem('user', JSON.stringify(tokens))
      const userInfo = await getUserInfo(id, tokens.access).catch(() => dispatch(logout()))
      if(userInfo) {
        dispatch(login({
            data: { ...userInfo, id },
            tokens
        }))
      }
    })
    .catch(() => dispatch(logout()))
  }

  useLayoutEffect(() => {
    getUser()
  }, [loginFromLocalStorage])

  useLayoutEffect(() => {
    if(!logged) return
    timer.current = setTimeout(() => {
      updateToken(refresh)
    }, 600000)
    return () => clearTimeout(timer.current)
  }, [refresh])

  if(loading) return <div className="w-screen h-screen flex items-center justify-center"><Loader /></div>

  return (
    <>
      <Header />
      <main style={{minHeight: '100vh'}}>
        <ScrollTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/oferty/*" element={<PrivateRoute><Offers /></PrivateRoute>} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/logowanie/*" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/rejestracja/*" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/rejestracja/verify/*" element={<PublicRoute><Verify /></PublicRoute>} />
            <Route path='/profil' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/punkty' element={<PrivateRoute><Points /></PrivateRoute>} />
            <Route path='/administracja' element={<AdminRoute><AdminPanel /></AdminRoute>} />
          </Routes>
        </ScrollTop>
      </main>
      <Footer />
    </>
  )
}

const ScrollTop = ({ children }: { children: ReactElement }) => {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname])
  return children
}