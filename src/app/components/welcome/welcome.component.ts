import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="h-full w-full flex items-center justify-center p-8 z-10 relative overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full z-0">
        <div 
          class="perspective-container flex justify-center md:justify-end order-1 z-10"
          (mousemove)="onMouseMove($event)"
          (mouseleave)="onMouseLeave()"
        >
          <div class="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] flex items-center justify-center">
            <div class="relative w-full h-full" [style.transform]="glassTransform()" style="transform-style: preserve-3d">
              <div class="absolute inset-0 blur-3xl opacity-40 breathing-halo"></div>
              <div class="relative w-full h-full breathing-blob overflow-hidden">
                <div class="absolute inset-0 shine-rotate"></div>
                <div class="absolute top-8 left-12 w-32 h-32 rounded-full bg-white/30 blur-3xl float-reflect-1"></div>
                <div class="absolute top-16 right-16 w-24 h-24 rounded-full bg-white/20 blur-2xl float-reflect-2"></div>
                <div class="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-cyan-300/20 blur-3xl float-reflect-3"></div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] md:w-[320px] z-20" [style.transform]="avatarTransform()">
                  <img 
                    src="assets/img/andrew.png"
                    alt="Avatar d'Andrew Marbach"
                    class="w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] pointer-events-none transition-transform duration-500 ease-out"
                    [style.transform]="isHovering() ? 'scale(1.08)' : 'scale(1)'"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center md:text-left order-2 space-y-2 md:space-y-6 z-30">
          <h1 i18n class="text-5xl md:text-7xl font-bold text-white leading-tight">
            Salut, je suis <b>Andrew</b>
          </h1>
          <h2
            class="text-2xl md:text-4xl text-slate-300 font-light flex flex-col md:block gap-2"
            i18n
          >
            Un développeur
            <span class="relative inline-block font-bold text-white px-2 py-1 mx-1 transform -skew-x-3">
              <span
                class="absolute inset-0 bg-teal-600 rounded-lg -z-10 block transform skew-x-3"
              ></span>
              FullStack Junior
            </span>
          </h2>
        </div>
      </div>

      <div class="absolute bottom-10 animate-bounce block w-full text-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-auto text-slate-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  `,
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  rotations = signal({ x: 0, y: 0 });
  isHovering = signal(false);

  glowTransform = computed(() => {
    const { x, y } = this.rotations();
    return `rotateX(${x * 0.15}deg) rotateY(${y * 0.15}deg)`;
  });

  glassTransform = computed(() => {
    const { x, y } = this.rotations();
    return `rotateX(${x * 0.4}deg) rotateY(${y * 0.4}deg)`;
  });

  avatarTransform = computed(() => {
    const { x, y } = this.rotations();
    return `rotateX(${x}deg) rotateY(${y}deg)`;
  });

  onMouseMove(e: MouseEvent) {
    this.isHovering.set(true);
    const card = e.currentTarget as HTMLElement;
    const box = card.getBoundingClientRect();
    
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const maxRotation = 10;
    
    const rotateY = ((x - centerX) / centerX) * maxRotation;
    const rotateX = -((y - centerY) / centerY) * maxRotation; 
    
    this.rotations.set({ x: rotateX, y: rotateY });
  }

  onMouseLeave() {
    this.isHovering.set(false);
    this.rotations.set({ x: 0, y: 0 });
  }
}
