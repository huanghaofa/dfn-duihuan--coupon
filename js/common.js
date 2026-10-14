(function(){
  'use strict';
  window.escapeHTML=function(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c];});};
  window.showToast=function(message,type){
    var old=document.querySelector('.toast'); if(old) old.remove();
    var el=document.createElement('div'); el.className='toast '+(type||''); el.textContent=message; document.body.appendChild(el);
    requestAnimationFrame(function(){el.classList.add('show');}); setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove();},220);},2200);
  };
  window.openModal=function(html,wide){
    window.closeModal(); var el=document.createElement('div'); el.className='modal-overlay'; el.innerHTML='<div class="modal-content '+(wide?'modal-wide':'')+'">'+html+'</div>'; document.body.appendChild(el);
    el.addEventListener('click',function(e){if(e.target===el||e.target.closest('[data-close-modal]')) window.closeModal();}); return el;
  };
  window.closeModal=function(){var el=document.querySelector('.modal-overlay');if(el)el.remove();};
})();
