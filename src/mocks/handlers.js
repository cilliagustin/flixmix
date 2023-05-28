const baseURL = "https://agustin-cilli-flixmix-api.herokuapp.com/"
import { rest } from 'msw'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                "pk": 2,
                "username": "agustinCilli",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 2,
                "profile_image": "https://res.cloudinary.com/dbyls36jn/image/upload/v1/media/../default_profile_i0yy2i"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
]