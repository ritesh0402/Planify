import axios from "axios"
import { useAppDispatch } from "src/redux/hooks/hook"
import { removeUser } from "src/redux/slices/userSlice"


const Logout = () => {
   const dispatch = useAppDispatch()
   const onClick = async () => {
      try {
         const logoutRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
         console.log(logoutRes)
         dispatch(removeUser())
         window.location.href = `${process.env.REACT_APP_URL}/#/app/`
         // TODO display error to user and redirect user on success logout

      } catch (error) {
         // TODO display error to user and redirect user on success logout
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