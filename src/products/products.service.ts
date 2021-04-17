import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (desc) updatedProduct.description = desc;
    if (price) updatedProduct.price = price;

    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    this.products = this.products.filter((prod) => prod.id !== prodId);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Invalid ID');
    }

    return [product, productIndex];
  }
}