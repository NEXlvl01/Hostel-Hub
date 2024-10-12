import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/user/getUser ')
        .then(response => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        })
        .catch(error => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated || (user && !allowedRoles.includes(user?.role))) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
