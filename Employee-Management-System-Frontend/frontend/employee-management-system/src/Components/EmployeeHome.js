import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

function EmployeeHome() {

    const userRole = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is an employee and disable the back button
        if (userRole === 'employee') {
          disableBackButton();
        }
    
        // Cleanup the effect when the component unmounts
        return () => {
          // Re-enable the back button when the component is unmounted
          enableBackButton();
        };
      }, [userRole]);
    
      const disableBackButton = () => {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, '', window.location.href);
        };
      };
    
      const enableBackButton = () => {
        window.onpopstate = null;
      };
    

    const handleLogout = () => {
        // Clear the isLoggedIn state and navigate to the login page
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
       //  setIsLoggedIn(false);
        navigate('/');
      };

    
    if (userRole !== 'employee') {
      return (     
         <h1>unauthrized access</h1>
      );
    }
  return (
    <div>
      This is normal employee home page.
      <button className="logout-button" onClick={handleLogout}>
            Logout
            </button>
    </div>
  )
}

export default EmployeeHome