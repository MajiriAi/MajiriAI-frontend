import { NextResponse } from "next/server"; import { SESSION_COOKIE,getSessionToken } from "@/lib/auth/session";
import { API_BASE_URL } from "@/lib/api/base-url";
export async function POST(){const token=getSessionToken();if(token)await fetch(`${API_BASE_URL}/auth/logout`,{method:'POST',headers:{Authorization:`Bearer ${token}`,Accept:'application/json'}});const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:0});return response;}
