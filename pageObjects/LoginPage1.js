class LoginPage1
{
    constructor(page)
    {
        this.page = page;
        this.signInbutton  = page.locator("[value='Login']");
        this.uname = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");
        this.practiceUsername = page.getByRole('textbox', { name: 'Username:' });
        this.practicePassword = page.getByRole('textbox', { name: 'Password:' });
        this.practiceTerms = page.getByRole('checkbox', { name: 'I Agree to the terms and conditions' });
        this.practiceSignIn = page.getByRole('button', { name: 'Sign In' });

    }
    async GotoURL()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(uname, pass)
    {
        await this.uname.fill(uname);
        await this.pass.fill(pass);
        await this.signInbutton.click();
    }

}
module.exports = {LoginPage1}