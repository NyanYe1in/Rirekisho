const INIT={
  date:new Date().toLocaleDateString('ja-JP',{year:'numeric',month:'long',day:'numeric'}),
  furigana:'',name:'',birthdate:'',age:'',gender:'男',
  addr_kana:'',addr_zip:'',address:'',phone:'',mobile:'',email:'',
  perm_kana:'',perm_zip:'',perm_address:'',perm_phone:'',photo:'',
  education:[{year:'',month:'',content:''},{year:'',month:'',content:''}],
  work:[{year:'',month:'',content:''}],
  quals:[{year:'',month:'',content:''}],
  commute:'',dependents:'0',spouse:'有',spouse_support:'有',health:'良好',
  pr:'',preferences:''
};
const SAMPLE={
  date:'令和7年3月30日',furigana:'やまだ たろう',name:'山田 太郎',
  birthdate:'平成2年4月1日',age:'34',gender:'男',
  addr_kana:'とうきょうと しぶやく',addr_zip:'150-0001',
  address:'東京都渋谷区神宮前1-1-1　〇〇マンション101',
  phone:'03-1234-5678',mobile:'090-1234-5678',email:'taro.yamada@example.com',
  perm_kana:'',perm_zip:'',perm_address:'',perm_phone:'',photo:'',
  education:[
    {year:'2009',month:'3',content:'○○県立○○高等学校 卒業'},
    {year:'2009',month:'4',content:'○○大学 ○○学部 入学'},
    {year:'2013',month:'3',content:'○○大学 ○○学部 卒業'},
  ],
  work:[
    {year:'2013',month:'4',content:'株式会社○○ 入社（システム開発部 配属）'},
    {year:'2023',month:'3',content:'株式会社○○ 一身上の都合により退社'},
    {year:'2023',month:'4',content:'現在 求職中'},
  ],
  quals:[
    {year:'2011',month:'6',content:'普通自動車第一種運転免許 取得'},
    {year:'2014',month:'11',content:'応用情報技術者試験 合格'},
    {year:'2016',month:'3',content:'TOEIC 800点 取得'},
  ],
  commute:'1時間30分',dependents:'1',spouse:'有',spouse_support:'有',health:'良好',
  pr:'前職では開発部門にて10年間、Webシステム開発に従事しました。チームリーダーとして5名のメンバーをまとめ、売上管理システムのリプレースプロジェクトを成功に導きました。新しい環境でもこれまでの経験を活かし、貢献できると確信しております。',
  preferences:'給与・待遇は貴社規定に従います。勤務地については東京都内を希望します。'
};

let state={data:JSON.parse(JSON.stringify(INIT)),tab:'form'};

function set(k,v){state.data[k]=v;render()}
function setRow(f,i,k,v){state.data[f][i][k]=v;render()}
function addRow(f){state.data[f].push({year:'',month:'',content:''});render()}
function remRow(f,i){state.data[f].splice(i,1);render()}
function setTab(t){state.tab=t;render()}

function pad(arr,n){
  const a=[...arr];
  while(a.length<n) a.push({year:'',month:'',content:''});
  return a;
}

function buildHistRows(d){
  const rows=[
    {year:'',month:'',content:'学歴',bold:true},
    ...pad(d.education,4),
    {year:'',month:'',content:'職歴',bold:true},
    ...pad(d.work,4),
    {year:'',month:'',content:'以上',right:true},
  ];
  while(rows.length<18) rows.push({year:'',month:'',content:''});
  return rows;
}

function previewHTML(d){
  const hist=buildHistRows(d);
  const quals=pad(d.quals,6);
  const photo=d.photo
    ?`<img src="${d.photo}" style="width:68px;height:91px;object-fit:cover;" />`
    :`<div class="photo-placeholder">写真<br>3×4cm</div>`;

  const histRows=hist.map(r=>`<tr style="height:17px">
    <td class="center">${r.year||''}</td>
    <td class="center">${r.month||''}</td>
    <td class="${r.bold?'bold':''} ${r.right?'right':''}" ${r.right?'style="padding-right:8px"':''}>${r.content||''}</td>
  </tr>`).join('');

  const qualRows=quals.map(r=>`<tr style="height:18px">
    <td class="center">${r.year||''}</td>
    <td class="center">${r.month||''}</td>
    <td>${r.content||''}</td>
  </tr>`).join('');

  return `<div class="rv" id="rv-target">
  <div style="display:flex;align-items:flex-end;margin-bottom:4px;border-bottom:0.8px solid #333;padding-bottom:3px">
    <div style="flex:1;font-size:20px;font-weight:bold;text-align:center;letter-spacing:0.25em">履歴書</div>
    <div style="font-size:8.5px">${d.date}　現在</div>
  </div>

  <table style="margin-bottom:2px">
    <colgroup>
      <col style="width:13%"><col style="width:37%"><col style="width:9%"><col style="width:18%"><col style="width:23%">
    </colgroup>
    <tbody>
      <tr style="height:22px">
        <td class="lb">ふりがな</td>
        <td colspan="3" style="font-size:8px">${d.furigana||''}</td>
        <td rowspan="5" class="center">${photo}</td>
      </tr>
      <tr style="height:38px">
        <td class="lb">氏　　名</td>
        <td colspan="3" class="lg">${d.name||''}</td>
      </tr>
      <tr style="height:24px">
        <td class="lb sm">生年月日</td>
        <td style="font-size:8px">${d.birthdate||''}${d.age?`（満${d.age}歳）`:''}</td>
        <td class="lb sm">性別</td>
        <td class="center">${d.gender||''}</td>
      </tr>
      <tr style="height:20px">
        <td class="lb sm">ふりがな</td>
        <td colspan="3" style="font-size:7.5px">${d.addr_kana||''}</td>
      </tr>
      <tr style="height:36px">
        <td class="lb sm">現住所<br>〒${d.addr_zip||''}</td>
        <td colspan="3">${d.address||''}</td>
      </tr>
      <tr style="height:22px">
        <td class="lb sm">電話</td>
        <td>${d.phone||''}</td>
        <td class="lb sm">携帯</td>
        <td>${d.mobile||''}</td>
        <td style="font-size:7.5px">${d.email||''}</td>
      </tr>
      <tr style="height:20px">
        <td class="lb sm">ふりがな</td>
        <td colspan="3" style="font-size:7.5px">${d.perm_kana||''}</td>
        <td class="lb sm">メール</td>
      </tr>
      <tr style="height:36px">
        <td class="lb sm">連絡先<br>〒${d.perm_zip||''}</td>
        <td colspan="3">${d.perm_address||'（現住所に同じ）'}</td>
        <td></td>
      </tr>
      <tr style="height:20px">
        <td class="lb sm">電話</td>
        <td colspan="4">${d.perm_phone||''}</td>
      </tr>
    </tbody>
  </table>

  <table style="margin-bottom:0">
    <tbody><tr style="height:20px"><td class="lb bold" style="font-size:9px;border:0.8px solid #333">学歴・職歴</td></tr></tbody>
  </table>
  <table style="margin-bottom:2px">
    <colgroup><col style="width:10%"><col style="width:7%"><col style="width:83%"></colgroup>
    <tbody>
      <tr style="height:18px"><td class="lb center">年</td><td class="lb center">月</td><td class="lb center">学歴・職歴</td></tr>
      ${histRows}
    </tbody>
  </table>

  <table style="margin-bottom:0">
    <tbody><tr style="height:20px"><td class="lb bold" style="font-size:9px;border:0.8px solid #333">免許・資格</td></tr></tbody>
  </table>
  <table style="margin-bottom:2px">
    <colgroup><col style="width:10%"><col style="width:7%"><col style="width:83%"></colgroup>
    <tbody>
      <tr style="height:18px"><td class="lb center">年</td><td class="lb center">月</td><td class="lb center">免許・資格</td></tr>
      ${qualRows}
    </tbody>
  </table>

  <table style="margin-bottom:2px">
    <colgroup>
      <col style="width:11%"><col style="width:16%"><col style="width:14%"><col style="width:11%">
      <col style="width:10%"><col style="width:10%"><col style="width:14%"><col style="width:14%">
    </colgroup>
    <tbody>
      <tr style="height:30px">
        <td class="lb sm">通勤時間</td>
        <td>${d.commute?`約${d.commute}`:''}</td>
        <td class="lb" style="font-size:6.5px;white-space:pre-line">扶養家族数\n(配偶者除く)</td>
        <td class="center">${d.dependents||0}名</td>
        <td class="lb sm">配偶者</td>
        <td class="center">${d.spouse||''}</td>
        <td class="lb" style="font-size:6.5px;white-space:pre-line">配偶者の\n扶養義務</td>
        <td class="center">${d.spouse_support||''}</td>
      </tr>
      <tr style="height:22px">
        <td class="lb sm">健康状態</td>
        <td colspan="7">${d.health||''}</td>
      </tr>
    </tbody>
  </table>

  <table style="margin-bottom:2px">
    <tbody>
      <tr><td class="lb bold" style="font-size:9px;border:0.8px solid #333;height:20px">志望動機・自己PR・特技など</td></tr>
      <tr><td class="top" style="height:65px;white-space:pre-wrap">${d.pr||''}</td></tr>
    </tbody>
  </table>

  <table>
    <tbody>
      <tr><td class="lb bold" style="font-size:9px;border:0.8px solid #333;height:20px">本人希望記入欄</td></tr>
      <tr><td class="top" style="height:45px;white-space:pre-wrap">${d.preferences||''}</td></tr>
    </tbody>
  </table>
</div>`;
}

function dynRows(f,ph){
  const rows=state.data[f];
  return `<div class="dyn-header"><span>年</span><span>月</span><span>${ph.split(' ')[0]}</span><span></span></div>`+
  rows.map((r,i)=>`<div class="dyn-row">
    <input maxlength="4" placeholder="2020" value="${r.year}" oninput="setRow('${f}',${i},'year',this.value)">
    <input maxlength="2" placeholder="4" value="${r.month}" oninput="setRow('${f}',${i},'month',this.value)">
    <input placeholder="${ph}" value="${r.content.replace(/"/g,'&quot;')}" oninput="setRow('${f}',${i},'content',this.value)">
    <button class="btn-rem" onclick="remRow('${f}',${i})">✕</button>
  </div>`).join('')+
  `<button class="btn-add" onclick="addRow('${f}')">＋ 追加</button>`;
}

function f(label,inp){return`<div class="field"><label>${label}</label>${inp}</div>`}
function g2(a,b){return`<div class="grid2">${a}${b}</div>`}
function g3(a,b,c){return`<div class="grid3">${a}${b}${c}</div>`}
function inp(k,ph,type='text',extra=''){
  const v=(state.data[k]||'').toString().replace(/"/g,'&quot;');
  return`<input type="${type}" placeholder="${ph}" value="${v}" ${extra} oninput="set('${k}',this.value)">`;
}
function sel(k,opts){
  return`<select onchange="set('${k}',this.value)">${opts.map(o=>`<option${state.data[k]===o?' selected':''}>${o}</option>`).join('')}</select>`;
}
function sect(title,body){return`<div class="sect"><h3>${title}</h3>${body}</div>`}

function handlePrint(){
  const tgt=document.getElementById('rv-target');
  if(!tgt){alert('プレビュータブに切り替えてから保存してください。');return;}
  const w=window.open('','_blank','width=900,height=1200');
  if(!w){alert('ポップアップがブロックされました。ブラウザの設定を確認してください。');return;}
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>履歴書</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Hiragino Sans','Meiryo','Yu Gothic',sans-serif;margin:0;padding:0}
    table{border-collapse:collapse;width:100%;table-layout:fixed}
    td{border:0.8px solid #333;padding:2px 5px;vertical-align:middle;font-family:inherit;font-size:8.5px;line-height:1.4}
    .lb{background:#dde5ee;text-align:center;white-space:pre-line;font-size:7.5px}
    .center{text-align:center}.right{text-align:right}.bold{font-weight:bold}
    .sm{font-size:7px}.lg{font-size:15px;font-weight:bold}
    .top{vertical-align:top;padding-top:4px}
    .photo-placeholder{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:68px;height:91px;border:0.8px dashed #bbb;color:#aaa;font-size:7px;text-align:center;gap:2px}
    @media print{@page{size:A4;margin:0}body{margin:0}#rv-target{width:210mm;padding:8mm 9mm}}
  </style>
  </head><body>${tgt.outerHTML}</body></html>`);
  w.document.close();
  setTimeout(()=>{w.focus();w.print();},500);
}

function handlePhoto(e){
  const file=e.target.files[0];if(!file)return;
  const r=new FileReader();r.onload=ev=>{set('photo',ev.target.result)};r.readAsDataURL(file);
}
// ... (INIT, SAMPLE နှင့် အခြား function များသည် အရင်အတိုင်းထားပါ)

function formHTML() {
  const d = state.data;
  let photoPreview = d.photo ? `<img src="${d.photo}" style="width:50px;height:67px;object-fit:cover;border-radius:4px;border:0.5px solid var(--color-border-tertiary);margin-top:4px;display:block">` : '';
  
  return `
  ${sect('အခြေခံအချက်အလက် (Basic Info)',
    g2(f('ရေးသားသည့်နေ့စွဲ', inp('date', '၂၀၂၆ ခုနှစ်၊ မတ်လ ၃၀ ရက်')),
       `<div class="field"><label>ဓာတ်ပုံ (Photo)</label><input type="file" accept="image/*" onchange="handlePhoto(event)" style="padding:4px">${photoPreview}</div>`) +
    g2(f('ဖူရီဂါနာ (Furigana)', inp('furigana', 'ယာမာဒါ တာရိုး')), f('အမည် (Name)', inp('name', 'Yamada Taro'))) +
    g3(f('မွေးသက္ကရာဇ် (Birthdate)', inp('birthdate', '၁၉၉၀ ခုနှစ်၊ ဧပြီလ ၁ ရက်')), f('အသက် (Age)', inp('age', '၃၄', 'number')), f('ကျား/မ (Gender)', sel('gender', ['ကျား', 'မ', 'အခြား'])))
  )}
  
  ${sect('လက်ရှိနေရပ်လိပ်စာ (Current Address)',
    g2(f('ဖူရီဂါနာ (Address Kana)', inp('addr_kana', '')), f('စာတိုက်သင်္ကေတ (Zip Code) 〒', inp('addr_zip', '150-0001'))) +
    f('လိပ်စာ (Address)', inp('address', 'တိုကျိုမြို့၊ ရှီဘူယားခရိုင်...')) +
    g2(f('ဖုန်း (Phone)', inp('phone', '03-1234-5678')), f('လက်ကိုင်ဖုန်း (Mobile)', inp('mobile', '090-1234-5678'))) +
    f('အီးမေးလ် (Email)', inp('email', 'taro@example.com', 'email'))
  )}

  ${sect('ပညာအရည်အချင်း (Education)', dynRows('education', '...တက္ကသိုလ် ဝင်ခွင့်'))}
  ${sect('လုပ်ငန်းအတွေ့အကြုံ (Work History)', dynRows('work', '...ကုမ္ပဏီ အလုပ်ဝင်'))}
  ${sect('လိုင်စင်နှင့် အရည်အချင်းစစ်လက်မှတ် (Licenses/Qualifications)', dynRows('quals', 'ယာဉ်မောင်းလိုင်စင် ရရှိမှု'))}

  ${sect('အခြားအချက်အလက် (Others)',
    g2(f('အလုပ်သွားချိန် (Commute Time)', inp('commute', '၁ နာရီ ၃၀ မိနစ်')), f('မှီခိုမိသားစုဝင်ဦးရေ (Dependents)', inp('dependents', '0', 'number'))) +
    g2(f('အိမ်ထောင်ဖက် ရှိ/မရှိ', sel('spouse', ['ရှိ', 'မရှိ'])), f('အိမ်ထောင်ဖက်အား ထောက်ပံ့မှု', sel('spouse_support', ['ရှိ', 'မရှိ']))) +
    f('ကျန်းမာရေးအခြေအနေ (Health)', inp('health', 'ကောင်းမွန်သည်'))
  )}

  ${sect('မိမိကိုယ်ကိုမိတ်ဆက်ခြင်းနှင့် ထူးခြားသောကျွမ်းကျင်မှု (Self PR)',
    `<textarea rows="5" oninput="set('pr',this.value)">${state.data.pr || ''}</textarea>`
  )}

  ${sect('မိမိဘက်မှ တောင်းဆိုချက်များ (Personal Preferences)',
    `<textarea rows="3" oninput="set('preferences',this.value)">${state.data.preferences || ''}</textarea>`
  )}

  <div style="text-align:center;padding:10px 0 24px">
    <button onclick="setTab('preview')" style="background:#1a3a5c;color:white;border:none;border-radius:7px;padding:12px 32px;font-size:14px;font-weight:500">
      👁 ပုံစံကြည့်ရန် (Preview) →
    </button>
  </div>`;
}

function render() {
  const d = state.data;
  document.getElementById('app').innerHTML = `
  <div style="background:#1a3a5c;color:white;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;position:sticky;top:0;z-index:10">
    <div>
      <div style="font-size:15px;font-weight:500">📄 CV ထုတ်လုပ်စနစ်</div>
      <div style="opacity:0.6;font-size:11px">Japanese CV Generator (Burmese Version)</div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="tab-btn${state.tab === 'form' ? ' active' : ''}" onclick="setTab('form')">✏️ အချက်အလက်ဖြည့်ရန်</button>
      <button class="tab-btn${state.tab === 'preview' ? ' active' : ''}" onclick="setTab('preview')">👁 ပုံစံကြည့်ရန်</button>
      <button class="tab-btn" onclick="state.data=JSON.parse(JSON.stringify(SAMPLE));render()" style="background:rgba(255,255,255,0.12);color:white;border-color:rgba(255,255,255,0.3)">📝 နမူနာ</button>
      <button class="tab-btn" onclick="handlePrint()" style="background:#c87a00;color:white;border-color:#c87a00">📥 PDF သိမ်းမည်</button>
    </div>
  </div>

  ${state.tab === 'form'
    ? `<div style="max-width:660px;margin:0 auto;padding:14px 12px">${formHTML()}</div>`
    : `<div style="padding:14px;overflow-x:auto">
        <div class="tip">💡 "PDF သိမ်းမည်" ကိုနှိပ်ပါက Window အသစ်ပွင့်လာပါမည်။ ထိုနေရာတွင် Save as PDF ကိုရွေးချယ်ပါ။</div>
        <div style="transform:scale(0.84);transform-origin:top left;display:inline-block">${previewHTML(d)}</div>
      </div>`
  }`;
}

// မမေ့ပါနဲ့ - အောက်ဆုံးမှာ ဒီ line လေးထည့်ပေးရပါမယ်
render();