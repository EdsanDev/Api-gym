import {z} from 'zod';

export const ClienteSchema = z.object({
    name:z.string({
        required_error:'Name is required'
    }),
    last_name:z.string({
        required_error:'Last name is required'
    }),
    email: z.string({
        required_error:'Email is required'
    }).email({
        message:'Invalid email'
    }),
    type_inscription:z.string({
        required_error:'Type inscription is required'
    }),
    date_final:z.string({
        required_error:'Date final is required'
    }),
    precio:z.string({
        message:'Precio is required'
    })
})