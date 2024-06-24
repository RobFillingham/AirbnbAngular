import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  synth = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance();
  isReading: boolean = false;
  isPause: boolean = false;
  content: string = '';

  constructor() { }

  startReading(content: string) {
    if (this.isReading) {
      this.synth.cancel();
    }
    this.utterance.text = content;
    this.synth.speak(this.utterance);
    this.isReading = true;
    this.isPause = false;
    this.utterance.onend = () => {
      this.isReading = false;
    };
  }

  pauseReading() {
    this.synth.pause();
    this.isPause = true;
    this.isReading = false;
  }

  resumeReading() {
    this.synth.resume();
    this.isReading = true;
    this.isPause = false;
  }

  stopReading() {
    this.synth.cancel();
    this.isReading = false;
    this.isPause = false;
  }
}
