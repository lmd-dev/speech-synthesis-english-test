var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    /**
     * Constructor
     */
    function Controller() {
        var _this = _super.call(this) || this;
        _this._voiceAPI = null;
        _this._englishVoice = null;
        _this._recognizer = null;
        _this._text = "Your flowers are beautiful";
        _this._userSpeech = "";
        _this.initializeVoiceAPI().then(function () {
            _this._recognizer = new webkitSpeechRecognition();
            _this._recognizer.lang = 'en-GB';
            _this.notify();
        });
        return _this;
    }
    Object.defineProperty(Controller.prototype, "text", {
        get: function () { return this._text; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Controller.prototype, "userSpeech", {
        get: function () { return this._userSpeech; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Initializes voice API
     */
    Controller.prototype.initializeVoiceAPI = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._voiceAPI = window.speechSynthesis;
            _this._voiceAPI.onvoiceschanged = function () {
                _this._voiceAPI.onvoiceschanged = null;
                //Select english language
                var voices = _this._voiceAPI.getVoices();
                for (var iVoice = 0; _this._englishVoice == null && iVoice < voices.length; ++iVoice) {
                    if (voices[iVoice].lang == 'en-GB')
                        _this._englishVoice = voices[iVoice];
                }
                resolve();
            };
        });
    };
    /**
     * Reads the current text with SpeechSynthesis API
     */
    Controller.prototype.readText = function () {
        if (this._voiceAPI && this._englishVoice) {
            var utterance = new SpeechSynthesisUtterance("Repeat after me : " + this.text);
            utterance.voice = this._englishVoice;
            this._voiceAPI.speak(utterance);
        }
    };
    /**
     * Listens for user's voice and tries to recognize what he says
     */
    Controller.prototype.listenUser = function () {
        var _this = this;
        this._recognizer.start();
        this._recognizer.onresult = function (event) {
            _this._userSpeech = event.results[0][0].transcript;
            _this.notify();
        };
    };
    return Controller;
}(Subject));
//# sourceMappingURL=controller.js.map