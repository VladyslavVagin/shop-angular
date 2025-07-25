import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from "@shared/components/form-error-label/form-error-label.component";

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();
  fb = inject(FormBuilder);
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[''], Validators.required],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/^(men|women|kid|unisex)$/)],
    ],
  });

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes || [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(', ') });
  }

  onSubmit() {
    const isValid = this.productForm.valid;
    console.log(this.productForm.value, { isValid });
  }
}
