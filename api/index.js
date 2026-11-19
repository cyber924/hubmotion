import fs from 'node:fs';
import path from 'node:path';
import worker from '../worker/entry.js';

const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
const directory=path.join(process.cwd(),'public');
globalThis.ASSETS=Object.fromEntries(fs.readdirSync(directory).filter(name=>types[path.extname(name)]).map(name=>[name,{type:types[path.extname(name)],body:fs.readFileSync(path.join(directory,name),'utf8')} ]));

export default async function handler(req,res){
 try{
  const protocol=String(req.headers['x-forwarded-proto']||'https').split(',')[0];
  const host=String(req.headers['x-forwarded-host']||req.headers.host||'localhost').split(',')[0];
  const url=new URL(req.url,`${protocol}://${host}`);
  const headers=new Headers();for(const [key,value] of Object.entries(req.headers))if(value!==undefined)headers.set(key,Array.isArray(value)?value.join(', '):value);
  const init={method:req.method,headers};
  if(!['GET','HEAD'].includes(req.method)){let body;if(Buffer.isBuffer(req.body))body=req.body;else if(typeof req.body==='string')body=req.body;else if(req.body&&typeof req.body==='object')body=JSON.stringify(req.body);else {let chunks=[];for await(const chunk of req)chunks.push(Buffer.from(chunk));body=Buffer.concat(chunks)}init.body=body}
  const response=await worker.fetch(new Request(url,init),process.env);
  res.statusCode=response.status;response.headers.forEach((v,k)=>res.setHeader(k,v));
  if(req.method==='HEAD'||!response.body)return res.end();
  const reader=response.body.getReader();while(true){const {done,value}=await reader.read();if(done)break;res.write(Buffer.from(value))}res.end();
 }catch(error){console.error('HubMotion request failed:',error);res.statusCode=500;res.setHeader('Content-Type','text/plain; charset=utf-8');res.end('요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.')}
}
