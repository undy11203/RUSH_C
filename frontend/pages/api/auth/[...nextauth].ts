import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    debug: true,
    
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //   }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {label: "Username", type: "text", placeholder: "Jonh Sinima"},
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                console.log(credentials?.username);
                // return null;
                const res = await fetch("http://localhost:9000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    })
                })

                const user = await res.json();
                if(user){
                    return user;
                }else {
                    return null;
                }
            } 
        })
    ],

    pages: {
        signIn: "/auth/sign-in",
    },

    secret: "123123123"
})