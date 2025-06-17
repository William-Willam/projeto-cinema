//Descrição do arquivo: Este é o ponto de entrada principal da aplicação React, 
//onde o roteamento é configurado e os componentes principais são renderizados.
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Importando os arquivos da pasta Pages
import Home from "./Pages/Home";

// Descrição do arquivo: Este é o ponto de entrada principal da aplicação React,
// onde o roteamento é configurado e os componentes principais são renderizados.
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}