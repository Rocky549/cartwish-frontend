import React, { useEffect } from 'react'
import { logout } from '../../services/userServices';

const Logout = () => {
    useEffect(()=>{
       //localStorage.removeItem('token');
       logout();
       window.location="/";
    },[])
 return null;
}

export default Logout