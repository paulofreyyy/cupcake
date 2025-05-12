import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
    status: 'paid' | 'cancelled';

    @IsOptional()
    address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        zip: string;
    };

    @IsOptional()
    payment: {
        paymentMethod: string;
        shippingFee: number;
        total: number
    };

    @IsOptional()
    items: { product: string; quantity: number }[];

    @IsOptional()
    total: number;
}
