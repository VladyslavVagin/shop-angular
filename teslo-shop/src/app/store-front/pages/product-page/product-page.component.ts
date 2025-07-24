import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent { 
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];
  productsResource = rxResource({
    request: () => ({idSlug: this.productIdSlug}),
    loader: ({request}) => {
      return this.productsService.getProductByIdSlug(request.idSlug);
    }
  })
}
