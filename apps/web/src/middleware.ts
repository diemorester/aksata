import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from './libs/server';
import { DecodeTokenFetch } from './libs/fetch/decode';

const protectedDashboard = /^\/dashboard(\/[^\/]+)?$/;
const protectedDashboardHR = /^\/dashboardHR(\/[^\/]+)?$/;
const protectedDashboardGudang = /^\/dashboardGudang(\/[^\/]+)?$/;
const protectedSuperAdmin = /^\/superAdmin(\/[^\/]+)?$/;

export async function middleware(req: NextRequest) {
  const token = await getCookie('access_token');
  const url = req.nextUrl.pathname;

  // Pengecekan tokennya valid atau ngga
  const isTokenValid = async (token: string | undefined) => {
    if (!token) return null;
    try {
      const res = await DecodeTokenFetch(token);

      const payload = res.data.user;

      if (res.status !== 200) return null;
      if (!payload.id || !payload.role) return null;
      return payload;
    } catch (error) {
      return null;
    }
  };

  const tokenValid = await isTokenValid(token?.value);

  // Kalo tokennya ga valid, atau udah expired dan lagi ada di page yang di protect bakal diarahin ke "/"
  if (!tokenValid) {
    if (
      protectedDashboard.test(url) ||
      protectedDashboardHR.test(url) ||
      protectedDashboardGudang.test(url) ||
      protectedSuperAdmin.test(url)
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Kalo tokennya valid bakal ngejalanin kondisi dibawah
  if (tokenValid) {
    const { role } = tokenValid;

    // Protect untuk superadmin kalo mau ke "/dashboard"
    if (protectedDashboard.test(url) || url === '/dashboard') {
      if (role === 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Protect untuk rolenya bukan user,
    if (protectedDashboard.test(url)) {
      if (role !== 'User') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Protect untuk yang rolenya bukan AdminHr dan SuperAdmin
    if (protectedDashboardHR.test(url)) {
      if (role !== 'AdminHR' && role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Protect untuk yang rolenya bukan AdminGudang dan SuperAdmin
    if (protectedDashboardGudang.test(url)) {
      if (role !== 'AdminGudang' && role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Protect untuk yang rolenya bukan SuperAdmin
    if (protectedSuperAdmin.test(url)) {
      if (role !== 'SuperAdmin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Kalo si user mau ke "/" tpi punya token valid bakal diarahkan ke dasboard masing2
    if (url === '/') {
      if (role == 'User') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      if (role == 'AdminHR') {
        return NextResponse.redirect(new URL('/dashboardHR', req.url));
      }
      if (role == 'AdminGudang') {
        return NextResponse.redirect(new URL('/dashboardGudang', req.url));
      }
      if (role == 'SuperAdmin') {
        return NextResponse.redirect(new URL('/superAdmin', req.url));
      }
    }
  }

  return NextResponse.next();
}
