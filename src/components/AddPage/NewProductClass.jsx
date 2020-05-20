class Product {
  constructor(title, description, price) {
    this.title = title;
    // this.img = img;
    this.description = description;
    this.price = price;
    this.id = Date.now();
  }
}

export default Product;
