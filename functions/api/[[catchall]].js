export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetUrl = new URL(url.pathname + url.search, "http://155.248.255.29:3000");
  
  // Forward client request with all headers, method, and body
  const requestInit = {
    method: context.request.method,
    headers: context.request.headers,
    redirect: "follow",
  };

  if (!["GET", "HEAD"].includes(context.request.method)) {
    requestInit.body = context.request.body;
  }

  return fetch(new Request(targetUrl, requestInit));
}
