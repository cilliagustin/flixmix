export const NavBarData = [
    {
        title: 'home',
        path: '/',
        icon: 'fa-solid fa-house',
    },
    {
        title: 'search',
        path: '/search/movie',
        icon: 'fa-solid fa-magnifying-glass',
        iconCloseded: 'fa-solid fa-caret-down',
        iconOpened: 'fa-solid fa-caret-open',
        subNav:[
            {
                title: 'movie',
                path: '/search/movie',
                icon: 'fa-solid fa-house',
            },
            {
                title: 'review',
                path: '/search/review',
                icon: 'fa-solid fa-house',
            },
            {
                title: 'list',
                path: '/search/list',
                icon: 'fa-solid fa-house',
            },
        ]
    },
    {
        title: 'add',
        path: '/add/movie',
        icon: 'fa-solid fa-plus',
        iconCloseded: 'fa-solid fa-caret-down',
        iconOpened: 'fa-solid fa-caret-open',
        subNav:[
            {
                title: 'movie',
                path: '/add/movie',
                icon: 'fa-solid fa-house',
            },
            {
                title: 'list',
                path: '/add/list',
                icon: 'fa-solid fa-house',
            },
        ]
    },
    {
        title: 'activity',
        path: '/activity',
        icon: 'fa-solid fa-bolt',
        iconCloseded: 'fa-solid fa-caret-down',
        iconOpened: 'fa-solid fa-caret-open',
        subNav:[
            {
                title: 'movie',
                path: '/activity',
                icon: 'fa-solid fa-house',
            },
            {
                title: 'followed',
                path: '/activity/followed',
                icon: 'fa-solid fa-house',
            },
        ]
    },
    {
        title: 'profile',
        path: '/profile',
        icon: 'fa-solid fa-user',
    },
    {
        title: 'admin panel',
        path: '/admin',
        icon: 'fa-solid fa-user-gear',
    },
    {
        title: 'log in/register',
        path: '/log_in_register',
        icon: 'fa-solid fa-arrow-right-to-bracket',
    },
    {
        title: 'log out',
        path: '/log_out',
        icon: 'fa-solid fa-arrow-right-from-bracket',
    },
]