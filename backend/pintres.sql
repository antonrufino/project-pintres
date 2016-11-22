DROP DATABASE IF EXISTS pintres;
CREATE DATABASE IF NOT EXISTS pintres;
USE pintres;

CREATE TABLE users(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE posts(
    id INT AUTO_INCREMENT NOT NULL,
    author_username VARCHAR(50) NOT NULL,
    post_time DATETIME NOT NULL,
    content VARCHAR(140) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (author_username) REFERENCES users(username)
);


INSERT INTO users(username, password)
VALUES('antonrufino', PASSWORD('whatpassword'));

INSERT INTO users(username, password)
VALUES('czesyeban', PASSWORD('frontendisheart'));

INSERT INTO users(username, password)
VALUES('mariqueentenedero', PASSWORD('loginisheart'));
