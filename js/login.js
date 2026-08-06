(function(){
  const form = document.getElementById('loginForm');
  const toggles = document.querySelectorAll('.toggle');

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

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if(!username || !password){
      alert('아이디와 비밀번호를 입력해 주세요.');
      return;
    }
    // 간단한 로컬 인증(데모용)
    const stored = localStorage.getItem('myPage_user');
    if(!stored){
      alert('등록된 사용자가 없습니다. 회원가입 해주세요.');
      return;
    }
    const user = JSON.parse(stored);
    if(user.username === username && user.password === password){
      // 세션 저장
      localStorage.setItem('myPage_session', JSON.stringify({username: user.username, name: user.name}));
      // 메인(Index) 페이지로 이동
      window.location.href = 'index.html';
      return;
    }
    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  });
})();