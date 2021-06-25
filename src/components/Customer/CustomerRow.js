import React from "react";
import { Link } from 'react-router-dom';

export default function CustomerRow({
    index,
    _id,
    ruc,
    business_name,
    firstname,
    lastname,
    phone,
    address,
}) {
    return (
        <tr>
            <td>{index}</td>
            <td>{ruc}</td>
            <td>{business_name}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>
                <Link to={`/carteras/cliente/${_id}`}>Ver</Link>
            </td>
        </tr>
    );
}
