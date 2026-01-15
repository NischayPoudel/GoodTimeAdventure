import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        if (pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/wishlist', '/account/:path*'],
}