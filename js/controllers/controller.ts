class Controller extends Subject
{
    //SpeechSynthesis API
    private _voiceAPI: SpeechSynthesis;

    //English voice
    private _englishVoice: SpeechSynthesisVoice;

    private _recognizer: SpeechRecognition;

    //Text to read
    private _text: string;
    public get text(): string { return this._text; };

    //User recognized speech
    private _userSpeech: string;
    public get userSpeech(): string { return this._userSpeech; };

    /**
     * Constructor
     */
    constructor()
    {
        super();

        this._voiceAPI = null;
        this._englishVoice = null;
        this._recognizer = null;

        this._text = "Your flowers are beautiful";
        this._userSpeech = "";

        this.initializeVoiceAPI().then(() =>
        {
            this._recognizer = new webkitSpeechRecognition();
            this._recognizer.lang = 'en-GB';

            this.notify();
        });
    }

    /**
     * Initializes voice API
     */
    initializeVoiceAPI(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this._voiceAPI = window.speechSynthesis;

            this._voiceAPI.onvoiceschanged = () =>
            {
                this._voiceAPI.onvoiceschanged = null;

                //Select english language
                let voices = this._voiceAPI.getVoices();

                for (let iVoice = 0; this._englishVoice == null && iVoice < voices.length; ++iVoice)
                {
                    if (voices[iVoice].lang == 'en-GB')
                        this._englishVoice = voices[iVoice];
                }

                resolve();
            }
        });
    }

    /**
     * Reads the current text with SpeechSynthesis API
     */
    readText()
    {
        if (this._voiceAPI && this._englishVoice)
        {
            let utterance = new SpeechSynthesisUtterance("Repeat after me : " + this.text);
            utterance.voice = this._englishVoice;

            this._voiceAPI.speak(utterance);
        }
    }

    /**
     * Listens for user's voice and tries to recognize what he says
     */
    listenUser()
    {        
        this._recognizer.start();
        this._recognizer.onresult = (event) =>
        {
            this._userSpeech = event.results[0][0].transcript;
            this.notify();
        };
    }
}