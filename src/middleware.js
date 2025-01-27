import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
// import { languages } from "../i18n/settings";
// import { languages } from "@/i18n/settings";
import { fallbackLng, languages, cookieName } from "./i18n/settings";

acceptLanguage.languages(languages);
export { default } from "next-auth/middleware";
export const config = {
  // matcher: '/:lng*'
  matcher: [
    // "/:lng*",
    "/((?!api|_next/static|_next/image|assets|images/SingUp.jpg).*)",
    // "/:lng*/orders",
    // "/orders"
  ],
};
// const authToken = "next-auth.session-token";
export function middleware(req) {
  // if (
  //   req.nextUrl.pathname.includes("shopping") ||
  //   req.nextUrl.pathname.includes("privacy-policy") ||
  //   req.nextUrl.pathname.includes("our_agents")
  // ) {
  //   // const session = getServerSession(authOption);
  //   if (!req.cookies.has(authToken)) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
  // }
  // if (req.cookies.has(authToken)) {
  //   if (
  //     req.nextUrl.pathname.includes("login") ||
  //     req.nextUrl.pathname.includes("register")
  //   ) {
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/not-found";
  //     return NextResponse.redirect(url);
  //   }
  //   // return NextResponse.next();
  // }
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const queryString = req.nextUrl.search;
    return NextResponse.redirect(
      // new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
      new URL(`/${lng}${req.nextUrl.pathname}${queryString}`, req.url)

    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
