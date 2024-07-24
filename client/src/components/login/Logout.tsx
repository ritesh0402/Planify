import axios from "axios"
import { useCookies } from "react-cookie";
import { useAppDispatch } from "src/redux/hooks/hook"
import { removeUser } from "src/redux/slices/userSlice"


const Logout = () => {
   const [cookie, setCookie, removeCookie] = useCookies(['userId']);
   const dispatch = useAppDispatch()
   const onClick = async () => {
      try {
         const logoutRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
         removeCookie('userId', { path: '/' });
         dispatch(removeUser())
         window.location.href = `${process.env.REACT_APP_URL}/#/app/`
         // TODO display error on screen and redirect user on success logout

      } catch (error) {
         // TODO display error on screen and redirect user on success logout
         console.log(error)
      }
   }
   return (
      <div>
         <button onClick={onClick}>Logout</button>
      </div>
   )
}

export default Logout