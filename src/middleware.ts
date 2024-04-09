export { default } from "next-auth/middleware";
/* Dashboard path proteje todas las rutas */
export const config = {
    matcher: ['/dashboard/:path*']
}