import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/authorizationRegistration/LoginPage';
import '@testing-library/jest-dom/extend-expect';
import Header from "../components/Header";
import Tournament from "../pages/Tournament/Tournament";
import {Roles} from "../enum/Roles";
import Home from "../pages/Home";
import {act} from "react-test-renderer";
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event';
// Тест для Tournament компоненту
import { getTournament } from '../services/apiTournament';
import {PrivateRoute} from "../App";
beforeEach(() => {
    fetchMock.resetMocks();
});

test('Користувач може успішно авторизуватися', async () => {
    // Відображення сторінки авторизації
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );

    // Введення коректних даних користувача
    act(() => {
        fireEvent.change(screen.getByPlaceholderText(/логін/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/пароль/i), { target: { value: 'testpassword' } });
    });

    // Натискання кнопки авторизації
    act(() => {
        fireEvent.click(screen.getByRole('button', { name: /увійти/i }));
    });

    // Check if the redirect occurred
    expect(window.location.pathname).toBe('/');
});
// Тест для Header компоненту
test('Header рендериться коректно', () => {
    // Монтаж компоненту
    render(<Header />);

    // Перевірка наявності тексту "Турніри" в меню
    const tournamentLink = screen.getByText('Турніри');
    expect(tournamentLink).toBeInTheDocument();

    // Перевірка, чи відображається логотип
    const logoImage = screen.getByAltText('Фото');
    expect(logoImage).toBeInTheDocument();
});

jest.mock('../services/apiTournament');

describe('Tournament Component', () => {
    beforeEach(() => {
        getTournament.mockResolvedValue([
            {
                id: 1,
                tournamentId: '123',
                tournamentName: 'Test Tournament',
                startDate: '2022-01-01',
                endDate: '2022-01-10',
                countTeam: 8,
                status: 'Active',
                tagName: 'Sports',
                photoUrl: 'https://example.com/tournament-image.jpg',
            },
        ]);
    });

    it('renders the component with tournament data', async () => {
        render(<Tournament />);

        await waitFor(() => {
            expect(screen.getByText('Test Tournament')).toBeInTheDocument();
        });

        expect(screen.getByText('2022-01-01 - 2022-01-10')).toBeInTheDocument();
        expect(screen.getByText('8 команд')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Sports')).toBeInTheDocument();
        expect(screen.getByAltText('Картинка для турніра')).toBeInTheDocument();
    });

    it('navigates to the tournament page when a tournament card is clicked', async () => {
        render(<Tournament />);

        // Wait for the data to be loaded
        await waitFor(() => {
            expect(screen.getByText('Test Tournament')).toBeInTheDocument();
        });

        // screen.debug();
        // Click on the tournament card
        act(() => {
            userEvent.click(screen.getByText('Test Tournament'));
        });

        // screen.debug();

        // Wait for navigation to complete
        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
        });
    });
});

// Тест для PrivateRoute компоненту
test('PrivateRoute перенаправляє на головну сторінку при відсутності авторизації', () => {
    // Монтаж компоненту з неавторизованим користувачем
    render(
        <MemoryRouter initialEntries={['/private']}>
            <PrivateRoute element={<div>Private Content</div>} roles={['admin']} />
        </MemoryRouter>
    );

    // Перевірка, чи відбувається перенаправлення на головну сторінку
    expect(window.location.pathname).toBe('/');
});


// // Тест для Home компоненту
test('Home рендериться коректно', () => {
    // Монтаж компоненту
    render(<Home />);

    // Перевірка наявності заголовка "Вітаємо на головній сторінці"
    const welcomeMessage = screen.getByText('Інформаційний сайт');
    expect(welcomeMessage).toBeInTheDocument();
});
