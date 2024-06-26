import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en PrivateRoute', () => {
  
    test('Debe de mostrar el children sino está autenticado ', () => {

        Storage.prototype.setItem = jest.fn();

        const contextvalue = {
            logged: true,
            user:{
                id:'ABC',
                name: 'Amelia'
            }
        }
        render( 
            <AuthContext.Provider value={ contextvalue }>
                <MemoryRouter initialEntries={['/search?q=bathman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
         );
         
         expect(screen.getByText('Ruta privada')).toBeTruthy();
         expect( localStorage.setItem ). toHaveBeenCalledWith('lastPath','/search?q=bathman');
    });

    
})
