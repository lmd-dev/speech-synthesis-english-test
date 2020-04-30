class View implements Observer
{
    //Controller responsible for the application
    private _controller: Controller;

    /**
     * Constructor
     */
    constructor(controller: Controller)
    {
        this._controller = controller;
        this._controller.addObserver(this);

        this.initializeEvents();
    }

    /**
     * Notification function of hte view
     */
    notify()
    {
        this.displayText();
        this.displayUserSpeech();
    }

    /**
     * Initializes main events of the view
     */
    initializeEvents()
    {
        $('#btn-read').on('click', () => { this._controller.readText(); });
        $('#btn-listen').on('click', () => { this._controller.listenUser(); });
    }

    /**
     * Displays the current text to read
     */
    displayText()
    {
        $('#text').html(this._controller.text);
    }

    /**
     * Displays user's recognized speech
     */
    displayUserSpeech()
    {
        $('#txt-recognize').val(this._controller.userSpeech);
    }
}