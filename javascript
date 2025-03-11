function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Your browser does not support speech recognition.");
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false; // Final result ही capture होगा
    recognition.continuous = false; // Continuous listening बंद कर दो

    recognition.onstart = function() {
        console.log("Voice recognition started. Speak now...");
    };

    recognition.onspeechend = function() {
        console.log("Speech ended.");
        recognition.stop();
    };

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        document.getElementById('display').value += speechResult;
    };

    recognition.onerror = function(event) {
        if (event.error === 'no-speech') {
            alert("No speech detected. Please try again.");
        } else if (event.error === 'audio-capture') {
            alert("No microphone found. Please ensure your microphone is connected.");
        } else if (event.error === 'not-allowed') {
            alert("Microphone access denied. Please allow access in your browser settings.");
        } else {
            alert("Voice recognition error: " + event.error);
        }
    };

    recognition.start();
}
