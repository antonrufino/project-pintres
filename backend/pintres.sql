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
