function readCookies() {
  const cookies = document.cookie.split(';');
  let cookieObject = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookieObject[key.trim()] = value;
  });
  return cookieObject;
}

const userCookies = readCookies();
console.log("User cookies: ", userCookies);


