import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { useSwagger } from './common/swagger/swagger';

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

    await app.listen(3000).then(() => {
        logger.verbose(`App is running on http://localhost:${3000}`);
    });
}
bootstrap();
