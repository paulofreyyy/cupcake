import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/orders/details/order-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'carrinho', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'checkout/:orderId', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'pedidos', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'pedido/:orderId', component: OrderDetailComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'produto/:productId', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
]