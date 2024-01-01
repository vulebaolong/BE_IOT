import { INestApplication } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    DocumentBuilder,
    SwaggerModule,
    getSchemaPath,
} from '@nestjs/swagger';

import { TAG_MODULE_USER } from 'src/common/contants/swagger.contants';
import { User } from 'src/modules/users/schemas/user.schema';
import { SwaggerTheme } from 'swagger-themes';

export const useSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('IOT APIs Document')
        .setDescription('All Modules APIs')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag(TAG_MODULE_USER)
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [User],
    });

    const theme = new SwaggerTheme('v3');
    const options = {
        // explorer: true,
        // customCss: theme.getBuffer('dark'),
        // swaggerOptions: {
        //     persistAuthorization: true,
        // },
        customSiteTitle: 'IOT APIs Document',
        // customfavIcon:
        //     'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-standalone-preset.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.css',
        ],
    };

    SwaggerModule.setup('swagger', app, document, options);
};

export const CreatedResponse = (mes: string, $ref: any) => {
    return ApiCreatedResponse({
        schema: {
            properties: {
                statusCode: { example: 201 },
                message: { example: mes },
                data: {
                    $ref: getSchemaPath($ref),
                },
            },
        },
    });
};

export const UpdatedResponse = (mes: string) => {
    return ApiCreatedResponse({
        schema: {
            properties: {
                statusCode: { example: 201 },
                message: { example: mes },
                data: {
                    example: {
                        acknowledged: true,
                        modifiedCount: 1,
                        upsertedId: null,
                        upsertedCount: 0,
                        matchedCount: 1,
                    },
                },
            },
        },
    });
};

export const OkResponse = (
    mes?: string,
    $ref?: any,
    pagination = false,
    data?: any,
) => {
    if ($ref) {
        if (pagination) {
            return ApiOkResponse({
                schema: {
                    properties: {
                        statusCode: { example: 200 },
                        message: { example: mes },
                        data: {
                            properties: {
                                meta: {
                                    type: 'object',
                                    properties: {
                                        currentPage: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        pageSize: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        totalPages: {
                                            type: 'number',
                                            example: 4,
                                        },
                                        totalItems: {
                                            type: 'number',
                                            example: 4,
                                        },
                                    },
                                },
                                result: {
                                    type: 'array',
                                    items: {
                                        $ref: getSchemaPath($ref),
                                    },
                                },
                            },
                        },
                    },
                },
            });
        }

        return ApiOkResponse({
            schema: {
                properties: {
                    statusCode: { example: 200 },
                    message: { example: mes },
                    data: {
                        $ref: getSchemaPath($ref),
                    },
                },
            },
        });
    }

    if (data) {
        if (pagination) {
            return ApiOkResponse({
                schema: {
                    properties: {
                        statusCode: { example: 200 },
                        message: { example: mes },
                        data: {
                            properties: {
                                meta: {
                                    type: 'object',
                                    properties: {
                                        currentPage: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        pageSize: {
                                            type: 'number',
                                            example: 1,
                                        },
                                        totalPages: {
                                            type: 'number',
                                            example: 4,
                                        },
                                        totalItems: {
                                            type: 'number',
                                            example: 4,
                                        },
                                    },
                                },
                                result: {
                                    type: 'array',
                                    example: data,
                                },
                            },
                        },
                    },
                },
            });
        }

        return ApiOkResponse({
            schema: {
                properties: {
                    statusCode: { example: 200 },
                    message: { example: mes },
                    data: { example: data },
                },
            },
        });
    }

    return ApiOkResponse({
        schema: {
            properties: {
                statusCode: { example: 200 },
                message: { example: mes },
                data: { example: [] },
            },
        },
    });
};
