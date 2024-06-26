import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en AppRouter', () => {

    test('Debe de mostrar el login sino está autenticado ', () => {

        const contextValue = {
            logged: false,
        }

        render( 
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>

            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);

    });

    test('Debe de mostrar el componente marven si esta autenticado ', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Amelia'
            }
        }

        render( 
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>

            </MemoryRouter>
        );
        
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);

    })
    
    
})

