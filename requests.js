
(async () => {
    // console.time('All requests');
    console.time('await_each_request');

    const axios = require('axios');
    const gitHubApi = user => `https://api.github.com/users/${user}/repos`;
    const p1 = axios(gitHubApi('douglasboardman'));
    const p2 = axios(gitHubApi('otaviolemos'));
    const p3 = axios(gitHubApi('rmanguinho'));
    
    await Promise.all([p1, p2, p3])

    // const p1 = await axios(gitHubApi('douglasboardman'));
    // const p2 = await axios(gitHubApi('otaviolemos'));
    // const p3 = await axios(gitHubApi('rmanguinho'));

    // console.log(`${p1.data[0].owner.login}: ${p1.data.length}`);
    // console.log(`${p2.data[0].owner.login}: ${p2.data.length}`);
    // console.log(`${p3.data[0].owner.login}: ${p3.data.length}`);

    // console.timeEnd('All requests');
    console.timeEnd('await_each_request');
})();
