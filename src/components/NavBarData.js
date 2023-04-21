export const NavBarData = [
    {
        title: 'home',
        path: '/',
        icon: <i className={'fa-solid fa-house'}></i>,
        generalLink: true,
    },
    {
        title: 'search',
        path: '/search/movie',
        icon:<i className={'fa-solid fa-magnifying-glass'}></i>,
        iconSubNav:<i className={'fa-solid fa-angle-down'}></i>,
        generalLink: true,
        subNav:[
            {
                title: 'movie',
                path: '/search/movie',
                icon:<i className={'fa-solid fa-house'}></i> ,
            },
            {
                title: 'review',
                path: '/search/review',
            },
            {
                title: 'list',
                path: '/search/list',
            },
        ]
    },
    {
        title: 'add',
        path: '/add/movie',
        icon:<i className={'fa-solid fa-plus'}></i> ,
        iconSubNav:<i className={'fa-solid fa-angle-down'}></i>,
        loggedInRequired: true,
        subNav:[
            {
                title: 'movie',
                path: '/add/movie',
            },
            {
                title: 'list',
                path: '/add/list',
            },
        ]
    },
    {
        title: 'activity',
        path: '/activity',
        icon:<i className={'fa-solid fa-bolt'}></i>,
        iconSubNav:<i className={'fa-solid fa-angle-down'}></i>,
        loggedInRequired: true,
        subNav:[
            {
                title: 'you',
                path: '/activity',
            },
            {
                title: 'followed',
                path: '/activity/followed',
            },
        ]
    },
    {
        title: 'profile',
        path: '/profile',
        icon:<i className={'fa-solid fa-user'}></i>,
        loggedInRequired: true,
    },
    {
        title: 'admin panel',
        path: '/admin',
        icon:<i className={'fa-solid fa-user-gear'}></i>,
        loggedInRequired: true,
    },
    {
        title: 'log in/register',
        path: '/log_in_register',
        icon:<i className={'fa-solid fa-arrow-right-to-bracket'}></i>,
        loggedInRequired: false,
        authIconLink: true
    },
    {
        title: 'log out',
        path: '/log_out',
        icon: <i className={'fa-solid fa-arrow-right-from-bracket'}></i>,
        loggedInRequired: true,
        authIconLink: true
    }
]