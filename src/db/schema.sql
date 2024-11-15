CREATE TABLE image_carousel (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    order_index INT NOT NULL
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    event_datetime TIMESTAMP NOT NULL
);

CREATE TABLE youtube_component (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    video_link VARCHAR(255) NOT NULL
);

CREATE TABLE devotion (
    id SERIAL PRIMARY KEY,
    verse TEXT NOT NULL,
    devotion_datetime TIMESTAMP NOT NULL,
    message TEXT NOT NULL
);

CREATE TABLE sermon (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    sermon_pdf_url VARCHAR(255) NOT NULL,
    sermon_image_url VARCHAR(255) NOT NULL
);

CREATE TABLE testimony (
    id SERIAL PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    post_datetime TIMESTAMP NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL
);

CREATE TABLE form_link (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    form_link VARCHAR(255) NOT NULL,
    form_image_url VARCHAR(255) NOT NULL
);