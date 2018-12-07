

export default [
    {
        children: [
            {
                children: [
                   {
                       title: 'BRUCE',
                       url: 'https://facebook.com',
                       id: '001'
                   },
                   {
                       title: 'PHIL',
                       url: 'www.phil.com',
                       id: '002'
                   },
                    {
                        children:[

                            {
                                title: 'BUSH',
                                url: 'www.bush.com',
                                id: '007'
                            }

                        ],

                        title: "MAYBE BOOKMARKS",
                        folder_id: '008'
                    },


               ],
                title: 'ALL BOOKMARKS',
                folder_id: '002',
                id:'006'
            },
            {
                children:[

                    {
                        title: 'BOB',
                        url: 'www.bob.com',
                        id: '007'
                    }

                ],
                title: "OTHER BOOKMARKS",
                folder_id: '003'
            }
        ],
        title: 'Main directory',
        folder_id: '001',
        id: '009'
    }

];










/*

{"web":{"client_id":"789130565798-ud616gfbsn8jv90803gvk44ltl6al47l.apps.googleusercontent.com","project_id":"crease-1543969845875","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://www.googleapis.com/oauth2/v3/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"kMbUa7Lpc8vR627vQciiAq5E","javascript_origins":["http://localhost:3000"]}}

789130565798-ud616gfbsn8jv90803gvk44ltl6al47l.apps.googleusercontent.com   secret---->    kMbUa7Lpc8vR627vQciiAq5E

*/
