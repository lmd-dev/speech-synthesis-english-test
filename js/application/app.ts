class AppSpeechSynthesis
{
    //Controller responsible for the application
    private _controller: Controller;

    //View of the application
    private _view: View;

    /**
     * Constructor
     */
    constructor()
    {
        this._controller = new Controller();
        this._view = new View(this._controller);
    }
}

window.onload = () =>
{
    let app = new AppSpeechSynthesis();
}