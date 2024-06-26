import { render, screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en PublicRoute', () => {
    
    test('Debe de mostrar el children sino está autenticado ', () => {

        const contextvalue = {
            logged:false,
        }
        render( 
            <AuthContext.Provider value={ contextvalue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
         );

         expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('Debe de navegar si está autenticado ', () => {
        const contextvalue = {
            logged:true,
            user: {
                name:'Strider',
                id: '23'
            }
        }
        render(
            <AuthContext.Provider value={ contextvalue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />

                        <Route path='marvel' element={ <h1>Página Marvel</h1>} />

                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
         );

         expect( screen.getByText('Página Marvel')).toBeTruthy();
    
    });
})

