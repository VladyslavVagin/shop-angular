import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
    name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
    transform(value: string | string[]): any {

        if(value === '') return './assets/images/no-image.jpg';

        if(typeof value === 'string' && value.startsWith('blob:')) {
            return value; // Return the blob URL as is
        }

        if(typeof value === 'string') return `${baseUrl}/files/product/${value}`;
        const image = value[0];
        if(!image) return './assets/images/no-image.jpg';
        return `${baseUrl}/files/product/${image}`;
    }
}