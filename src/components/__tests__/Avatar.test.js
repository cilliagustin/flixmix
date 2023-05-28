import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from "react-dom/test-utils";
import Avatar from "../Avatar"
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { userData } from '../../mocks/handlers';

jest.mock("../../contexts/CurrentUserContext", () => ({
    CurrentUserProvider: ({ children }) => <div>{children}</div>,
  }));


test('Avatar component is rendered', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <Avatar src={userData.profile_image} height={100} id={userData.profile_id} username={null} />
            </CurrentUserProvider>
        </Router>
    );

    await act(async () => {
        const avatarElement = await screen.findByAltText('avatar');
        expect(avatarElement).toBeInTheDocument();
      });
});

test('Avatar component link has correct URL', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <Avatar src={userData.profile_image} height={100} id={userData.profile_id} username={null} />
            </CurrentUserProvider>
        </Router>
    );

    await act(async () => {
        const avatarLink = await screen.findByRole('link');
        expect(avatarLink).toHaveAttribute('href', `/profiles/2`);
      });
});

test('Avatar component image has correct src', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <Avatar src={userData.profile_image} height={100} id={userData.profile_id} username={null} />
            </CurrentUserProvider>
        </Router>
    );

    await act(async () => {
        const avatarElement = await screen.findByAltText('avatar');
        expect(avatarElement).toHaveAttribute('src', "https://res.cloudinary.com/dbyls36jn/image/upload/v1/media/../default_profile_i0yy2i");
      });
});
