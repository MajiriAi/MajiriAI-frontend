import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth/session";
import { API_BASE_URL } from "@/lib/api/base-url";
export async function POST(request: NextRequest) {
  const res = await fetch(`${API_BASE_URL}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:await request.text()});
  const data = await res.json();
  if(!res.ok) return NextResponse.json(data,{status:res.status});
  const response = NextResponse.json({user:data.user});
  response.cookies.set(SESSION_COOKIE, data.token, sessionCookieOptions());
  return response;
}
