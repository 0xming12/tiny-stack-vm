import{readdirSync as d,readFileSync as f,writeFileSync as w,mkdirSync as k}from"node:fs";
let{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env,T="!5e\"*+/0~~~~~~~~'''''''&'''&'''~'''~~~~~~~~~~~~~ABBA!~~~~~~~~~~~&#~~~~~~~~~~~~~~\"\"%\"";
for(let x of d(I)){
let z=I+"/"+x+"/",p=f(z+"program.bin"),q=f(z+"input.bin"),n=p.length;
let D=[],C=[],Y=[],o=[],J=0,P=0,S=0,A=0,E=0;
X:for(;;){
if(S==1e6){E=10;break X}
if(P<0||P>=n){E=9;break X}
let y=p[P],t=T.charCodeAt(y)-33;
if(!(t<80)){E=5;break X}
let m=t>>4,u=t&3,v=t>>2&3;
if(P+m>=n){E=9;break X}
S++;
let N=P+1+m;
if(A<u){E=2;break X}
if(A-u+v>256){E=3;break X}
P=N;
if(y>15&&y<35){
let b=D[A-1],a=D[A-2],r;
if(y==23){D[A-1]=-b|0;continue X}
if(y==27){D[A-1]=~b;continue X}
if(y>18&&y<23&&!b){E=4;break X}
if(y<19)r=y==16?a+b|0:y==17?a-b|0:Math.imul(a,b);
else if(y<23)r=y==19?a==-2147483648&&b==-1?a:(a/b)|0:y==20?b==-1?0:a%b|0:y==21?(a>>>0)/(b>>>0)|0:(a>>>0)%(b>>>0)|0;
else if(y<27)r=y==24?a&b:y==25?a|b:a^b;
else if(y<31)r=y==28?a<<(b&31):y==29?a>>(b&31):a>>>(b&31)|0;
else r=y==32?a==b?1:0:y==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
D[A-2]=r;A--;continue X}
switch(y){
case 0:E=0;break X;
case 1:D[A++]=p[N-1]<<24>>24;break;
case 2:D[A++]=p[N-4]|p[N-3]<<8|p[N-2]<<16|p[N-1]<<24;break;
case 3:A--;break;
case 4:D[A]=D[A-1];A++;break;
case 5:[D[A-1],D[A-2]]=[D[A-2],D[A-1]];break;
case 6:D[A]=D[A-2];A++;break;
case 7:[D[A-3],D[A-2],D[A-1]]=[D[A-2],D[A-1],D[A-3]];break;
case 48:case 49:case 50:{
let r=(p[N-2]|p[N-1]<<8)<<16>>16;
if(y==48||(y==49?D[--A]==0:D[--A]!=0))P=N+r;
break}
case 51:if(C.length>63){E=7;break X}C.push(N);P=p[N-2]|p[N-1]<<8;break;
case 52:if(!C.length){E=8;break X}P=C.pop();break;
case 64:{let a=D[A-1];if(a<0||a>255){E=6;break X}D[A-1]=Y[a]|0;break}
case 65:{let a=D[A-1],g=D[A-2];if(a<0||a>255){E=6;break X}A-=2;Y[a]=g;break}
case 80:{let s=""+D[A-1];if(o.length+s.length>65536){E=11;break X}A--;o.push(...Buffer.from(s));break}
case 81:if(o.length>65535){E=11;break X}o.push(D[--A]&255);break;
case 82:D[A++]=J<q.length?q[J++]:-1;break;
case 83:E=D[--A]&255;break X;
}
}
z=O+"/"+x+"/";k(z,{recursive:true});w(z+"stdout.bin",Buffer.from(o));w(z+"exit.txt",""+E);
}
