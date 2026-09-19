document.addEventListener('DOMContentLoaded',()=>{
  const start=document.getElementById('start-chatbot');
  const panel=document.getElementById('chatbot-panel');
  const close=document.getElementById('chatbot-close');
  const input=document.getElementById('chatbot-input');
  const send=document.getElementById('chatbot-send');
  const messages=document.getElementById('chatbot-messages');
  if(!start||!panel||!input||!send||!messages)return;

  const history=[];
  const MAX_HISTORY=10;

  function add(text,who){
    const el=document.createElement('div');
    el.className=`chat-msg ${who}`;
    el.textContent=text;
    messages.appendChild(el);
    messages.scrollTop=messages.scrollHeight;
  }

  function apiUrl(path){
    const configured=String(window.ELECTROGUIDE_API_URL||'').trim().replace(/\/$/,'');
    if(configured)return configured+path;
    return path;
  }

  async function aiServerAnswer(question){
    const historyForServer=history.slice(-MAX_HISTORY);
    const res=await fetch(apiUrl('/api/ask'),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({question,history:historyForServer})
    });

    const data=await res.json().catch(()=>({}));
    if(!res.ok){
      throw new Error(data?.error||`AI request failed (${res.status})`);
    }
    return data?.answer?.trim()||'The AI returned an empty answer.';
  }

  async function ask(){
    const q=input.value.trim();
    if(!q)return;

    add(q,'user');
    input.value='';
    send.disabled=true;
    input.disabled=true;

    const typing=document.createElement('div');
    typing.className='chat-msg bot';
    typing.textContent='Thinking…';
    messages.appendChild(typing);
    messages.scrollTop=messages.scrollHeight;

    try{
      const answer=await aiServerAnswer(q);
      typing.textContent=answer;

      history.push({role:'user',content:q});
      history.push({role:'assistant',content:answer});
      if(history.length>MAX_HISTORY)history.splice(0,history.length-MAX_HISTORY);
    }catch(error){
      typing.textContent='AI connection error: '+(error?.message||'The AI backend is unavailable.');
      console.error(error);
    }

    send.disabled=false;
    input.disabled=false;
    input.focus();
    messages.scrollTop=messages.scrollHeight;
  }

  start.addEventListener('click',()=>{panel.classList.add('open');input.focus()});
  close?.addEventListener('click',()=>panel.classList.remove('open'));
  send.addEventListener('click',ask);
  input.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&!e.shiftKey){
      e.preventDefault();
      ask();
    }
  });
});
