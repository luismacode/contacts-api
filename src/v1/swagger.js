import swaggerJSdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'CONTACTS-API',
            version: '1.0.0'
        },
        components: {
            schemas: {
                Contact: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'the contact name'
                        },
                        email: {
                            type: 'string',
                            description: 'the contact email'
                        },
                        phone: {
                            type: 'string',
                            description: 'the contact phone'
                        },
                        role: {
                            type: 'string',
                            description: 'the contact role'
                        },
                        isAvailable: {
                            type: 'boolean',
                            description: 'the current contact status'
                        }
                    },
                    required: ['name', 'email', 'phone', 'role', 'isAvailable'],
                    example: {
                        name: 'Jhon Doe',
                        email: 'jhondoe34@gmail.com',
                        phone: '+51 345 671 056',
                        role: 'customer',
                        isAvailable: true
                    }
                },
                ErrorModel: {
                    type: 'object',
                    required: ['message', 'code'],
                    properties: {
                        message: {
                            type: 'string'
                        },
                        code: {
                            type: 'integer',
                            minimum: 100,
                            maximum: 600
                        }
                    }
                }
            }
        },
        tags: {
            name: 'Contact'
        },
        paths: {
            '/api/v1/contacts': {
                get: {
                    tags: ['Contact'],
                    description: 'return all contacts',
                    summary: 'retrieve all contacts',
                    responses: {
                        200: {
                            description: 'list of all contacts',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Contact'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Contact'],
                    description: 'create new contact',
                    summary: 'create new contact',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '#/components/schemas/Contact'
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'new contact was created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Contact'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/v1/contacts/{contactId}': {
                get: {
                    tags: ['Contact'],
                    description: 'Returns contacts based on ID',
                    summary: 'Retrieve a contact by ID',
                    parameters: [
                        {
                            name: 'contactId',
                            in: 'path',
                            description: 'ID of contact to use',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            style: 'simple'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'list of a contact',
                            content: {
                                '*/*': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Contact'
                                        }
                                    }
                                }
                            }
                        },
                        default: {
                            description: 'error payload',
                            content: {
                                'text/html': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorModel'
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    tags: ['Contact'],
                    description: 'delete contact based on ID',
                    summary: 'Delete a contact',
                    parameters: [
                        {
                            name: 'contactId',
                            in: 'path',
                            description: 'ID of contact to use',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            style: 'simple'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Contact was deleted',
                            content: {
                                '*/*': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Contact'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                patch: {
                    tags: ['Contact'],
                    description: 'update contact based on ID and requestBody',
                    summary: 'update a contact',
                    parameters: [
                        {
                            name: 'contactId',
                            in: 'path',
                            description: 'ID of contact to use',
                            required: true,
                            schema: {
                                type: 'string'
                            },
                            style: 'simple'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '#/components/schemas/Contact'
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Contact was updated',
                            content: {
                                '*/*': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Contact'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSdoc(options);
export const swaggerDocs = app => {
    app.use('/api/v1/docs', serve, setup(swaggerSpec));
};
