import { NextRequest,NextResponse } from "next/server"; import { getSessionToken } from "@/lib/auth/session";
const base=process.env.API_URL??"http://localhost:8000/api";
async function proxy(request:NextRequest,{params}:{params:{path:string[]}}){const token=getSessionToken();const res=await fetch(`${base}/${params.path.join('/')}${request.nextUrl.search}`,{method:request.method,headers:{Accept:'application/json','Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},body:['GET','HEAD'].includes(request.method)?undefined:await request.text()});const text=await res.text();return new NextResponse(text,{status:res.status,headers:{'Content-Type':'application/json'}});}
export {proxy as GET,proxy as POST,proxy as PUT,proxy as PATCH,proxy as DELETE};
