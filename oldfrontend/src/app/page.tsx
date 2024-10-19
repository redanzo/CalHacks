"use client"
import Login from './pages/login'

export default () => {
  if (!localStorage.getItem("flex-token")) return <Login />
  else return <></>
}
