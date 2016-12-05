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
    UNIQUE KEY (name, creator),
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
CREATE PROCEDURE generateFeed(_username VARCHAR(50))
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

CREATE PROCEDURE getSubscribedTopics(_username VARCHAR(50))
BEGIN
    SELECT topic, (
        SELECT COUNT(id)
        FROM posts
        WHERE posts.topic = user_topic.topic
    ) AS num_posts
    FROM user_topic
    WHERE username = _username
    GROUP BY topic;
END|

CREATE PROCEDURE getSubscribedBoards(_username VARCHAR(50))
BEGIN
    SELECT boards.id AS board_id, boards.name AS board_name, COUNT(board_post.post_id) AS num_posts,
        boards.creator as board_creator
    FROM board_user
    JOIN boards ON board_user.board_id = boards.id
    JOIN board_post ON board_user.board_id = board_post.board_id
    WHERE board_user.username = _username AND boards.creator != _username
    GROUP BY board_user.board_id;
END|

CREATE PROCEDURE getBoardsByUser(_username VARCHAR(50))
BEGIN
    SELECT boards.id AS board_id, boards.name AS board_name, COUNT(board_post.post_id) AS num_posts
    FROM boards
    JOIN board_post ON boards.id = board_post.board_id
    WHERE creator = _username
    GROUP BY board_id;
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
VALUES(1, 'mariqueentenedero', NOW(), 'kek', 'lulz');

INSERT INTO posts(id, author_username, post_time, content, topic)
VALUES(2, 'antonrufino', NOW(), 'alay', 'cmsc191');

INSERT INTO posts(id, author_username, post_time, content, topic)
VALUES(3, 'czesyeban', NOW(), 'topkek', 'lulz');

-- Mock subscribed topics
INSERT INTO user_topic(username, topic)
VALUES('antonrufino', 'lulz');

INSERT INTO user_topic(username, topic)
VALUES('antonrufino', 'cmsc191');

INSERT INTO user_topic(username, topic)
VALUES('czesyeban', 'kpop');

-- Mock boards
INSERT INTO boards(id, name, creator)
VALUES(1, 'Acad Rants', 'antonrufino');

INSERT INTO boards(id, name, creator)
VALUES(2, 'Keks', 'czesyeban');

-- Mock board posts
INSERT INTO board_post(board_id, post_id)
VALUES(1, 1);

INSERT INTO board_post(board_id, post_id)
VALUES(1, 2);

INSERT INTO board_post(board_id, post_id)
VALUES(2, 1);

INSERT INTO board_post(board_id, post_id)
VALUES(2, 2);

INSERT INTO board_user(board_id, username)
VALUES(1, 'antonrufino');

INSERT INTO board_user(board_id, username)
VALUES(2, 'antonrufino');
