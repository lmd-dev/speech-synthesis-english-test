var View = /** @class */ (function () {
    /**
     * Constructor
     */
    function View(controller) {
        this._controller = controller;
        this._controller.addObserver(this);
        this.initializeEvents();
    }
    /**
     * Notification function of hte view
     */
    View.prototype.notify = function () {
        this.displayText();
        this.displayUserSpeech();
    };
    /**
     * Initializes main events of the view
     */
    View.prototype.initializeEvents = function () {
        var _this = this;
        $('#btn-read').on('click', function () { _this._controller.readText(); });
        $('#btn-listen').on('click', function () { _this._controller.listenUser(); });
    };
    /**
     * Displays the current text to read
     */
    View.prototype.displayText = function () {
        $('#text').html(this._controller.text);
    };
    /**
     * Displays user's recognized speech
     */
    View.prototype.displayUserSpeech = function () {
        $('#txt-recognize').val(this._controller.userSpeech);
    };
    return View;
}());
//# sourceMappingURL=view.js.map