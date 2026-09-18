class APIUtils2
{
    constructor(apiContext,loginPayLoad)
    {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad
    }
    async getToken()
    {
        //const apiContext = await request.newContext();
        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/events",{ 
        data:this.loginPayload });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

}