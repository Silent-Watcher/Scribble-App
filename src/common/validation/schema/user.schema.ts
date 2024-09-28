import { z } from 'zod';

export const zUser = z.object({
	displayName : z.string().trim().optional(),
	email : z.string().email('invalid email format!'),
	isEmailVerified: z.boolean().default(false),
	password: z.string().min(8 , 'password should be at least 8 characters'),
	confirmPassword: z.string().min(8)
}).refine(({password , confirmPassword})=> password == confirmPassword , {
	message: "The passwords did not match",
	path: ['confirmPassword']
})
