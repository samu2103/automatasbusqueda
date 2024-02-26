import React, { useState, useEffect } from "react";
import "../style/TableSearch.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dfa, setDfa] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/data")
      .then((response) => response.json())
      .then((data) => setData(data.datas)) 
      .catch((error) => console.error("Error:", error));
  }, []);

  {
   
  }

  function createDFA(searchTerm) {
    const states = Array.from({ length: searchTerm.length + 1 }, () => ({}));
    states[0][searchTerm[0]] = 1; 
    for (let i = 1, lps = 0; i <= searchTerm.length; i++) {
      for (const char of Object.keys(states[0])) {
        states[i][char] = states[lps][char];
      }
      if (i < searchTerm.length) {
       
        states[i][searchTerm[i]] = i + 1; 
        if (searchTerm[i] === searchTerm[lps]) {
          lps++; 
        }
      }
    }
    return states; 
  }

  function searchWithDFA(dfa, text) {
    let state = 0;
    for (const char of text) {
      state = dfa[state][char] || 0; 
      if (state === dfa.length - 1) {
      }
    }
    return false; 
  }

  useEffect(() => {
  
    setDfa(createDFA(searchTerm.toLowerCase()));
  }, [searchTerm]);
  
  
const filteredData = dfa
    ? data.filter(
            (item) =>
                (item["Clave cliente"] &&
                    searchWithDFA(
                        dfa,
                        item["Clave cliente"].toString().toLowerCase()
                    )) ||
                (typeof item["   Nombre Contacto "] === 'string' &&
                    searchWithDFA(dfa, item["   Nombre Contacto "].toLowerCase())) ||
                (typeof item["Correo "] === 'string' && searchWithDFA(dfa, item["Correo "].toLowerCase())) ||
                (item["Teléfono Contacto  "] &&
                    searchWithDFA(dfa, item["Teléfono Contacto  "].toString().toLowerCase()))
        )
    : data;


  {
  
  }

  {
     
        
    
  }
  return (
    <>
      <div className="contenedor">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>
        <table className="data-table" style={{ color: 'white' }}>
          <thead>
            <tr>
              <th>CLAVE CLIENTE</th>
              <th>NOMBRE DE CONTACTO</th>
              <th>CORREO</th>
              <th>TELEFONO CONTACTO</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item["Clave cliente"]}</td>
                <td className="nombre-contacto">{item["   Nombre Contacto "]}</td>
                <td className="correo">{item["Correo "]}</td>
                <td className="telefono">{item["Teléfono Contacto  "]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
