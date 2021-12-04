CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
	user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	username VARCHAR(25) UNIQUE NOT NULL,
	password VARCHAR(75) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS songs(
	song_name VARCHAR(35) NOT NULL,
	artist VARCHAR(20) NOT NULL,
	upvotes INT DEFAULT 0 NOT NULL,
	creator_user_id uuid NOT NULL,
    PRIMARY KEY (song_name, artist)
);

CREATE TABLE IF NOT EXISTS user_upvoted_songs(
	song_name VARCHAR(35) NOT NULL,
	artist VARCHAR(20) NOT NULL,
	user_id uuid,
	PRIMARY KEY (user_id, artist, song_name),
	FOREIGN KEY (user_id)
		REFERENCES users (user_id),
	FOREIGN KEY (song_name, artist)
		REFERENCES songs (song_name, artist)
);
