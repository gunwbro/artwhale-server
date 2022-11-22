CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(255),
  `email` text,
  `file_id` int,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `musics` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `lyrics` text,
  `mood` varchar(255),
  `user_id` int,
  `file_id` int,
  `album_art_id` int,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `album_arts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `method` varchar(255),
  `mood` varchar(255),
  `user_id` int,
  `file_id` int,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `files` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `original_name` varchar(255),
  `file_type` ENUM ('music', 'album_art'),
  `size` int,
  `path` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `notices` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` text,
  `content` text,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `users_musics_likes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `music_id` int,
  `created_at` datetime
);

CREATE TABLE `users_album_arts_likes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `album_art_id` int,
  `created_at` datetime
);

ALTER TABLE `musics` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on update cascade on delete cascade;

ALTER TABLE `musics` ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) on update cascade on delete cascade;

ALTER TABLE `musics` ADD FOREIGN KEY (`album_art_id`) REFERENCES `album_arts` (`id`) on update cascade on delete cascade;

ALTER TABLE `album_arts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on update cascade on delete cascade;

ALTER TABLE `album_arts` ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) on update cascade on delete cascade;

ALTER TABLE `users_musics_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on update cascade on delete cascade;

ALTER TABLE `users_musics_likes` ADD FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) on update cascade on delete cascade;

ALTER TABLE `users_album_arts_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on update cascade on delete cascade;

ALTER TABLE `users_album_arts_likes` ADD FOREIGN KEY (`album_art_id`) REFERENCES `album_arts` (`id`) on update cascade on delete cascade;

ALTER TABLE `users` ADD FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) on update cascade on delete cascade;
