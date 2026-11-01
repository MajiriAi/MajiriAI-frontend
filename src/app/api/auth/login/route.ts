import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth/session";
const base = process.env.API_URL ?? "http://localhost:8000/api";
export async function POST(request: NextRequest) {
  const res = await fetch(`${base}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:await request.text()});
  const data = await res.json();
  if(!res.ok) return NextResponse.json(data,{status:res.status});
  const response = NextResponse.json({user:data.user});
  response.cookies.set(SESSION_COOKIE, data.token, sessionCookieOptions());
  return response;
}
