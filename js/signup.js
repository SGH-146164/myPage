(function(){
  const form = document.getElementById('signupForm');
  const toggles = document.querySelectorAll('.toggle');
  const agreeAll = document.getElementById('agreeAll');
  const requiredTerms = document.querySelectorAll('.term.required');

  toggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if(!input) return;
      if(input.type === 'password'){
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  agreeAll.addEventListener('change', ()=>{
    requiredTerms.forEach(cb=> cb.checked = agreeAll.checked);
  });

  requiredTerms.forEach(cb=>{
    cb.addEventListener('change', ()=>{
      const allChecked = Array.from(requiredTerms).every(c=>c.checked);
      agreeAll.checked = allChecked;
    });
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if(!name || !username || !password || !confirm){
      alert('이름, 아이디, 비밀번호, 비밀번호 확인은 필수입니다.');
      return;
    }

    if(password !== confirm){
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const termsOk = Array.from(requiredTerms).every(cb=>cb.checked);
    if(!termsOk){
      alert('필수 약관에 모두 동의해 주세요.');
      return;
    }

    // 간단한 로컬 저장(데모용)
    const user = {
      name: name,
      username: username,
      password: password
    };
    try{
      localStorage.setItem('myPage_user', JSON.stringify(user));
    }catch(err){
      console.error('localStorage set error', err);
    }
    // 가입 완료 후 로그인 페이지로 이동
    window.location.href = 'login.html';
  });
})();