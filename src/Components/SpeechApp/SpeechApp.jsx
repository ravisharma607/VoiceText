import React, { useState } from 'react'
import './SpeechApp.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const SpeechApp = () => {
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    // ------------------------- Text Transform -----------------------
    function handleUpClick() {
        if (transcript) {
            let textarea = document.querySelector('.text textarea')
            let textareaValue = textarea.value
            textarea.value = textareaValue.toUpperCase()
        }
        else {
            alert('Ooops!.. Nothing To Convert. Try To Speak')
        }
    };
    function handleLowerClick() {
        if (transcript) {
            let textarea = document.querySelector('.text textarea')
            let textareaValue = textarea.value
            textarea.value = textareaValue.toLowerCase()
               }
        else {
            alert('Ooops!.. Nothing To Convert. Try To Speak')
        }
    };

    // ------------------------- Text Transform -----------------------


    // To Listen Continue
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IND' })

    // Check Browser Supported or Not
    if (!browserSupportsSpeechRecognition) {
        return null
    }
    // |----------------------- Copy Text Starts ------------------------------------|
    function handleCopy() {
        if (transcript) {
            let textarea = document.querySelector('.text textarea')
            let textareaValue = textarea.value
            navigator.clipboard.writeText(textareaValue);
            document.getSelection().removeAllRanges();
            copied()
            timeoutId()
        }
        else {
            alert('Ooops!.. Nothing To Copy. Try To Speak')
        }

    }
    let element = document.getElementById("copied");
    const copied = () => setTimeout(function () {
        element.innerHTML = "Copied";
    }, 100);

    const timeoutId = () => setTimeout(function () {
        element.innerHTML = "Copy Text"
    }, 2000);
    // |----------------------- Copy Text Ends ------------------------------------|

    // |------------------------ To Transform Starts ------------------------------------|
    return (
        <>
            <div className="container">
                <h2>Speech To Text Converter</h2>
                <br />
                <p>Speak and work with text like copy to clipBoard, convert to uppercase and lowerCase</p>
                <br />
                <div className="main-content">
                    <div className="text">
                        <textarea name="" id="allText" cols="30" rows="10" value={transcript}></textarea>
                    </div>
                </div>
                <div className="icons actions">
                    <span className="on" onClick={startListening}><ion-icon name="mic"></ion-icon></span>
                    <span className="off" onClick={SpeechRecognition.stopListening
                    }><ion-icon name="mic-off"></ion-icon></span>
                </div>
                <hr />
                <div className="actions">
                    <button className="btn" id='copied' onClick={handleCopy}>Copy Text</button>
                    <button className="btn" onClick={handleUpClick}>To Uppercase</button>
                    <button className="btn" onClick={handleLowerClick}>To Lowercase</button>
                </div>
            </div>
        </>
    )

}
export default SpeechApp