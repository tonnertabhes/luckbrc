interface requestOptions {
  method: string;
  redirect: RequestRedirect;
}

interface requestOptionsPost extends requestOptions {
  headers: Headers;
  body: string;
}

export async function getUsername(walletAddress: string) {
  if (walletAddress === "") return;

  var requestOptions: requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return await fetch(
    "http://localhost:8080/getuser/" + walletAddress,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export async function createUsername(username: string, walletAddress: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  var raw = `{ "username": "${username}", "wallet": "${walletAddress}" }`;

  var requestOptions: requestOptionsPost = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch("http://localhost:8080/createuser", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

export async function changeUsername(username: string, walletAddress: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  var raw = `{"username": "${username}","wallet": "${walletAddress}"}`;

  var requestOptions: requestOptionsPost = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch("http://localhost:8080/updateuser", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}