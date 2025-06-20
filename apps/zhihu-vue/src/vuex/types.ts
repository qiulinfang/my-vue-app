// 定义商品类型
export interface Product {
  id: number;
  name: string;
  price: number;
}

// 定义购物车项目类型，继承自商品并添加数量
export interface CartItem extends Product {
  quantity: number;
}

// 定义 Products 模块的 State 类型
export interface ProductsState {
  items: Product[];
}

// 定义 Cart 模块的 State 类型
export interface CartState {
  items: CartItem[];
}

// 定义根 State 类型，它包含了所有模块的 State
export interface RootState {
  products: ProductsState;
  cart: CartState;
}