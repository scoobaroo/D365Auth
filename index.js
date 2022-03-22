var https = require('https');   // this is used later in code

var crmorg = 'https://pkd365dev.crm8.dynamics.com/';
var authhost = 'login.microsoftonline.com';
var authpath = '/06b63d62-9374-4d41-a269-4971ff69c4c7/oauth2/token';
var clientid = "7c0276b2-4f0f-45e5-b0ab-33d41ebda26d"; 
var clientSecret = "UFR7Q~cJULh1rczrQ0Y7ViJ9PPbMsdkIM0cAo"; // app clientSecret
var postData = 'client_id=' + clientid;
postData += '&resource=' + encodeURIComponent(crmorg);
postData += '&client_secret=' + encodeURIComponent(clientSecret);
postData += '&grant_type=client_credentials';

var options = {
    host: authhost,
    path: authpath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    },
};

try
{
    var request = https.request(options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            console.log(data);
            var tokenresponse = JSON.parse(data);
            var access_token = tokenresponse.access_token;
            console.log('Token: ' + access_token);
        });
    })
    request.on("error", function(error) {
        console.log(error.message);
    });
    request.write(postData);
    request.end();
}
catch(ex)
{
    console.log(ex);
}




