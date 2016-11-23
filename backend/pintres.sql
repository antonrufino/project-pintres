DROP DATABASE IF EXISTS pintres;
CREATE DATABASE IF NOT EXISTS pintres;
USE pintres;

CREATE TABLE users(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(2048) NOT NULL,
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

CREATE TABLE user_topic(
    username VARCHAR(50) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    PRIMARY KEY (username, topic),
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE boards(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(20) NOT NULL,
    creator VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (creator) REFERENCES users(username)
);

CREATE TABLE board_post(
    board_id INT,
    post_id INT NOT NULL,
    PRIMARY KEY (board_id, post_id),
    FOREIGN KEY (board_id) REFERENCES boards(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users(username, password, email)
VALUES('antonrufino', PASSWORD('whatpassword'), 'anton@pintres.com');

INSERT INTO users(username, password, email)
VALUES('czesyeban', PASSWORD('frontendisheart'), 'czesyeban@pintres.com');

INSERT INTO users(username, password, email)
VALUES('mariqueentenedero', PASSWORD('loginisheart'), 'mariqueentenedero@pintres.com');
