function isAuthenticated() {
  return document.cookie.split(';').some((cookie) => {
    return cookie.trim().startsWith('access_token=');
  });
}

function getJwtFromCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith('access_token=')) {
      return cookie.split('=')[1];
    }
  }
    return null;
}    

function getUserMetadata() {
    let token = getJwtFromCookie()
    let base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = window.atob(base64);
    return payloadObject = JSON.parse(decodedPayload);
}

// if(isAuthenticated()) {
//     window.rijal = true
//     window.user = getUserMetadata()
// } else { window.location.href = "https://hggxutlouhypvgmrsjkm.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:5501/callback.html" }