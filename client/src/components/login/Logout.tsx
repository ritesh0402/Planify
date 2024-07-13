import axios from "axios"


const Logout = async () => {
   const onClick = async () => {
      try {
         const logoutRes = axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
         // TODO display error to user and redirect user on success logout

      } catch (error) {
         // TODO display error to user and redirect user on success logout
         console.log(error)
      }
   }
}

export default Logout