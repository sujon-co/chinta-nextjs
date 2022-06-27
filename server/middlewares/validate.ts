import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export const validate = (
    schema: OptionalObjectSchema<ObjectShape>,
    handler: any
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { method } = req;
        if (['POST', 'PUT'].includes(method as string)) {
            try {
                req.body = await schema.camelCase().validate(req.body, {
                    stripUnknown: true,
                    abortEarly: false,
                });
            } catch (error) {
                let errors = {};

                if (error instanceof ValidationError) {
                    error.inner.forEach((item) => {
                        errors = {
                            ...errors,
                            [item.path as string]: item.message,
                        };
                    });
                    return res.status(400).json(errors);
                }
            }
        }
        await handler(req, res);
    };
};

export default validate;
