import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { UserService } from '../../services';
import { DriverEdit, MechanicEdit } from '..';

const UserType = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {

        const fetchUser = async () => {
             const respone = await UserService.handleWorkerDetails(id)
             setUser(respone);
        }
      fetchUser();
    }, [id])

    if (!user.role) {
        return <div>Ładowanie...</div>;
    }

    if (user.role === "DRIVER") {
        return <DriverEdit driver={user} />;
    }
    
    if (user.role === "MECHANIC") {
        return <MechanicEdit mechanic={user} />;
    }

    return <div>Nieznana rola użytkownika</div>;
}

export default UserType