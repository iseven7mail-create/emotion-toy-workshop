export const moods=['晴朗','平靜','低落','擔心','生氣','說不清'];
export function today(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00Z');return !isNaN(d)&&d.toISOString().slice(0,10)===s;}
export function draw(pool,n=3,random=Math.random){const a=[...pool];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);}
export function monthDays(month){const [y,m]=month.split('-').map(Number);return {offset:new Date(y,m-1,1).getDay(),count:new Date(y,m,0).getDate()};}
const str=(x,n)=>typeof x==='string'&&x.length<=n;
export function validateEntry(e){
return e&&str(e.id,100)&&e.id.length>0&&validDate(e.date)&&e.date<=today()&&moods.includes(e.mood)&&Number.isInteger(e.level)&&e.level>=1&&e.level<=5&&(e.cardId===null||(Number.isInteger(e.cardId)&&e.cardId>=1&&e.cardId<=38))&&str(e.note,2000)&&str(e.action,500)&&['男孩','女孩','先不選'].includes(e.role)&&str(e.createdAt,100)&&(!e.reflection||( ['好一些','差不多','更難受','說不上來'].includes(e.reflection.feeling)&&str(e.reflection.note,2000)));
}
export function parseBackup(text){if(text.length>5000000)throw Error('檔案太大，請選擇本站匯出的日記備份。');let data;try{data=JSON.parse(text);}catch{throw Error('無法讀取 JSON 檔案。');}if(data.version!==1||!Array.isArray(data.entries)||data.entries.length>5000||!data.entries.every(validateEntry))throw Error('備份格式不符，原有日記沒有被更動。');return data.entries;}
export function mergeEntries(old,incoming){const map=new Map(old.map(e=>[e.id,e]));for(const e of incoming)if(!map.has(e.id))map.set(e.id,e);if(map.size>5000)throw Error('記錄已超過上限，請先備份。');return [...map.values()];}

