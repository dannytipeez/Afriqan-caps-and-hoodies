import { NextRequest, NextResponse } from "next/server";

function getBackendAdminUrl(subpath = ""): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.INTERNAL_BACKEND_URL;
  let backendBase = "http://127.0.0.1:8000";

  if (apiUrl) {
    backendBase = apiUrl.replace(/\/api\/shop\/?$/, "").replace(/\/api\/?$/, "");
  }

  const cleanBase = backendBase.replace(/\/$/, "");
  const cleanPath = subpath ? (subpath.startsWith("/") ? subpath : `/${subpath}`) : "/admin/";
  const finalPath = cleanPath.startsWith("/admin") ? cleanPath : `/admin${cleanPath}`;

  return `${cleanBase}${finalPath}`;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await context.params;
  const subpath = slug && slug.length > 0 ? `/admin/${slug.join("/")}/` : "/admin/";
  const search = request.nextUrl.search || "";
  const target = getBackendAdminUrl(`${subpath}${search}`);
  return NextResponse.redirect(target, 307);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await context.params;
  const subpath = slug && slug.length > 0 ? `/admin/${slug.join("/")}/` : "/admin/";
  const search = request.nextUrl.search || "";
  const target = getBackendAdminUrl(`${subpath}${search}`);
  return NextResponse.redirect(target, 307);
}
