FROM php:8.1-fpm

# Instala pacotes necessários
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    git \
    libonig-dev \
    libzip-dev \
    zip && \
    docker-php-ext-install pdo pdo_mysql mbstring zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

## XDEBUG
COPY ./xdebug.ini $PHP_INI_DIR/conf.d/
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug


WORKDIR /var/www

CMD ["php-fpm"]
