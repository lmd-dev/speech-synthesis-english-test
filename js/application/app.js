var AppSpeechSynthesis = /** @class */ (function () {
    /**
     * Constructor
     */
    function AppSpeechSynthesis() {
        this._controller = new Controller();
        this._view = new View(this._controller);
    }
    return AppSpeechSynthesis;
}());
window.onload = function () {
    var app = new AppSpeechSynthesis();
};
//# sourceMappingURL=app.js.map