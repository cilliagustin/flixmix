import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from "../Sidebar"
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test('Renders Sidebar', () => {
    render(
        <Router>
            <Sidebar />
        </Router>
    );

    // screen.debug();
    const LogInLink = screen.getByRole('link', { name: 'Log in / Register' })
    expect(LogInLink).toBeInTheDocument()
})

test('Renders link with username to the user profile for a logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <Sidebar />
            </CurrentUserProvider>
        </Router>
    );

    const ProfileLink = await screen.findByText('agustinCilli')
    expect(ProfileLink).toBeInTheDocument();
})

test('Renders Log in/Register button after log out', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <Sidebar />
            </CurrentUserProvider>
        </Router>
    );

    const LogOutLink = await screen.findByRole('link', { name: 'Log Out' })
    fireEvent.click(LogOutLink)
    const LogInLink = await screen.findByRole('link', { name: 'Log in / Register' })
    expect(LogInLink).toBeInTheDocument()
})