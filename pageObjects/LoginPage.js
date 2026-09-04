class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.signInbutton  = page.locator("[value='Login']");
        this.uname = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");

    }

    async validLogin(uname,pass)
    {
        await this.uname.fill(uname);
        await this.pass.type(pass);
        await this.signInbutton.click();
    }

    async gotoURL()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}

module.exports = {LoginPage}