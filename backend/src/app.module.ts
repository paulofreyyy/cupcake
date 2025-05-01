import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        UserModule,
        ProductModule,
        AuthModule,
        MongooseModule.forRoot('mongodb://localhost:27017/cupcake'),
        OrdersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
