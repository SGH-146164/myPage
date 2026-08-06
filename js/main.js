(function(){
  const headerActions = document.getElementById('headerActions');
  const userInfo = document.getElementById('userInfo');

  function renderHeader(){
    const session = localStorage.getItem('myPage_session');
    headerActions.innerHTML = '';
    if(session){
      const user = JSON.parse(session);
      const span = document.createElement('span');
      span.textContent = `${user.name}님 환영합니다!`;
      const logout = document.createElement('button');
      logout.textContent = '로그아웃';
      logout.addEventListener('click', ()=>{
        localStorage.removeItem('myPage_session');
        // optional: redirect to login
        window.location.href = 'login.html';
      });
      headerActions.appendChild(span);
      headerActions.appendChild(logout);
      userInfo.textContent = `이름: ${user.name} / 아이디: ${user.username}`;
    } else {
      const loginBtn = document.createElement('button');
      loginBtn.textContent = '로그인';
      loginBtn.addEventListener('click', ()=> location.href = 'login.html');
      const signupBtn = document.createElement('button');
      signupBtn.textContent = '회원가입';
      signupBtn.className = 'ghost';
      signupBtn.addEventListener('click', ()=> location.href = 'signup.html');
      headerActions.appendChild(loginBtn);
      headerActions.appendChild(signupBtn);
      userInfo.textContent = '로그인 해주세요.';
    }
  }

  renderHeader();
})();