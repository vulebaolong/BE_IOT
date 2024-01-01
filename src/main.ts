import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { useSwagger } from './common/swagger/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TAG_MODULE_USER } from './common/contants/swagger.contants';

async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        // origin: '*', //=> Allow all access
        origin: true, //=> allow same domain eg: localhost
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        credentials: true, // FE and BE are both open to exchange cookies
    });

    // Version APIs
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['1'],
    });

    // swagger
    // useSwagger(app);
    const config = new DocumentBuilder()
        .setTitle('IOT APIs Document')
        .setDescription('All Modules APIs')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag(TAG_MODULE_USER)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
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
    });

    await app.listen(3000).then(() => {
        logger.verbose(`App is running on http://localhost:${3000}`);
    });
}
bootstrap();
