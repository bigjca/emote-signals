import {AfterViewInit, Component, effect, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {TmiService} from "./services/tmi.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'emote-signals';
  @ViewChild('messageBox') messageBox!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  ctx!: CanvasRenderingContext2D;
  imagesMap = new Map<string, any>();
  constructor(public readonly tmiService: TmiService) {
   effect(() => {
     this.tmiService.messages();
     const element = this.messageBox?.nativeElement;
      if(element) {
        element.scrollTop = element.scrollHeight;
      }
    });
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  onStartClick(value: string) {
    this.tmiService.connect(value);
    this.tmiService.listen();
  }

  onStopClick(): void {
    this.tmiService.disconnect();
  }

  drawEmote() {
    const emotes = this.tmiService.emotes();
    if(emotes?.length) {
      const emote = emotes[emotes.length - 1];
      const image = this.getEmoteImage(emote);
      this.drawImage(image);
    }
  }

  getEmoteImage(id: string): any {
    if(this.imagesMap.has(id)) {
      return this.imagesMap.get(id);
    } else {
      const image = new Image();
      image.onload = () => {
        console.log('image loaded!');
      }
      image.src = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/static/light/1.0`;
      this.imagesMap.set(id, image);
      return image;
    }
  }

  drawImage(image: any): void {
    this.ctx.clearRect(0, 0, 800, 600);
    this.ctx.drawImage(image, 0, 0);
  }
}
