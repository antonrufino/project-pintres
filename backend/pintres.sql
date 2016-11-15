DROP DATABASE IF EXISTS pintres;
CREATE DATABASE IF NOT EXISTS pintres;
USE pintres;

CREATE TABLE posts(
    id INT AUTO_INCREMENT NOT NULL,
    author_username VARCHAR(50) NOT NULL,
    author_display_name VARCHAR(50) NOT NULL,
    post_time DATETIME NOT NULL,
    content VARCHAR(140) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    username VARCHAR(50) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (username)
);

INSERT INTO users(username, display_name, password)
VALUES('antonrufino', 'Anton Rufino', PASSWORD('whatpassword'));

INSERT INTO users(username, display_name, password)
VALUES('czesyeban', 'Czes Yeban', PASSWORD('frontendisheart'));

INSERT INTO users(username, display_name, password)
VALUES('mariqueentenedero', 'Mariqueen Tenedero', PASSWORD('loginisheart'));
