(function(){
 var root=document.getElementById('root'), status=document.getElementById('boot-status');
 var path=location.pathname.replace(/\/$/,'')||'/';
 var classic=new URLSearchParams(location.search).has('classic');
 function stage(text){if(status&&status.isConnected)status.textContent=text;}
 function fail(error){console.error('SkillTwin startup:',error);if(root.querySelector('.st-app,.st-auth-page'))return;root.innerHTML='<main class="st-boot"><b>skilltwin<span>.</span></b><h1>Не удалось запустить приложение</h1><p>Попробуй обновить страницу. Твои данные не удалены.</p><a href="/learn?refresh=32">Повторить попытку</a><small>Версия 3.2 · ST-START</small></main>';}
 (async function(){try{
  document.documentElement.classList.add(classic?'st-legacy':'st-modern');
  if(classic){var css=document.createElement('link');css.rel='stylesheet';css.href='/legacy.css';document.head.append(css);var bar=document.createElement('div');bar.className='st-return';bar.innerHTML='<a href="/learn">← Учебная карта</a>';document.body.prepend(bar);root.innerHTML='';await import('/legacy.js');return;}
  stage('Загружаем учебные материалы…');
  var cloud=await import('/cloud.js');
  if(path==='/account'||cloud.needsCloud()){stage('Проверяем аккаунт…');await cloud.initCloud();}
  stage('Открываем SkillTwin…');
  await import(path==='/account'?'/account.js':'/skilltwin-v2.js');
  if(root.querySelector('.st-boot'))throw Error('Application did not render');
 }catch(e){fail(e);}})();
})();