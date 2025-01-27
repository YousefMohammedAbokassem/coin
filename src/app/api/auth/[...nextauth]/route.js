    import NextAuth from 'next-auth'
    import CredentialsProvider from 'next-auth/providers/credentials'


    export const authOptions = {
        
        providers: [
            CredentialsProvider({
                name: "Credentials",
                async authorize(credentials) {

                    
                    const payload = {
                        phone: credentials.phone,
                        password: credentials.password,
                        fcm_token: credentials.fcm_token
                    }



                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/login`, {
                        method: "POST",
                        body: JSON.stringify(payload), 
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await res.json()


                    if(!res.ok){
                        throw new Error(data.message)
                    }
                    if(res.ok && data){
                        return data
                    }
                    return null
                }
                
            })
        ],
        pages: "/account/login/recover",
        session:{
            strategy:"jwt"
        },
        callbacks: {
            async jwt({token, user}){
                return {...token, ...user}
            },
            async session({session, token, user}){
                session.user = token
                return session
            },
            async redirect({ url, baseUrl }) {
                // Allows relative callback URLs
                if (url.startsWith("/")) return `${baseUrl}${url}`
                // Allows callback URLs on the same origin
                else if (new URL(url).origin === baseUrl) return url
                return baseUrl
            }
        }
    }

    const handler = NextAuth(authOptions)

    export { handler as GET, handler as POST }