import { Navigate } from 'react-router-dom';

import { getPersonaHomeRoute } from '../config/routes';



export default function RoleHome() {

  return <Navigate to={getPersonaHomeRoute()} replace />;

}

