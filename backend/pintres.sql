DROP DATABASE IF EXISTS pintres;
CREATE DATABASE IF NOT EXISTS pintres;
USE pintres;

CREATE TABLE users(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
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
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_topic(
    username VARCHAR(50) NOT NULL,
    topic VARCHAR(20) NOT NULL,
    PRIMARY KEY (username, topic),
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE boards(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(20) NOT NULL,
    creator VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (creator) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE board_post(
    board_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (board_id, post_id),
    FOREIGN KEY (board_id) REFERENCES boards(id)
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
);

CREATE TABLE board_user(
    board_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    PRIMARY KEY (board_id, username),
    FOREIGN KEY (board_id) REFERENCES boards(id)
        ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER |
CREATE FUNCTION generateFeed(_username VARCHAR(50))
BEGIN
    SELECT * FROM posts WHERE id IN (
        SELECT id FROM posts WHERE topic IN (
            SELECT topic FROM user_topic WHERE username = _username
        )
    )
    OR id IN (
        SELECT board_post.post_id FROM board_user JOIN board_post
            ON board_user.board_id = board_post.board_id
        WHERE board_user.username = _username
    ) ORDER BY post_time DESC;
END|
DELIMITER ;

-- Mock users
INSERT INTO users(username, password, email)
VALUES('antonrufino', PASSWORD('whatpassword'), 'antonrufino@pintres.com');

INSERT INTO users(username, password, email)
VALUES('czesyeban', PASSWORD('frontendisheart'), 'czesyeban@pintres.com');

INSERT INTO users(username, password, email)
VALUES('mariqueentenedero', PASSWORD('loginisheart'), 'mariqueentenedero@pintres.com');

-- Mock posts
INSERT INTO posts(id, author_username, post_time, content, topic)
VALUES(1, 'antonrufino', NOW(), 'kek', 'lulz');

INSERT INTO posts(id, author_username, post_time, content, topic)
VALUES(2, 'antonrufino', NOW(), 'alay', 'cmsc191');

-- Mock subscribed topics
INSERT INTO user_topic(username, topic)
VALUES('antonrufino', 'lulz');

INSERT INTO user_topic(username, topic)
VALUES('czesyeban', 'kpop');

-- Mock boards
INSERT INTO boards(id, name, creator)
VALUES(1, 'Acad Rants', 'antonrufino');

-- Mock board posts
INSERT INTO board_post(board_id, post_id)
VALUES(1, 1);

INSERT INTO board_post(board_id, post_id)
VALUES(1, 2);
