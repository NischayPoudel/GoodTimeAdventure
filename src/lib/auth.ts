import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { MongoClient } from 'mongodb'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ [Auth] Missing credentials')
          return null
        }

        let client = null
        try {
          console.log('🔍 [Auth] Starting authorization for:', credentials.email)
          
          let mongoUrl = process.env.MONGODB_URI
          if (!mongoUrl) {
            mongoUrl = 'mongodb+srv://GoodTimeAdventure:goodtime123@cluster0.b2tjnpz.mongodb.net/goodtime-adventure?appName=Cluster0'
          }

          console.log('📡 [Auth] Connecting to MongoDB...')
          client = new MongoClient(mongoUrl)
          await client.connect()
          console.log('✅ [Auth] Connected to MongoDB')
          
          // Use the default database from the connection URI (which is goodtime-adventure)
          const db = client.db()
          console.log('📚 [Auth] Using database from connection URI')
          
          // List all collections to debug
          const collections = await db.listCollections().toArray()
          console.log('📋 [Auth] Available collections:', collections.map(c => c.name))
          
          const searchEmail = credentials.email.toLowerCase().trim()
          console.log('🔎 [Auth] Searching for email:', searchEmail)
          
          const user = await db.collection('users').findOne({ 
            email: searchEmail
          })
          
          if (!user) {
            const allUsers = await db.collection('users').find({}).toArray()
            const userCount = await db.collection('users').countDocuments()
            console.log('❌ [Auth] User not found')
            console.log('📝 [Auth] Total users count:', userCount)
            console.log('📝 [Auth] All users in database:', allUsers.map(u => ({ 
              email: u.email, 
              hasPasswordHash: !!u.passwordHash,
              role: u.role 
            })))
            return null
          }

          console.log('✅ [Auth] User found:', user.email)

          const isValid = await bcryptjs.compare(
            credentials.password,
            user.passwordHash
          )

          console.log('🔐 [Auth] Password valid:', isValid)

          if (!isValid) {
            console.log('❌ [Auth] Password mismatch')
            return null
          }

          console.log('✅ [Auth] Authorization successful')

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('❌ [Auth] Error:', error)
          return null
        } finally {
          if (client) {
            await client.close()
            console.log('✅ [Auth] MongoDB connection closed')
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin-login',
  },
}