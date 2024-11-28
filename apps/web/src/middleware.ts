import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./libs/server";
import { DecodeTokenFetch } from "./libs/fetch/decode";

const protectedDashboard = /^\/dashboard\/.+/;
const protectedDashboardHR = /^\/dashboardHR\/.+/;
const protectedDashboardGudang = /^\/dashboardGudang\/.+/;
const protectedSuperAdmin = /^\/superAdmin\/.+/;

export async function middleware(req: NextRequest) {
    const token = await getCookie('token');
    const url = req.nextUrl.pathname;

    const isTokenValid = async (token: string | undefined) => {
        if (!token) return null
        try {
            const res = await DecodeTokenFetch(token)

            const payload = res.data.user

            if (res.status !== 200) return null
            if (!payload.id || !payload.role) return null
            return payload
        } catch (error) {
            return null
        }
    }

    const tokenValid = await isTokenValid(token?.value)

    if (!tokenValid) {
        if (url == '/dashboard' || url == '/dashboardHR' || url == '/dashboardGudang' || url == '/superAdmin' || protectedDashboard.test(url) || protectedDashboardHR.test(url) || protectedDashboardGudang.test(url) || protectedSuperAdmin.test(url)) {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }

    if (tokenValid && url == '/') {
        if (tokenValid.role == 'User') {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
        if (tokenValid.role == 'AdminHR') {
            return NextResponse.redirect(new URL('/dashboardHR', req.url))
        }
        if (tokenValid.role == 'AdminGudang') {
            return NextResponse.redirect(new URL('/dashboardGudang', req.url))
        }
        if (tokenValid.role == 'SuperAdmin') {
            return NextResponse.redirect(new URL('/superAdmin', req.url))
        }
    }

    if (protectedSuperAdmin.test(url) || url == '/superAdmin' && tokenValid.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (protectedDashboard.test(url) && tokenValid.role !== 'User' && url == '/dashboard') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (protectedDashboardHR.test(url) || url == '/dashboardHR' && tokenValid.role !== 'AdminHR' && tokenValid.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (protectedDashboardGudang.test(url) || url == '/dashboardGudang' && tokenValid.role !== 'AdminGudang' && tokenValid.role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}