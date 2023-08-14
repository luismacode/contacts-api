import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const contactsDtoSchema = Type.Object({
    name: Type.String({
        minLength: 4,
        maxLength: 30,
        errorMessage: {
            minLength: 'Name must be at least four characters long',
            maxLength: 'The name must have a maximum of thirty characters'
        }
    }),
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'type of email is not valid',
            format: 'format of email is not valid'
        }
    }),
    phone: Type.String({
        format: 'phone',
        errorMessage: {
            type: 'type of phoneis not valid',
            format: 'format of phone is not valid'
        }
    }),
    role: Type.String({
        format: 'role',
        errorMessage: {
            type: 'type role is not valid',
            format: 'The value can be customer or sponsor or supplier or other'
        }
    }),
    isAvailable: Type.Boolean({
        errorMessage: {
            type: 'datatype only can be boolean',
            format: 'the value can be true or false'
        }
    })
});

const ajv = new Ajv({ allErrors: true });
ajv.addFormat('phone', /^\+51[0-9\s]+/);
ajv.addFormat('role', /supplier|customer|sponsor|other/);
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(contactsDtoSchema);

const contactDto = (req, res, next) => {
    const isDtoValid = validateSchema(req.body);
    if (!isDtoValid)
        return res
            .status(400)
            .send(ajv.errorsText(validateSchema.errors, { separator: '\n' }));
    next();
};

export default contactDto;
