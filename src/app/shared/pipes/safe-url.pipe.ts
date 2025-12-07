import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Pipe to sanitize URLs for use in iframes
 * @author Matias Aliaga
 */
@Pipe({
    name: 'safeUrl',
    standalone: true
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(url: string | null): SafeResourceUrl | null {
        if (!url) return null;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
