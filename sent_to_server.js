/**
 * apiを使ってDBからデータ取得 
 * @param {FormData} formData 
 * @param {string} api_url 
 * @returns json
 */
async function postMessage(formData, api_url) {
  var responseObj;

  await fetch(
    api_url,
    {
      method: "POST",
      data: formData
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    responseObj = response.json()
  }).catch(error => {
    console.error(api_url + ':' + error);
    postMessage(formData, api_url);
  })

  return responseObj;
}
