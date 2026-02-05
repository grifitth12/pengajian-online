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

window.authReady = new Promise(async (resolve) => {
    await checkAuth(); // fungsi cek login lu
    resolve(true);
});
