import { Catalog } from "./pages/catalog/Catalog";
import { Product } from "./pages/product/Product";
import { InnerProduct } from "./pages/innerProduct/innerProduct";
import { Basket } from "./pages/basket/Basket";
import { Route, Routes } from "react-router";
import { Search } from "./pages/search/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:brandId" element={<Catalog />} />
        <Route path="/products/search/:brandId/:boolean" element={<Search />} />
        <Route path="/products/:id/:brandId" element={<Product />} />
        <Route path="/products/product/:id" element={<InnerProduct />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}

export default App;
