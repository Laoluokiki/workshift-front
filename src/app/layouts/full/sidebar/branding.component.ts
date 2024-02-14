import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/" class="h2 text-dark"  >
        <!-- <img
          src="./assets/images/logos/dark-logo.svg"
          class="align-middle m-2"
          alt="logo"
        /> -->
        WORKSHIFT
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
