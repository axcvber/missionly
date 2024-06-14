import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/select-org(.*)', '/organization(.*)', '/board(.*)', '/api/cards(.*)'])

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url })
  }

  if (auth().userId && !isProtectedRoute(req)) {
    let path = '/select-org'

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`
    }

    const orgSelection = new URL(path, req.url)

    return NextResponse.redirect(orgSelection)
  }

  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== '/select-org') {
    const orgSelection = new URL('/select-org', req.url)
    return NextResponse.redirect(orgSelection)
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
