USE pintres;

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

INSERT INTO boards(id, name, creator)
VALUES(3, 'Anime Rants', 'antonrufino');

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
