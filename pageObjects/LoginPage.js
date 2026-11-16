class LoginPage
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

    async gotoPracticeURL()
    {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async practiceLogin(uname, pass)
    {
        await this.practiceUsername.fill(uname);
        await this.practicePassword.fill(pass);
        await this.practiceTerms.check();
        await Promise.all([
            this.page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop"),
            this.practiceSignIn.click()
        ]);
    }
}

module.exports = {LoginPage}