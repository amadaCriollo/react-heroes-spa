import { fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../../../src/ui';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate

}))

describe('Pruebas en el Navbar', () => {

    const contextValue = {
        logged: true,
        user:  {
            id:'ABC',
            name: 'Amelia O'
        },
        logout: jest.fn(),
    }

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el nombre del usuario', () => {
   
        render( 
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />  
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText('Amelia O')).toBeTruthy();
    });

    test('Debe de llamar el logout y el navigate cuando se hace click en el botón', () => {

        render( 
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />  
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});

    })
    
    
})
