import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../style/InicioSesion.css";

function InicioSesion() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones
        if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
            Swal.fire('Error', 'El correo no es válido', 'error');
            return;
        }

        if (!password || password.length < 8 || password.length > 15 || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)) {
            Swal.fire('Error', 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un dígito, no espacios en blanco, un carácter especial y debe ser de 8 a 15 caracteres de longitud', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo,
                    password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire('Error', errorData.msg, 'error');
                return;
            }

            const data = await response.json();
            console.log(data);

            Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');

            navigate('/tableSearch');
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
            <div id="form-ui">
                <form onSubmit={handleSubmit} id="form">
                    <div id="form-body">
                        <div id="welcome-lines">
                            <div id="welcome-line-1">Automas register</div>
                            <div id="welcome-line-2">Bienvenidos </div>
                        </div>
                        <div id="input-area">
                            <div className="form-inp">
                                <input placeholder="Correo Électronico" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                            </div>
                            <div className="form-inp">
                                <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div id="submit-button-cvr">
                            <button id="submit-button" type="submit">Enviar</button>
                        </div>
                        <div id="forgot-pass">
                            <Link to="/registro">Registro</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
     );
}

export default InicioSesion;

///////////////////////////////
//          USUARIO 1        // 
//                           //
//                           //
//221245@ids.upchiapas.edu.mx//
//                           //
//       Nanioelcacas13@     //
///////////////////////////////


///////////////////////////////
//         USUARIO 2         // 
//                           //
//                           //
//manoloarduino13@hotmail.com//
//                           //
//         Manolo13"         //
///////////////////////////////

