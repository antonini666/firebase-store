class Product {
  constructor(title, img, description, price) {
    this.title = title;
    this.img = img;
    this.description = description;
    this.price = price;
    this.id = Date.now();
  }
}

export default Product;
